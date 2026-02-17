import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Analytics.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const [postData, setPostData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 3;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postData.length / postPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const chartData = [
    { name: "Admin", posts: 5 },
    { name: "User", posts: 3 },
    { name: "Test", posts: 4 },
    { name: "Demo", posts: 2 },
  ];
  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Author", key: "author" },
    { label: "Date", key: "createdAt" },
    { label: "Actions", key: "action" },
  ];

  const autherCount = postData.reduce((acc, post) => {
    const authername = post.auther;
    if (authername) {
      acc[authername] = (acc[authername] || 0) + 1;
    }
    return acc;
  }, {});

  const chartDatas = Object.keys(autherCount).map((auther) => ({
    name: auther,
    posts: autherCount[auther],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <>
      <div className="analytics-page">
        <Navbar />
        <main className="analytics-main">
          <header className="analytics-header">
            <h1>Blog Analytics</h1>
            <p>Insights into your blog's performace and activity.</p>
          </header>

          <div className="charts-container">
            <div className="chart-card">
              <h3>Posts per Author</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartDatas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="posts"
                      fill="#8884d8"
                      name="Number of posts"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <h3>Disttibution</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartDatas}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="posts"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {chartDatas.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="posts-table-section">
            <h3>All Posts</h3>
            <div className="table-wrapper">
              <table className="analytics-table">
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th>{header.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentPosts.map((post) => (
                    <tr>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.auther}</td>
                      <td>{post.createdAt}</td>
                      <td className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(post.id)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelet(post.id)}
                          title="delet"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`page-btn ${currentPage === number + 1 ? "active" : ""}`}
                >
                  {number + 1}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Analytics;
