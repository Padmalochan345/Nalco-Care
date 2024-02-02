import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../common";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterDoctor = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "doctor",
    specilization: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     setLoading(true);
     const data = await register(user);
     setLoading(false);
     toast.success("Registration successful");
     console.log("Submitted:", data);
     setUser({});
     navigate(`/${data.role}`);
   } catch (error) {
      setLoading(false);
      toast.error(error.message);
   }
  };
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
     <div className="flex flex-row items-center justify-center">
          <Link
            to="/register"
            className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2  "
          >
            Register as Patient
          </Link>
        </div>
      <div className="container mx-auto mt-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md p-8 mx-auto bg-white rounded-md shadow-md"
        >
          <h2 className="mb-4 text-2xl font-semibold">Register Doctor</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Doctor Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="specilization"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              specilization{" "}
            </label>
            <input
              id="specilization"
              name="specilization"
              value={user.specilization}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
            ></input>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Register Doctor
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterDoctor;
