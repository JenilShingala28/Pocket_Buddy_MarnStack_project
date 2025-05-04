import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assets/admindashboard.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Link } from "react-router-dom";

const COLORS = [
  " #264653",
  " #287271",
  " #2a9d8f",
  " #8ab17d",
  " #babb74",
  
  " #f4a261",
  " #e76f51",
  " #411308",
  " #0466c8",
  " #8cedb0",
  " #d60000",
  " #7a0045",
  " #b429f9",
  " #e9c46a",
];

export const DashBord = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [isLoader, setisLoader] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOffer: 0,
    totalRating: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("/dashboard/count");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  const chartData = [
    { name: "user", value: stats.totalUsers },
    { name: "restaurants", value: stats.totalRestaurants },
    { name: "offer", value: stats.totalOffer },
    { name: "rating", value: stats.totalRating },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/location/getall");
        setData(res.data.data);
        processChartData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const processChartData = (restaurants) => {
    // Process Category Data
    const categoryCount = {};
    restaurants.forEach((restaurant) => {
      categoryCount[restaurant.category] =
        (categoryCount[restaurant.category] || 0) + 1;
    });
    setCategoryData(
      Object.entries(categoryCount).map(([key, value]) => ({
        name: key,
        value,
      }))
    );

    // Process City Data
    const cityCount = {};
    restaurants.forEach((restaurant) => {
      cityCount[restaurant.cityId.name] =
        (cityCount[restaurant.cityId.name] || 0) + 1;
    });
    setCityData(
      Object.entries(cityCount).map(([key, value]) => ({
        name: key,
        count: value,
      }))
    );
  };

  useEffect(() => {
    axios
      .get("/offer/getall")
      .then((response) => {
        const offers = response.data.data;
        const foodTypeCounts = offers.reduce((acc, offer) => {
          acc[offer.foodType] = (acc[offer.foodType] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(foodTypeCounts).map((key) => ({
          name: key,
          value: foodTypeCounts[key],
        }));

        setData(chartData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //rating
  const [averageRatings, setAverageRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get("/rating/getall");
        const ratingsData = response.data.data;

        // Step 1: Group ratings by restaurantName
        const restaurantGroups = {};
        ratingsData.forEach((rating) => {
          const name = rating.restaurantName;
          if (!restaurantGroups[name]) {
            restaurantGroups[name] = [];
          }
          restaurantGroups[name].push(rating.rating);
        });

        // Step 2: Calculate average rating per restaurant
        const averages = Object.entries(restaurantGroups).map(
          ([restaurantName, ratings]) => {
            const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
            return {
              restaurantName,
              averageRating: parseFloat(avg.toFixed(2)),
            };
          }
        );

        setAverageRatings(averages);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  const funnelData = [...averageRatings]
    .sort((a, b) => b.reviewCount - a.reviewCount) // highest to lowest
    .map((item, index) => ({
      ...item,
      fill: `hsl(${index * 30}, 70%, 60%)`, // generate color per item
    }));

  return (
    <>
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
            <Link to="/admin/alluser">
              <input type="submit" value="view" className="login-button" />
            </Link>
          </div>
          <div className="stat-box">
            <h3>Total Restaurants</h3>
            <p>{stats.totalRestaurants}</p>
            <Link to="/admin/restolist">
              <input type="submit" value="view" className="login-button" />
            </Link>
          </div>
          <div className="stat-box">
            <h3>Total Offer</h3>
            <p>{stats.totalOffer}</p> {/* Corrected property */}
            <Link to="/admin/offerlist">
              <input type="submit" value="view" className="login-button" />
            </Link>
          </div>
          <div className="stat-box">
            <h3>Total Rating</h3>
            <p>{stats.totalRating}</p>
            <Link to="/admin/ratinglist">
              <input type="submit" value="view" className="login-button" />
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* Charts Box */}
        <div style={styles.chartsWrapper}>
          <div style={styles.chartBox}>
            <h3 style={styles.chartTitle}>Number Of All Data</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill=" #441752" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartBox}>
            <h2 style={styles.chartTitle}>Restaurants per City</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill=" #441752" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartBox}>
            <h2 style={styles.chartTitle}>
              Restaurant Categories Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* <div style={styles.chartBox}>
            <h2 style={styles.chartTitle}>Offer Food Type</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div> */}

          <div style={styles.chartBox}>
            <h2 style={styles.chartTitle}>Average Ratings per Restaurant</h2>
            <ResponsiveContainer width="100%" height={550}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={averageRatings}
                  dataKey="averageRating"
                  nameKey="restaurantName"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  innerRadius={70}
                  label
                >
                  {averageRatings.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* donut chart */}
        </div>
      </div>
    </>
  );
};

// ✅ CSS-in-JS for Modern Box Design
const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    background: " #441752",
    borderRadius: "10px",
    border: "1px solid #efb6c8",
    boxShadow: " 0 2px 15px #441752",
    margin: "30px",
  },
  chartsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  chartBox: {
    width: "420px",
    backgroundColor: " #efb6c8",
    border: "1px solid #8174a0",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px #efb6c8",
   
  },
  
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: " #441752",
  },
};
