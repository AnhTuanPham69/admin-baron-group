import React, {useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

// import statusCards from "../assets/JsonData/status-card-data.json";
import callAPI from "../api/api";



const chartOptions = {
  series: [
    {
      name: "New Post",
      data: [],
    },
    {
      name: "Like",
      data: [],
    },
    {
      name: "Comment",
      data: [],
    },
    {
      name: "Book",
      data: [],
    }
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


const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
    const [listUser, setListUser] = useState();
    const [listTutor, setlistTutor] = useState();
    const [listLike, setListLike] = useState();
    const [listPost, setListPost] = useState();
    const [listComment, setListComment] = useState();
    const [listBook, setlistBook] = useState();
    const [dataChart, setDataChart] = useState();

    useEffect(() => {

      getData();
      getDataChart();
      dataChart && dataChart.map((data)=>{
        // console.log("Abc: "+data.month);
        chartOptions.series[0].data = chartOptions.series[0].data.concat(data.quantityPost);
        chartOptions.series[1].data = chartOptions.series[1].data.concat(data.quantityLike);
        chartOptions.series[2].data = chartOptions.series[2].data.concat(data.quantityComment);
        chartOptions.series[3].data = chartOptions.series[3].data.concat(data.quantityBook);
      })
    }, []);

     async function getData(){
        await callAPI('get', '/analysis/overview').then((res)=>{
            setListUser(res.data.user.data);
            setListPost(res.data.post.data);
            setListLike(res.data.like.data);
            setListComment(res.data.comment.data);
            setlistTutor(res.data.tutor.data);
            setlistBook(res.data.book.data);
        }).catch(err => console.log(err));
    }

    async function getDataChart(){
      await callAPI('get', '/analysis/chart').then((res)=>{
          setDataChart(res.data.analysis);
          res.data.analysis.map((data)=>{
            // console.log("Abc: "+data.month);
            chartOptions.series[0].data = chartOptions.series[0].data.concat(data.quantityPost);
            chartOptions.series[1].data = chartOptions.series[1].data.concat(data.quantityLike);
          })
          console.log("Post: "+chartOptions.series[0].data);
          console.log("Like: "+chartOptions.series[1].data);
      }).catch(err => console.log(err));
  }
    
    const topCustomers = {
      head: ["user", "avg star", "total vote"],
      body: [
        {
          username: "john doe",
          order: "490",
          price: "$15,870",
        },
        {
          username: "frank iva",
          order: "250",
          price: "$12,251",
        },
        {
          username: "anthony baker",
          order: "120",
          price: "$10,840",
        },
        {
          username: "frank iva",
          order: "110",
          price: "$9,251",
        },
        {
          username: "anthony baker",
          order: "80",
          price: "$8,840",
        },
      ],
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
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
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
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
