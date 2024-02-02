import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Button } from "flowbite-react";
import { approveAppointment, rejectAppointment } from "../../data/api";
import { Loading } from "../common";
import { AppointmentCard } from "../admin/AllAppointments";
import toast from "react-hot-toast";

const Appointments = ({ user }) => {
  const {
    appointments,
    fetchDoctorAppointment,
    getApprovedAppointments,
    getRejectedAppointments,
  } = useData();

  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDoctorAppointment(user._id);
      setApps(data.appointments);
      setIsLoading(false);
      toast.success(data?.message || "Appointments Fetched Successfully");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  const allApps = () => {
    setApps(appointments);
  };
  const ApprovedApps = () => {
    setApps(getApprovedAppointments());
  };
  const RejectedApps = () => {
    setApps(getRejectedAppointments());
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      <h1>All Appointments</h1>
      <div className="flex flex-row"></div>
      <button
        onClick={() => {
          getAppointments();
        }}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Refresh
      </button>
      <Button.Group outline>
        <Button onClick={allApps} gradientDuoTone="tealToLime">
          All Appointments
        </Button>
        <Button onClick={ApprovedApps} gradientDuoTone="purpleToBlue">
          Approved Appointments
        </Button>

        <Button onClick={RejectedApps} gradientDuoTone="pinkToOrange">
          Rejected Appointments
        </Button>
      </Button.Group>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid grid-cols-2 ">
          {apps.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              handleApprove={approveAppointment}
              handleReject={rejectAppointment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Appointments;
