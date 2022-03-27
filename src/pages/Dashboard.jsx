import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import callAPI from "../api/api";
import moment from "moment";

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.avgStar}</td>
    <td>{item.point}</td>
    <td>{item.votes}</td>
  </tr>
);

const orderStatus = {
  waiting: "warning",
  pending: "success",
  accepted: "success",
  canceled: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const [waitTutor, setWaitTutor] = useState();
  const [listUser, setListUser] = useState();
  const [listTutor, setlistTutor] = useState();
  const [listLike, setListLike] = useState();
  const [listPost, setListPost] = useState();
  const [listComment, setListComment] = useState();
  const [listBook, setlistBook] = useState();
  const [dataChart, setDataChart] = useState();
  const [rank, setRank] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPendingTutor();
    getData();
    getDataChart();
    getRank();
    return () => {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPendingTutor();
    return () => {
      setLoading(false);
    }
  }, [loading]);


  /// Tutor Handle
  const pendingTutor = {
    header: ["Name", "email", "CV" ,"date", "status", "Action"],
    body: waitTutor && waitTutor,
  };
  
  const openLink = (url) => {
    window.open(url);
  }

  const acceptTutor = async (id, action) =>{
    setLoading(true)
    await callAPI("POST", `tutor/${action}/${id}`)
    .then((res) => {
      setLoading(false)
      console.log(res);
      alert(`You have ${action}ed this user to become a tutor`)
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }

/// Tutor register handle
  const renderPendingTutor = (item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td ><div className="cursor_poniter" onClick={() => openLink(item.cv)}>Link</div></td>
      <td>{moment(item.register_date).format("hh:mm DD/MM/YYYY")}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
      <td className="row">
        <div className="cursor_poniter" onClick={()=> acceptTutor(item.uid, "accept")}><Badge type="success" content="accept"/></div>
      &ensp;
      <div className="cursor_poniter" onClick={()=> acceptTutor(item.uid, "refuse")}><Badge type="danger" content="refuse"/></div>
      </td>
    </tr>
  );

  async function getPendingTutor() {
    try {
      await callAPI("get", "/tutor/check")
        .then((res) => {
          setWaitTutor(res?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }

  //Rank
  async function getRank() {
    try {
      await callAPI("get", "/analysis/rank")
        .then((res) => {
          setRank(res?.data.rank);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }
  // Customer Contribution
  const topCustomers = {
    head: ["user", "star", "point", "total vote"],
  };

  // Overview
  async function getData() {
    await callAPI("get", "/analysis/overview")
      .then((res) => {
        setListUser(res.data.user.data);
        setListPost(res.data.post.data);
        setListLike(res.data.like.data);
        setListComment(res.data.comment.data);
        setlistTutor(res.data.tutor.data);
        setlistBook(res.data.book.data);
      })
      .catch((err) => console.log(err));
  }

  /// Chart
  async function getDataChart() {
    await callAPI("get", "/analysis/chart")
      .then((res) => {
        setDataChart(res.data);
      })
      .catch((err) => console.log(err));
  }

  /// Chart Handle
  const chartOptions = {
    series: [
      {
        name: "New Post",
        data: dataChart ? dataChart.post : [],
      },
      {
        name: "Like",
        data: dataChart ? dataChart.like : [],
      },
      {
        name: "Comment",
        data: dataChart ? dataChart.comment : [],
      },
      {
        name: "Book",
        data: dataChart ? dataChart.book : [],
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <StatusCard
                icon="bx bx-user-circle"
                count={listUser ? listUser.length : "Loading..."}
                title="Total User"
              />
            </div>

            <div className="col-6">
              <StatusCard
                icon="bx bx-user-voice"
                count={listTutor ? listTutor.length : "Loading..."}
                title="Total Tutor"
              />
            </div>

            <div className="col-6">
              <StatusCard
                icon="bx bx-message-square-dots"
                count={listPost ? listPost.length : "Loading..."}
                title="Total Post"
              />
            </div>

            <div className="col-6">
              <StatusCard
                icon="bx bx-comment"
                count={listComment ? listComment.length : "Loading..."}
                title="Total Comment"
              />
            </div>

            <div className="col-6">
              <StatusCard
                icon="bx bx-like"
                count={listLike ? listLike.length : "Loading..."}
                title="Total Like"
              />
            </div>

            <div className="col-6">
              <StatusCard
                icon="bx bx-book"
                count={listBook ? listBook.length : "Loading..."}
                title="Total Book"
              />
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>users with contributions</h3>
            </div>
            <div className="card__body">
             {rank && <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={rank.slice(0,6)}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
             }
            </div>
            {/* <div className="card__footer">
              <Link to="/">view all</Link>
            </div> */}
          </div>
        </div>
        <div className="col-12">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="200%"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Requirements to become a tutor</h3>
            </div>
            <div className="card__body">
              {waitTutor && (
                <Table
                  headData={pendingTutor.header}
                  renderHead={(item, index) => renderOrderHead(item, index)}
                  bodyData={
                    waitTutor
                      ? pendingTutor.body
                      : [{ name: "Không có yêu cầu nào" }]
                  }
                  renderBody={(item, index) => renderPendingTutor(item, index)}
                />
              )}
            </div>
            <div className="card__footer">
              <Link to="/tutors">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
