import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import moment from "moment";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
  "name",
  "email",
  "phone",
  "specialize",
  "status",
  "action",
];

const orderStatus = {
  waiting: "warning",
  pending: "success",
  accepted: "success",
  canceled: "danger",
  refused: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderHead = (item, index) => <th key={index}>{item}</th>;

const Tutors = () => {
  const [listTutor, setListTutor] = useState();
  const [waitTutor, setWaitTutor] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTutor();
    getPendingTutor();
    return () => {
      setLoading(false);
    };
  }, []);

  async function getTutor() {
    try {
      await callAPI("get", "/tutor")
        .then((res) => {
          setListTutor(res?.data.listTutor);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }

  async function getPendingTutor() {
    try {
      await callAPI("get", "/tutor/check")
        .then((res) => {
          setWaitTutor(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }

  // Tutor Handle
  const pendingTutor = {
    header: ["Name", "email", "CV", "date", "status", "Action"],
    body: waitTutor && waitTutor,
  };

  const openLink = (url) => {
    window.open(url);
  };

  /// Tutor register handle
  const renderPendingTutor = (item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        <div className="cursor_poniter" onClick={() => openLink(item.cv)}>
          Link
        </div>
      </td>
      <td>{moment(item.register_date).format("hh:mm DD/MM/YYYY")}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
      {loading === true ? (
        <td>Loading...</td>
      ) : (
        <td className="row">
          <div
            className="cursor_pointer"
            onClick={() => acceptTutor(item.uid, "accept")}
          >
            <Badge type="success" content="accept" />
          </div>
          &ensp;
          <div
            className="cursor_pointer"
            onClick={() => acceptTutor(item.uid, "refuse")}
          >
            <Badge type="danger" content="refuse" />
          </div>
        </td>
      )}
    </tr>
  );

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        class {item.class}: {item.specialize}
      </td>
      {loading === true ? (
        <td>Loading...</td>
      ) : (
        <td>
          {" "}
          <Badge type={orderStatus[item.status]} content={item.status} />
        </td>
      )}
      <td>{renderAction(item.uid, item.status)}</td>
    </tr>
  );

  const renderAction = (id, status) => {
    if (status === "accepted")
      return (
        <div
          className="cursor_pointer"
          onClick={() => acceptTutor(id, "refuse")}
        >
          {loading === true ? (
            "Loading..."
          ) : (
            <Badge type={orderStatus["refused"]} content="cancel" />
          )}
        </div>
      );
    if (status === "refused")
      return (
        <div
          className="cursor_pointer"
          onClick={() => acceptTutor(id, "accept")}
        >
          {loading === true ? (
            "Loading..."
          ) : (
            <Badge type={orderStatus["accepted"]} content="accept" />
          )}
        </div>
      );
  };

  const acceptTutor = async (id, action) => {
    setLoading(true);
    await callAPI("POST", `tutor/${action}/${id}`)
      .then((res) => {
        alert(`You have ${action}ed this user to become a tutor`);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //   const acceptTutor = async (id, action) => {
  //     await callAPI("POST", `tutor/${action}/${id}`)
  //       .then((res) => {
  //         alert(`You have ${action}ed this user to become a tutor`);
  //         window.location.reload();
  //       })
  //       .catch((err) => console.log(err));
  //   };
  ///Render
  return (
    <div>
      <div className="col-12">
        <div className="card">
          <div className="card__header">
            <h3>Requirements to become a tutor</h3>
          </div>
          <div className="card__body">
            {waitTutor && (
              <Table
                limit="10"
                headData={pendingTutor.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={pendingTutor.body}
                renderBody={(item, index) => renderPendingTutor(item, index)}
              />
            )}
          </div>
          <div className="card__footer">
            {!waitTutor && <div>The system has no requests</div>}
            {/* <Link to="/tutors">view all</Link> */}
          </div>
        </div>
      </div>
      <h2 className="page-header">Tutors</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {listTutor && (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listTutor}
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

export default Tutors;
