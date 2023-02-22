//+------------------------------------------------------------------+
//|                                                         test.mq4 |
//|                        Copyright 2022, MetaQuotes Software Corp. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2022, MetaQuotes Software Corp."
#property link      "https://www.mql5.com"
#property version   "1.00"
#property strict

#include <Zmq/Zmq.mqh>
//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+


/*--
    +------------------------------------------------------------------+
                               [ ENUM ]
    +------------------------------------------------------------------+
--*/

enum Bool{
   f=0,//false
   t=1//true
};
enum Mode{
   Bollinger=0,     // BollingerBands
   MA=1,     // MovingAvarage
   WPR=2      //WiliamsPercentRange
};
enum BBMode{
   ST=0, //Swing Trade
   BO=1, //Break Out
};
enum MAMode{
   CS=0,//Cross Signal
   FS=1,//Follow Signal
};
enum ManageMode{
   Fix=0,//Fixed
   ATR=1,//AverageTrueRange
};

/*--
    +------------------------------------------------------------------+
                      [ Variable Deceleration & Input ]
    +------------------------------------------------------------------+
--*/
input  int      SL=100;
input  int      TP=100;
input  double   lots=0.01;
input  ManageMode SelectManageOrder=0; //-----SelectManageOrder
sinput string   StepOrdesr="";//----Distance(Pip)
input  double   pipValue = 0.005; //Step Order Fix
sinput string   ATRma="";//----AverageTrueRange(ATR)
input  int      ATRPeriod=14;//Period
input  float    exponent=2;//Exponent
input ENUM_TIMEFRAMES TimeframeATR=0;
sinput Mode     SelectMode = Bollinger;
sinput BBMode   BollingerBands=ST; //------BollingerBands
input int       PeriodsBB = 20;//Periods
input double    DeviationBB = 2.0;
input ENUM_TIMEFRAMES TimeframeBB=0;//Timeframe
input MAMode    MovingAverage = CS;//------MovingAverage
input int       MA_Fast = 5;
input int       MA_Slow = 20;
input ENUM_MA_METHOD MA_Method=MODE_SMA;
input ENUM_TIMEFRAMES TimeframeMA=0;//Timeframe
sinput string   WilliamsPercentRange=""; //-----WilliamsPercentRange
input int       PeriodsWPR=20;//Periods
input int       highLevel = -5; //Level High
input int       lowLevel  = -95;//Level Low
input int       candleShift = 1;//Candle Shift
input ENUM_TIMEFRAMES TimeframeWPR=0;//Timeframe
sinput string   SelectTrend = "";
input Bool      MovingAverageIndicator =0;//------MovingAverageIndicator
input int       MAI_Fast = 5; 
input int       MAI_Med = 100;
input int       MAI_Slow = 200;
input ENUM_MA_METHOD MAI_Method=MODE_SMA;
input ENUM_TIMEFRAMES TimeframeMAI=0;//Timeframe
input Bool      TCCI =0;//------TCCI
input int       PeriodsTCCI=20;
input double    DeviationTCCI = 0.0;
input Bool      STrend=0;//-------SuperTrend
input int       PeriodSTrend=14;//Periods
input double    MultipleSTrend=3.0;//Multiple
input ENUM_TIMEFRAMES TimeframeST=0;//Timeframe
input Bool      ADTrend=0;//------ADX
input int       PeriodADX=14;//Periods
input ENUM_TIMEFRAMES TimeframeADX=0;
input ENUM_APPLIED_PRICE ApplyPriceADX=0;//ApplyPrice
input int       LevelsADX=25;//Levels
input Bool      ARTrend=0;//--------AutomaticRegression
input int       PeriodARTrend=150;//Periods
input ENUM_TIMEFRAMES TimeframeAR=0;//Timeframe
input Bool      HighlowAR=0;//Highlow
sinput string   CloseProfit ="";//-------CloseOrder
input double    ProfitTicket = 5.0;//Profit Ticket($)
input double    ProfitType = 5.0;//Profit Type($)
//CountOrders
int buyCount=0;
int sellCount=0;

//+------------------------------------------------------------------+
int OnInit(){
   return(INIT_SUCCEEDED);
}
void OnDeinit(const int reason){
}
int checkProfit(int type){
   int sum=0;
   for(int i=0;i<OrdersTotal();i++){
      OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
      if(OrderType()==type){
         sum=sum+OrderProfit();
      }
   }
   return sum;
}

