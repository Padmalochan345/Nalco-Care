import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Button } from "flowbite-react";
import { approveAppointment, rejectAppointment } from "../../data/api";
import { Loading } from "../common";
import { AppointmentCard } from "../admin/AllAppointments";
import { useAuth } from "../../context/AuthContext";

const PatientAppointments = () => {
  const { user } = useAuth();
  const {
    appointments,
    fetchPatientAppointment,
    getApprovedAppointments,
    getRejectedAppointments,
  } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState(appointments);
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPatientAppointment(user._id);
      setApps(data.appointments);
      setIsLoading(false);
      toast.success(data?.message || "Appointments Fetched Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ApprovedApps = () => {
    setApps(getApprovedAppointments());
  };
  const RejectedApps = () => {
    setApps(getRejectedAppointments());
  };
  const allApps = () => {
    setApps(appointments);
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      <h1>All Appointments</h1>

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

export default PatientAppointments;
