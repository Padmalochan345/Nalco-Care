import React from "react";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";
import Appointments from "./Appointments";

const DoctorDashboard = () => {
  const items = [
    {
      name: "All Appointments",
      path: "/doctor",
    },
  ];

  const { user } = useAuth();
  if (user?.role !== "doctor") {
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
        <h1 className="text-2xl font-semibold text-center">Doctor Dashboard</h1>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Appointments user={user} />
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