bool isNewbar(){
   datetime currTime = iTime(Symbol(),Period(),0);
   
   static datetime prevTime = currTime;
   
   if(prevTime<currTime){
      prevTime = currTime;
      return true;
   }
   return false;
}

//+------------------------------------------------------------------+

void openBuy(){
   OrderSend(Symbol(),OP_BUY,lots,Ask ,3,0,0,"Open_buy",10010,0,clrGreen);
   buyCount+=1;
}
void openSell(){
   OrderSend(Symbol(),OP_SELL,lots,Bid ,3,0,0,"Open_Sell",10010,0,clrRed);
   sellCount+=1;
}
void closeBuy(){
   OrderClose(OrderTicket(),lots,Bid,3);
   buyCount--;
}
void closeSell(){
   OrderClose(OrderTicket(),lots,Ask,3);
   sellCount--;
}


/*--
    +------------------------------------------------------------------+
                                    [ Trend ]
    +------------------------------------------------------------------+
--*/

bool ARGTrend(string type){
   if(ARTrend==0) return true;
   bool highlowcheck;
   if(HighlowAR==0) {
      highlowcheck=false;
   }else{
      highlowcheck=true;
   }
   double value1_1=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,2,1);
   double value1_2=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,2,2);
   
   double value2_1=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,0,1);
   double value2_2=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,0,2);
   
   double value3_1=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,1,1);
   double value3_2=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,1,2);
   
   double value4_1=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,3,1);
   double value4_2=iCustom(Symbol(),TimeframeAR,"automatic-regression-channel-v2",PeriodARTrend,highlowcheck,3,2);
   
   double checkValue1 = value1_1-value1_2;
   double checkValue2 = value2_1-value2_2;
   double checkValue3 = value3_1-value3_2;
   double checkValue4 = value4_1-value4_2;
   
   if(type=="Buy"){
      double PriceAsk = MarketInfo(Symbol(), MODE_ASK);
      if(PriceAsk>value2_1 || PriceAsk<value3_1) return false;
      if((checkValue1>=0)&&(checkValue2>=0)&&(checkValue3>=0)&&(checkValue4>=0)){
         return true;
      }
   }else{
      double PriceBid = MarketInfo(Symbol(), MODE_BID);
      if(PriceBid>value2_1 || PriceBid<value3_1) return false;
      if((checkValue1<0)&&(checkValue2<0)&&(checkValue3<0)&&(checkValue4<0)){
         return true;
      }
   }
   return false;
}
bool ADXTrend(string type){
   if(ADTrend==0) return true;
   double adx=iADX(Symbol(),TimeframeADX,PeriodADX,ApplyPriceADX,0,1);
   double diplus=iADX(Symbol(),TimeframeADX,PeriodADX,ApplyPriceADX,MODE_PLUSDI,1);
   double diminus=iADX(Symbol(),TimeframeADX,PeriodADX,ApplyPriceADX,MODE_MINUSDI,1);
   if(adx<=LevelsADX)return false;
   
   if(type=="Buy"){
      if(diplus>diminus){
         return true;
      }
   }else{
      if(diminus>diplus){
         return true;
      }
   }
   return false;
}
bool SuperTrend(string type){
   if(STrend==0) return true;
   
   double strend_red   = iCustom(Symbol(),TimeframeST,"Super Trend 01",PeriodSTrend,MultipleSTrend,1,1);
   double strend_green = iCustom(Symbol(),TimeframeST,"Super Trend 01",PeriodSTrend,MultipleSTrend,0,1);
   
   if(strend_red!=EMPTY_VALUE && strend_green!=EMPTY_VALUE)return false;
   
   if(type=="Buy"){
      if(strend_green!=EMPTY_VALUE && strend_red==EMPTY_VALUE){//GreenState
         return true;
      }
   }
   else{
      if(strend_red!=EMPTY_VALUE && strend_green==EMPTY_VALUE){//RedState
         return true;
      }
   }
   return false;
}
bool TCCITrend(string type){
   if(TCCI==0)return true;
   double tcci_green = iCustom(Symbol(),0,"TCCI",0,PeriodsTCCI,0,0,1,1,DeviationTCCI,1,1); 
   double tcci_red = iCustom(Symbol(),0,"TCCI",0,PeriodsTCCI,0,0,1,1,DeviationTCCI,2,1);
   
   if(tcci_green!=EMPTY_VALUE&&tcci_red!=EMPTY_VALUE)return false;
   if(type=="Buy"){
      if(tcci_green!=EMPTY_VALUE && tcci_red==EMPTY_VALUE){//Green State
         return true;
      }
   }
   else{
      if(tcci_red!=EMPTY_VALUE && tcci_green==EMPTY_VALUE){//Red State
         return true;
      }
   }
   return false;
}

