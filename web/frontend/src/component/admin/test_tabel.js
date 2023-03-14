import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";

import { useLocation } from "react-router-dom";

import { Pagination } from "antd";

const PageSize = 10;

function Testtabel() {
  const [data_transaction, setdata_transaction] = useState([]);
  const [userport, setuserport] = useState([]);

  const location = useLocation();
  const [portnumber, setportnum] = useState(location.state.id); //sent from allport

  const [totalPage, settotalPage] = useState(0);
  const [current, setcurrent] = useState(1);
  const [minIndex, setminIndex] = useState("");
  const [maxIndex, setmaxIndex] = useState("");

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
  const test = userport.filter((obj) => {
    return obj.port_number === portnumber;
  });
  //console.log(test);

  return (
    <div>
      <div className="landingpage">
        <div className="container1">
          <Sidebar></Sidebar>
          <main>
            <div className="recent-orders">
              <div className="profile">
                {test.map((obj) => {
                  return (
                    <div key={obj.id}>
                      <h1>Port Number: {obj.port_number}</h1>
                    </div>
                  );
                })}
              </div>
              <table
                style={{
                  width: 700,
                  marginLeft: 20,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <thead>
                  <tr>
                    <th>time </th>
                    <th>balance</th>
                    <th>equity</th>
                    <th>profit</th>
                  </tr>
                </thead>
                <tbody>
                  {transacdata.map((val, index) => {
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
                    Total Price
                  </td>
                  <td align="left">$33.79</td>
                </tfoot>
              </table>
              <Pagination
                pageSize={5}
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

export default Testtabel;
