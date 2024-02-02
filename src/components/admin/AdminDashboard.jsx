import React from "react";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";
import { Button } from "flowbite-react";

const AdminDashboard = () => {
  const items = [
  
    {
      name: "All Doctors",
      path: "/admin/all-doctors",
    },
    {
      name: "All Appointments",
      path: "/admin/all-appointments",
    },
    {
      name: "All Patients",
      path: "/admin/all-patients",
    },
  
  ];
  
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return (
      <>
        <h1 className="mt-8 text-2xl font-semibold text-center">
          You are not authorized to view this page
        </h1>
      </>
    );
  }

  return (
    <>
      <Dashboard items={items} />
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>
        <Button.Group outline>
            <Link to="/admin/all-doctors">
              <Button
                className="border-2 hover:border-sky-400"
                gradientDuoTone="tealToLime"
              >
                All Doctors
              </Button>
            </Link>
            <Link to="/admin/all-appointments">
              <Button
                gradientDuoTone="tealToLime"
                className="border-2 hover:border-sky-400"
              >
                All Appointments
              </Button>
            </Link>
            <Link to="/admin/all-patients">
              <Button
                gradientDuoTone="tealToLime"
                className="border-2 hover:border-sky-400"
              >
                All Patients
              </Button>
            </Link>
          </Button.Group>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