bool MovingAverageTrend(string type){
   if(MovingAverageIndicator==0)return true;
   double fastMAI = iMA(Symbol(),TimeframeMAI,MAI_Fast,0,MAI_Method,PRICE_CLOSE,0);
   double medMAI  = iMA(Symbol(),TimeframeMAI,MAI_Med,0,MAI_Method,PRICE_CLOSE,0);
   double slowMAI = iMA(Symbol(),TimeframeMAI,MAI_Slow,0,MAI_Method,PRICE_CLOSE,0);
   if(type=="Buy"){
      if((fastMAI>medMAI&&fastMAI>slowMAI)&&medMAI>slowMAI){
         return true;
      }
   }
   else{
      if((slowMAI>medMAI && slowMAI>fastMAI)&& medMAI>fastMAI){ //5<10<20
         return true;
      }
   }
   return false;
}

bool checkTrend(string type){
   return (MovingAverageTrend(type)&&TCCITrend(type)&&SuperTrend(type)&&ARGTrend(type)&&ADXTrend(type));
}

/*--
    +------------------------------------------------------------------+
                            [ Open Order ]
    +------------------------------------------------------------------+
--*/
void openOrder(){
   if(SelectMode==0){//Bollinger Bands
      double upper1 = iBands(NULL,TimeframeBB,PeriodsBB,DeviationBB,0,PRICE_CLOSE,MODE_UPPER,1);
      double upper2 = iBands(NULL,TimeframeBB,PeriodsBB,DeviationBB,0,PRICE_CLOSE,MODE_UPPER,2);
      double lower1 = iBands(NULL,TimeframeBB,PeriodsBB,DeviationBB,0,PRICE_CLOSE,MODE_LOWER,1);
      double lower2 = iBands(NULL,TimeframeBB,PeriodsBB,DeviationBB,0,PRICE_CLOSE,MODE_LOWER,2);
      double Close1 = iClose(Symbol(),Period(),1);
      double Close2 = iClose(Symbol(),Period(),2);
      if(upper1 > Close1 && upper2 < Close2){
         //-----Upper Bound----//
         if(BollingerBands==0 && checkTrend("Sell")){//SwingTrade
            if(sellCount==0){
               openSell();
            }
         }else if(BollingerBands==1 && checkTrend("Buy")){//BreakOut
            if(buyCount==0){
               openBuy();
            }
         }
      }
      if(lower1 < Close1 && lower2 > Close2){
         //-----Lower Bound----//
         if(BollingerBands==0 && checkTrend("Buy")){//SwingTrade
            if(buyCount==0){
               openBuy();
            }
         }else if(BollingerBands==1 && checkTrend("Sell")){//BreakOut
            if(sellCount==0){
               openSell();
            }
         }
      }
   }else if(SelectMode==1){ //MovingAverage
      double slowMA1 = iMA(NULL,TimeframeMA,MA_Slow,0,MA_Method,PRICE_CLOSE,0);
      double slowMA2 = iMA(NULL,TimeframeMA,MA_Slow,0,MA_Method,PRICE_CLOSE,1);
      double fastMA1 = iMA(NULL,TimeframeMA,MA_Fast,0,MA_Method,PRICE_CLOSE,0);
      double fastMA2 = iMA(NULL,TimeframeMA,MA_Fast,0,MA_Method,PRICE_CLOSE,1);
      if((fastMA2<slowMA2)&&(fastMA1>slowMA1)){
         if(MovingAverage==0 && checkTrend("Buy")){
            if(buyCount==0){
               openBuy();
            }
         }else if(MovingAverage==1 && checkTrend("Sell")){
            if(sellCount==0){
               openSell();
             }
         }
      }
      if((fastMA2>slowMA2)&&(fastMA1<slowMA1)){
         if(MovingAverage==0 && checkTrend("Sell")){
            if(sellCount==0){
               openSell();
            }
         }else if(MovingAverage==1 && checkTrend("Buy")){
            if(buyCount==0){
               openBuy();
            }
         }
      }
   }else if(SelectMode==2){ //Williams%Range
      double wprValue = iWPR(NULL,TimeframeWPR,PeriodsWPR,candleShift);
      if(checkTrend("Sell") && (wprValue>highLevel)){
         if(sellCount==0){
            openSell();
         }
      }
      if(checkTrend("Buy") &&(wprValue<lowLevel)){
         if(buyCount==0){
            openBuy();
         }
      }
   }
}

