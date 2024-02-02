import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { approveAppointment, rejectAppointment } from "../../data/api";
import { Loading } from "../common";
import toast from "react-hot-toast";
import { Card } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";

const AllAppointments = () => {
  const { appointments, fetchAppointment } = useData();
  const [isLoading, setIsLoading] = useState(true);

  const approveApp = async (id) => {
    try {
      setIsLoading(true);
      const data = await approveAppointment(id);
      setIsLoading(false);
      toast.success(data?.message || "Appointment Approved Successfully");
      getAppointments();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const rejectApp = async (id) => {
    try {
      setIsLoading(true);
      const data = await rejectAppointment(id);
      setIsLoading(false);
      toast.success(data?.message || "Appointment Rejected Successfully");
      getAppointments();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAppointment();
      setIsLoading(false);
      toast.success(data?.message || "Appointments Fetched Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments();
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      <h1>All Appointments</h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            getAppointments();
          }}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid grid-cols-2 ">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              handleApprove={approveApp}
              handleReject={rejectApp}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AllAppointments;

export function AppointmentCard({ appointment, handleApprove, handleReject }) {
  const { _id, patient, doctor, date, slot, details, status } = appointment;
  const {delIt} = useData();
  const { user } = useAuth();
  return (
    <Card
      className="max-w-sm "
      imgSrc="https://www.shutterstock.com/image-vector/doctor-appointment-request-icon-on-260nw-1385436422.jpg"
      horizontal
    >
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Patient Name:</span> {patient?.name}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Doctor Name:</span> {doctor?.name}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Date:</span> {date}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Slot:</span> {slot}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Details:</span> {details}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Status:</span>{" "}
        {
          <span
            className={`${
              status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : status === "approved"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            } px-2 py-1 rounded-full`}
          >
            {status}
          </span>
        }
      </p>
      {
        user?.role === "admin" && (  
          <button
          onClick={() => delIt(_id,"appointment")}
          className="text-white bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete
        </button>
        )
      }
      {status === "pending" && user.role !== "patient" && (
        <div className="flex justify-center">
          <button
            onClick={() => handleApprove(_id)}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(_id)}
            className="text-white bg-gradient-to-r from-cyan-500 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Reject
          </button>
        </div>
      )}
    </Card>
  );
}
