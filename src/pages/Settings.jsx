import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
  "index",
  "name",
  "email",
  "role",
  "status",
  "action",
  "delete"
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const badgeStatus = {
  active: "success",
  ban: "warning",
  return: "primary",
  banned: "danger",
};

const Settings = () => {
  const [listUser, setListUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTutor();
    return () => {
      setLoading(false);
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

  
const userHander = async (id, action ) => {
  setLoading(true);
  if(action === "ban"){
    const reason = prompt("Enter reason: ");
    if(reason){
      const body = {
        reason: reason
      }
      const res = await callAPI("POST", `user/${action}/${id}`, body)
      alert(res.data)
    }

  }else {
   const res = await callAPI("POST", `user/${action}/${id}`)
    alert(res.data)
  }
  setLoading(false);
  window.location.reload();
}

const deleteUser = async (id) => {
  setLoading(true);
  const res =await callAPI("DELETE", `user/${id}`)
  setLoading(false);
  alert(res.data)
  window.location.reload();
}


const renderBody = (item, index) => (
  <tr key={index}>
    <td>{++index}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.role}</td>
    <td>{loading === true ? "loading..." :<Badge type={badgeStatus[item.status]} content={item.status} />}</td>
    <td>{renderAction(item._id, item.status)}</td>
    <td><div className='cursor_pointer' onClick={()=> deleteUser(item._id)} >
      <Badge type="danger" content="delete" /></div>
    </td>
  </tr>
);

const renderAction = (id, status) =>{
  if(status === "active")
  return <div className='cursor_pointer' onClick={()=> userHander(id, "ban")} >
      <Badge type={badgeStatus["ban"]} content="ban" />
      </div>
 if(status === "banned")
      return <div className='cursor_pointer' onClick={()=> userHander(id, "active")} >
          <Badge type={badgeStatus["return"]} content="return" />
          </div>
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
                  limit="10"
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

export default Settings;