/*--
    +------------------------------------------------------------------+
                            [ Close Order ]
    +------------------------------------------------------------------+
--*/

void closeOrder(){
   /*-------Check OrdetTicket-------*/
   for(int i=0;i<OrdersTotal();i++){
      OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
      if(OrderProfit()>ProfitTicket){
         if(OrderType()==0){//OP_BUY
            closeBuy();
         }
         else if(OrderType()==1){//OP_Sell
            closeSell();
         }
      }
   }
   /*-------Check OrdetType-------*/
   if(checkProfit(0)+AccountEquity() >= ProfitType+AccountEquity()){
      for(int i=OrdersTotal()-1;i>=0;i--){
         OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
         if(OrderType()==0){
             closeBuy();
         }
      }
   }
   if(checkProfit(1)+AccountEquity()>=ProfitType+AccountEquity()){
      for(int i=OrdersTotal()-1;i>=0;i--){
         OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
         if(OrderType()==1){
             closeSell();
         }
      }
   }
}
/*--
    +------------------------------------------------------------------+
                            [ Manage Order ]
    +------------------------------------------------------------------+
--*/
void manageOrder(){
   int checkBuy = 1;
   int checkSell = 1;
   if(SelectManageOrder==0){
      for(int i=0;i<OrdersTotal();i++){
         OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
         if(OrderType()==0){// OP_BUY 
            if(checkBuy!=buyCount){
               checkBuy++;
               continue;
            }
            if(MarketInfo(Symbol(), MODE_ASK)<=(OrderOpenPrice()- pipValue)){
               openBuy();
            }
         }
         else if(OrderType()==1){//OP_SELL
            if(checkSell!=sellCount){
               checkSell++;
               continue;
            }
            if(MarketInfo(Symbol(), MODE_BID)>(OrderOpenPrice()+pipValue)){
               openSell();
            }
         }
      }
   }else if(SelectManageOrder==1){
      double atr = (iCustom(Symbol(),0,"ATR",14,0,1) * exponent);
      for(int i=0;i<OrdersTotal();i++){
         OrderSelect(i,SELECT_BY_POS,MODE_TRADES);
         if(OrderType()==0){// OP_BUY 
            if(checkBuy!=buyCount){
               checkBuy++;
               continue;
            }
            if(MarketInfo(Symbol(), MODE_ASK)<=(OrderOpenPrice()- atr)){
               openBuy();
            }
         }
         else if(OrderType()==1){//OP_SELL
            if(checkSell!=sellCount){
               checkSell++;
               continue;
            }
            if(MarketInfo(Symbol(), MODE_BID)>(OrderOpenPrice()+ atr)){
               openSell();
            }
         }
      }
   }
}

void receiveData(){
   Context context("test");
   Socket socket(context,ZMQ_PULL);
   socket.connect("tcp://127.0.0.1:3000");

   ZmqMsg request;

   socket.recv(request);
   Comment(request.getData());
}

void sendData(){
   Context context("test");
   Socket socket(context,ZMQ_PUSH);
   socket.bind("tcp://127.0.0.1:3000");
   
   ZmqMsg reply();
   socket.send(DoubleToStr(iCustom(Symbol(),0,"ATR",14,0,1),9));
}

//+------------------------------------------------------------------+

void OnTick(){
   if(!isNewbar()) return;
   //sendData();
   //receiveData();
   createLabel();
   manageOrder();
   openOrder();
   closeOrder();
}

