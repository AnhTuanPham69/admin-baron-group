import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
  "index",
  "name",
  "email",
  "role",
  "location"
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{++index}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.role === "tutor" ? <Badge type="success" content={item.role} />: <Badge type="primary" content={item.role} />}</td>
    <td>{item.address ? (item.address) : <div>User Doesn't Provide Address</div>}</td>
    <td></td>
  </tr>
);

const Customers = () => {
  const [listUser, setListUser] = useState();
  useEffect(() => {
    getTutor();
    return () => {
      setListUser([]);
    };
  }, []);

  async function getTutor() {
    try {
      await callAPI("get", "/user/listUser")
        .then((res) => {
          setListUser(res?.data.list_user);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }
  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {listUser && (
                <Table
                  limit={listUser.length}
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listUser}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
