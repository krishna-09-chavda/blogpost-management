import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./PostDetails.css";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const location = useLocation();
  const from = location.state?.from;
  const [showPostDetails, setShowPostDetails] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      const data = await response.json();
      setShowPostDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleBack = () => {
   navigate(from || "/dashboard");
  };
  return (
    <>
      <div className="post-details-page">
        <Navbar />

        <main className="post-details-container">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
            {from === "/favorites" ? "Back to favorites":"Back to feed"}
          </button>
          <article className="full-post">
            <header className="post-header">
              <div className="post-category">Journal</div>
              <h1 className="post-full-title">{showPostDetails.title}</h1>

              <div className="post-author-meta">
                <div className="author-info">
                  <div className="author-avatar">A</div>
                  <div>
                    <span className="author-name">
                      {showPostDetails.auther}
                    </span>
                    <div className="post-date-row">
                      <span>
                        <FaCalendarAlt />
                        {showPostDetails.createdAt}
                      </span>
                      <span className="dot"></span>
                      <span>
                        <FaClock />5 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="post-featured-image">
              <img src={showPostDetails.imageurl} alt="post" />
            </div>

            <div className="post-body">
              <p>{showPostDetails.description}</p>
              <p>
                This layout structure remains exactly the same as your dynamic
                but now it works as a pure static UI component.
              </p>
            </div>

            <footer className="post-footer">
              <div className="post-share">
                <span>Share this story:</span>

                <div className="share-buttons">
                  <button className="share-btn">Twitter</button>
                  <button className="share-btn">LinkedIn</button>
                  <button className="share-btn">Link</button>
                </div>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
};

export default PostDetails;