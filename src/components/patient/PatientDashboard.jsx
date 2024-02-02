import React from "react";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";

import { Link, Outlet } from "react-router-dom";
import { Button } from "flowbite-react";

const PatientDashboard = () => {
  const items = [
    {
      name: "All Appointments",
      path: "/patient/appointments",
    },
    {
      name: "Book Appointments",
      path: "/patient/book-appointment",
    },
  ];

  const { user } = useAuth();
  if (user?.role !== "patient") {
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
        <h1 className="text-2xl font-semibold text-center">
          Patient Dashboard
        </h1>
        <div>
          <h1 className="font-semibold text-md">
            <span className="mr-2 text-slate-500">Name:</span> {user?.name}
          </h1>
          <h1 className="font-semibold text-md">
            <span className="mr-2 text-slate-500">Email:</span> {user?.email}
          </h1>
          <h1 className="font-semibold text-md">
            <span className="mr-2 text-slate-500">Role:</span> {user?.role}
          </h1>
          <Button.Group outline>
            <Link to="/patient/appointments">
              <Button
                className="border-2 hover:border-sky-400"
                gradientDuoTone="tealToLime"
              >
                Appointments
              </Button>
            </Link>
            <Link to="/patient/book-appointment">
              <Button
                gradientDuoTone="tealToLime"
                className="border-2 hover:border-sky-400"
              >
                Book Appointment
              </Button>
            </Link>
          </Button.Group>
        </div>

        <div className="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
