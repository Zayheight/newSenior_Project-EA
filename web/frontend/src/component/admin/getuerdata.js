import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import Testtabel from "./test_tabel";
import Chartcomponent from "./chart";
import Profileuser from "./profileUser";
import { useLocation } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import { DatePicker, Space } from "antd";

import { Pagination } from "antd";

function GetUserdata() {
  const [data_transaction, setdata_transaction] = useState([]);
  const [userport, setuserport] = useState([]);

  const location = useLocation();
  const [portnumber, setportnum] = useState(location.state.id); //sent from allport
  const [trantime, settime] = useState("");


  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    Axios.get("http://localhost:3001/transaction").then((res) => {
      setdata_transaction(res.data);
    });
    Axios.get("http://localhost:3001/port").then((res) => {
      setuserport(res.data);
    });
  });
  const transacdata = data_transaction.filter((obj) => {
    return obj.port_number === portnumber;
  });
  const plofile = userport.filter((obj) => {
    return obj.port_number === portnumber;
  });
  //console.log(test);

  const test = transacdata.filter((obj) => {
    let a=obj.time.spl
    return obj.time == trantime;
  });


  //console.log(test);
  const onChange = (date, dateString) => {
    //console.log(date, dateString);
    console.log(date, dateString);

    settime(dateString);

  };
  let objectDate = new Date();


  const total1 = transacdata.filter((obj,index) => {
    if (index === 0) {
      return transacdata[0];
    }
  });
  const total2 = transacdata.filter((obj,index) => {
    const size = transacdata.length -1;
    if (index === size) {
      return transacdata[size];
    }
  });

  function tt (){
    const a1=total1.map((val)=>{
      return val.equity;
    })
    const a2=total2.map((val)=>{
      return val.equity;
    })
    const sum=a1-a2;
    //console.log(sum);
    return sum;

  }

  tt()

  return (
    <div>
      <Navbar></Navbar>
      <div className="landingpage">
        <div className="container1">
          <Sidebar></Sidebar>
          <main>
            <div className="recent-orders">
              <div className="profile">
                {plofile.map((obj) => {
                  return (
                    <div key={obj.id}>
                      <h1>Port Number: {obj.port_number}</h1>
                    </div>
                  );
                })}
              </div>
              <DatePicker picker="month" onChange={onChange}  />

              <table>
                <thead>
                  <tr>
                    <th>time </th>
                    <th>balance</th>
                    <th>equity</th>
                    <th>profit</th>
                  </tr>
                </thead>
                <tbody>
                  {transacdata.map((val) => {
                    return (
                      <tr>
                        <td>{val.time}</td>
                        <td>{val.balance} </td>
                        <td>{val.equity}</td>
                        <td>{val.profit} </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <td scope="col" colspan="3">
                    Total 
                  </td>
                  <td align="left">{tt()}</td>
                </tfoot>
              </table>
              <Pagination
                total={transacdata.length}
                showTotal={(total) => `Total ${total} items`}
                defaultPageSize={20}
                defaultCurrent={1}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default GetUserdata;
