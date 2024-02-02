import React, { useEffect } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

const AllPatients = () => {
  const { patients, fetchPatient, delIt } = useData();
  const { user } = useAuth();
  useEffect(() => {
    if (patients.length === 0) {
      fetchPatient();
    }
  });

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">All Patients</h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            fetchPatient();
          }}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {" "}
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-4 border-2 rounded-md shadow-md border-sky-100 shadow-sky-50 hover:shadow-sky-200 "
          >
            {" "}
            <div className="flex items-center space-x-4">
              {" "}
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/patient-2460481-2128797.png"
                alt={patient.name}
                className="w-16 h-16 rounded-full"
              />{" "}
              <div>
                {" "}
                <h1 className="text-xl font-semibold">{patient.name}</h1>{" "}
                <p className="text-sm font-semibold">{patient.email}</p>{" "}
                <p className="text-sm font-semibold">{patient.medHistory}</p>{" "}
              </div>{" "}
            </div>{" "}
            {user.role === "admin" && (
              <button
                onClick={() => delIt(patient._id, "patient")}
                className="text-white bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
              >
                Delete
              </button>
            )}
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default AllPatients;
