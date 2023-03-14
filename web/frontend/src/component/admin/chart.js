import React from "react";
import Axios from "axios";
import useToken from "../../page/useToken";
import Navbar from "../navbar";
import { useState,useEffect } from "react";
import Formlogin from "../../component/com-singin/formlogin";

import { Fragment } from "react";
import { Line } from "react-chartjs-2";

function Chartcomponent() {
  const [userlist, setuserlist] = useState([]);

  const { token, setToken } = useToken();
  useEffect(() => {
    Axios.get("http://localhost:3001/transaction").then((res) => {
      setuserlist(res.data);
    });
  });
  const [chartData, setChartData] = useState({
    labels: userlist.map((data) => data.time), 
    datasets: [
      {
        label: "Users Gained ",
        data: userlist.map((data) => data.profit),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  console.log(chartData)

  if (!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }
  
  


  return (
    <div>
      <div className="">
      <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
      </div>
    </div>
  );
}

export default Chartcomponent;
