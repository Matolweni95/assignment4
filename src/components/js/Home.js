import React, { useState, useEffect } from "react";
import "../css/Home.css";
import "../css/user.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import hero from "../assets/mpho.webp";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [usersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState(`http://localhost:5000/uploads/${user.image}`);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (error) {}
  };

  const handleDelete = async (userId) => {
    try {
      const del = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });

      setUsers(users.filter((users) => users.user_id !== userId));
    } catch (error) {}
  };

  const navigate = useNavigate();


  useEffect(() => {
    getUsers();
  }, []);

  // Calculate indexes for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="btn__container">
        <Link to="add">
          <Button className="btn" />
        </Link>
      </div>
      <div className="home__container">
        <div className="card__holder">
          {currentUsers.map((user, index) => (
            <div key={index} className="card">

              <div className="card__subcontainer">
                <div className="hero__container">
                  <img className="card__hero" src={`http://localhost:5000/uploads/${user.image}`} alt="User Hero" />
                </div>
                <div className="card__text">
                  <p className="heading">{user.name}</p>
                  <p className="name">{user.job_desc}</p>
                </div>
              </div>
              <div className="crud">
               
                  <button
                    className="overwrite"
                    onClick={() => navigate('/edit', {state:{user: user}})}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3_284)">
                        <path
                          d="M21.1944 2.41742L19.5826 0.805664C19.0459 0.268555 18.3421 0 17.6383 0C16.9345 0 16.2306 0.268555 15.6935 0.805234L0.552191 15.9466L0.00648821 20.8545C-0.0622618 21.4723 0.424574 22 1.02914 22C1.06739 22 1.10563 21.9979 1.14473 21.9936L6.04918 21.4517L21.1948 6.30609C22.2686 5.2323 22.2686 3.49121 21.1944 2.41742ZM5.41797 20.1386L1.42059 20.5816L1.86575 16.5782L13.2048 5.23918L16.7613 8.7957L5.41797 20.1386ZM20.2224 5.33414L17.7333 7.82332L14.1767 4.2668L16.6659 1.77762C16.9254 1.51809 17.2709 1.375 17.6383 1.375C18.0057 1.375 18.3507 1.51809 18.6107 1.77762L20.2224 3.38937C20.7583 3.92562 20.7583 4.79789 20.2224 5.33414Z"
                          fill="#164B60"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_284">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
              
                <a onClick={() => handleDelete(user.user_id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="25"
                    viewBox="0 0 23 25"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3_288)">
                      <path
                        d="M0.410713 3.125H5.75L7.475 0.9375C7.70454 0.646415 8.00219 0.410158 8.34437 0.247436C8.68655 0.0847151 9.06386 0 9.44643 0L13.5536 0C13.9361 0 14.3135 0.0847151 14.6556 0.247436C14.9978 0.410158 15.2955 0.646415 15.525 0.9375L17.25 3.125H22.5893C22.6982 3.125 22.8027 3.16616 22.8797 3.23941C22.9567 3.31267 23 3.41202 23 3.51562V4.29688C23 4.40048 22.9567 4.49983 22.8797 4.57309C22.8027 4.64635 22.6982 4.6875 22.5893 4.6875H21.619L19.9145 22.8662C19.8594 23.4491 19.577 23.9912 19.1229 24.3861C18.6688 24.7809 18.0758 24.9999 17.4605 25H5.53951C4.92422 24.9999 4.33122 24.7809 3.8771 24.3861C3.42299 23.9912 3.14061 23.4491 3.08549 22.8662L1.38103 4.6875H0.410713C0.301785 4.6875 0.197319 4.64635 0.120295 4.57309C0.0432701 4.49983 0 4.40048 0 4.29688V3.51562C0 3.41202 0.0432701 3.31267 0.120295 3.23941C0.197319 3.16616 0.301785 3.125 0.410713 3.125ZM14.2107 1.875C14.1339 1.77825 14.0347 1.6997 13.9207 1.64549C13.8067 1.59128 13.681 1.56288 13.5536 1.5625H9.44643C9.31898 1.56288 9.19334 1.59128 9.07934 1.64549C8.96535 1.6997 8.86607 1.77825 8.78929 1.875L7.80357 3.125H15.1964L14.2107 1.875ZM4.72321 22.7246C4.74012 22.9193 4.83352 23.1007 4.9848 23.2329C5.13607 23.365 5.33413 23.438 5.53951 23.4375H17.4605C17.6659 23.438 17.8639 23.365 18.0152 23.2329C18.1665 23.1007 18.2599 22.9193 18.2768 22.7246L19.971 4.6875H3.02902L4.72321 22.7246Z"
                        fill="#164B60"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_288">
                        <rect
                          width="23"
                          height="25"
                          fill="white"
                          transform="matrix(-1 0 0 1 23 0)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          ))}
          <div className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
              (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

        {users.length === 0 && <div className="userText">No User Records</div>}
      </div>
    </div>
  );
}

export default Home;
