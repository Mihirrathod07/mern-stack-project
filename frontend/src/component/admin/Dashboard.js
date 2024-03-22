import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import MetaData from "../layout/MataData.js";
import Chart from "chart.js/auto";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
    const { isAuthenticated } = useSelector((state) => state.user);


    let totalAmount = 0;
    orders && orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const Navigate = useNavigate();
  useEffect(() => {
     if(isAuthenticated === false){
        Navigate("/login")
     }
  }, [Navigate, isAuthenticated]); 

  useEffect(() => {
    // Line Chart
    const lineChartCanvas = document.getElementById("lineChart");
    const lineChartContext = lineChartCanvas.getContext("2d");

    // Destroy existing Chart instance
    if (lineChartCanvas.chart) {
      lineChartCanvas.chart.destroy();
    }

    // Create new Chart instance
    lineChartCanvas.chart = new Chart(lineChartContext, {
      type: "line",
      data: {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: "tomato",
            borderColor: "tomato",
            data: [0, totalAmount],
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
          },
        },
      },
    });

    // Doughnut Chart
    const doughnutChartCanvas = document.getElementById("doughnutChart");
    const doughnutChartContext = doughnutChartCanvas.getContext("2d");

    // Destroy existing Chart instance
    if (doughnutChartCanvas.chart) {
      doughnutChartCanvas.chart.destroy();
    }

    // Create new Chart instance
    doughnutChartCanvas.chart = new Chart(doughnutChartContext, {
      type: "doughnut",
      data: {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products?.length - outOfStock], // Use optional chaining
          },
        ],
      },
    });
  });

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <canvas id="lineChart"></canvas>
        </div>

        <div className="doughnutChart">
          <canvas id="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
