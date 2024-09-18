import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Admin = () => {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState("");
  const [users, setUsers] = useState([]);
  // console.log(products.map((x=>console.log(x,'jjj'))));

  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    });
    setModalShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update logic here
    console.log("Updated Data:", userData);
    setModalShow(false);
  };

  useEffect(() => {
    setloggedInUser(localStorage.getItem("UserName"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("UserName");
    localStorage.removeItem("Role");
    localStorage.removeItem("Email");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const fetchUsers = async () => {
    try {
      const url = "http://localhost:8080/users/data";
      // console.log(url);

      const headers = {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      };
      // console.log(headers);

      const response = await fetch(url, headers);
      // console.log(response.status);
      if (response.status === 403) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("UserName");
        localStorage.removeItem("Role");
        localStorage.removeItem("Email");
        navigate("/login");
      } else {
        const result = await response.json();
        setUsers(result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const delUser = async (id) => {
    try {
      const url = `http://localhost:8080/auth/del${id}`;
      console.log(url);

      const headers = {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      };
      setTimeout(() => {
        handleSuccess("User Deleted Succesfully");
      }, 1000);
      const response = await axios.delete(url, headers);
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update
  const updateUser = async (id) => {
    try {
      const url = `http://localhost:8080/auth/update${id}`;
      console.log(url);

      console.log("update data----", users);

      setTimeout(() => {
        handleSuccess("User Updated Succesfully");
      }, 1000);
      const response = await axios.put(url, userData);
      console.log(response);
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511796638626-185958765b0f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
        }}
      >
        <div
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "rgb(68 80 118 / 71%)" }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome, User</h1>

          <div className="mb-6">
            {users.map((item, index) => (
              <div
                key={index}
                className="mb-4 p-4 border-b-2 border-gray-200 last:border-0 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">Name: {item.name}</h2>
                  <p>Email: {item.email}</p>
                  <p>Role: {item.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleUpdateClick(item)}
                    data-hs-overlay="#hs-vertically-centered-modal"
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => {
                      delUser(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          <div
            id="hs-vertically-centered-modal"
            className={`fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto ${
              modalShow ? "flex" : "hidden"
            } items-center justify-center`}
          >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-bold text-gray-800">Update User</h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setModalShow(false)}
                >
                  &times;
                </button>
              </div>
              <div className="p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={userData.role}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                    <button
                      type="button"
                      className="py-2 px-3 text-sm font-medium rounded-lg border bg-gray-200 text-gray-800"
                      onClick={() => setModalShow(false)}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        updateUser(userData._id);
                      }}
                      type="submit"
                      className="py-2 px-3 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Logout
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Admin;