void createLabel(){
   ObjectCreate("Profit",OBJ_LABEL,0,0,0);
   ObjectSet("Profit",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("Profit",OBJPROP_XDISTANCE,20);
   ObjectSet("Profit",OBJPROP_YDISTANCE,20);
   ObjectSetText("Profit","Profit",10,"Arial",White);
   
   ObjectCreate("BuyProfit",OBJ_LABEL,0,0,0);
   ObjectSet("BuyProfit",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("BuyProfit",OBJPROP_XDISTANCE,20);
   ObjectSet("BuyProfit",OBJPROP_YDISTANCE,40);
   
   ObjectSetText("BuyProfit","Buy:"+DoubleToStr(checkProfit(0),2),10,"Arial",White);
   
   ObjectCreate("SellProfit",OBJ_LABEL,0,0,0);
   ObjectSet("SellProfit",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("SellProfit",OBJPROP_XDISTANCE,20);
   ObjectSet("SellProfit",OBJPROP_YDISTANCE,60);
   
   ObjectSetText("SellProfit","Sell: "+ DoubleToStr(checkProfit(1),2),10,"Arial",White);
   
   ObjectCreate("space",OBJ_LABEL,0,0,0);
   ObjectSet("space",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("space",OBJPROP_XDISTANCE,20);
   ObjectSet("space",OBJPROP_YDISTANCE,80);
   ObjectSetText("space","-----------",10,"Arial",White);
   
   ObjectCreate("Equity",OBJ_LABEL,0,0,0);
   ObjectSet("Equity",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("Equity",OBJPROP_XDISTANCE,20);
   ObjectSet("Equity",OBJPROP_YDISTANCE,100);
   ObjectSetText("Equity","Equity:"+DoubleToStr(AccountEquity(),2),10,"Arial",White);
   
   
   ObjectCreate("Balance",OBJ_LABEL,0,0,0);
   ObjectSet("Balance",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("Balance",OBJPROP_XDISTANCE,20);
   ObjectSet("Balance",OBJPROP_YDISTANCE,120);
   ObjectSetText("Balance","Balance:"+DoubleToStr(AccountBalance(),2),10,"Arial",White);
   
   ObjectCreate("space2",OBJ_LABEL,0,0,0);
   ObjectSet("space2",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("space2",OBJPROP_XDISTANCE,20);
   ObjectSet("space2",OBJPROP_YDISTANCE,140);
   ObjectSetText("space2","-----------",10,"Arial",White);
   
   ObjectCreate("OrdersTotal",OBJ_LABEL,0,0,0);
   ObjectSet("OrdersTotal",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("OrdersTotal",OBJPROP_XDISTANCE,20);
   ObjectSet("OrdersTotal",OBJPROP_YDISTANCE,160);
   ObjectSetText("OrdersTotal","OrdersTotal",10,"Arial",White);
   
   ObjectCreate("OrderSell",OBJ_LABEL,0,0,0);
   ObjectSet("OrderSell",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("OrderSell",OBJPROP_XDISTANCE,20);
   ObjectSet("OrderSell",OBJPROP_YDISTANCE,180);
   ObjectSetText("OrderSell","Sell :"+sellCount,10,"Arial",White);
   
   ObjectCreate("OrderBuy",OBJ_LABEL,0,0,0);
   ObjectSet("OrderBuy",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("OrderBuy",OBJPROP_XDISTANCE,20);
   ObjectSet("OrderBuy",OBJPROP_YDISTANCE,200);
   ObjectSetText("OrderBuy","Buy :"+buyCount,10,"Arial",White);
   
   ObjectCreate("atr",OBJ_LABEL,0,0,0);
   ObjectSet("atr",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("atr",OBJPROP_XDISTANCE,20);
   ObjectSet("atr",OBJPROP_YDISTANCE,220);
   ObjectSetText("atr","ATR :"+ iATR(NULL,PERIOD_H1,ATRPeriod,0),10,"Arial",White);
   
   
   ObjectCreate("CloseButton",OBJ_BUTTON,0,0,0);
   ObjectSet("CloseButton",OBJPROP_CORNER,CORNER_RIGHT_UPPER);
   ObjectSet("CloseButton",OBJPROP_XDISTANCE,20);
   ObjectSet("CloseButton",OBJPROP_YDISTANCE,240);
   ObjectSetString(_Symbol,"CloseButton",OBJPROP_TEXT,"Close");
}

void OnChartEvent(const int id, 
                  const long &lparam,
                  const double &dparam,
                  const string &sparam)
{
   if(id==CHARTEVENT_OBJECT_CLICK){
      if(sparam=="CloseButton"){
         Comment("test");
      }
   }


      
}