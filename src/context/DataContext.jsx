// context/DataContext.js
import React, { createContext, useContext, useState } from "react";
import {
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
  getDoctorAppointments,
  getUser,
  getPatientAppointments,
  deleteEle,
} from "../data/api";
import toast from "react-hot-toast";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchDoctor = async () => {
    try {
      const doctorsData = await getAllDoctors();

      setDoctors(doctorsData.doctors);
      toast.success(doctorsData.message || "Doctors fetched successfully");
      return doctorsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchPatient = async () => {
    try {
      const patientsData = await getAllPatients();

      setPatients(patientsData.patients);

      return patientsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");

      throw error;
    }
  };

  const fetchAppointment = async () => {
    try {
      const appointmentsData = await getAllAppointments();
      setAppointments(appointmentsData.appointments);
      return appointmentsData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchDoctorAppointment = async (id) => {
    try {
      const appointmentsData = await getDoctorAppointments(id);

      setAppointments(appointmentsData.appointments);

      return appointmentsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      throw error;
    }
  };
  const fetchPatientAppointment = async (id) => {
    try {
      const appointmentsData = await getPatientAppointments(id);

      setAppointments(appointmentsData.appointments);

      return appointmentsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");

      throw error;
    }
  };

  const getPatientfromEmail = async (email) => {
    const patient = await getUser(email, "patient");
    if (patient === undefined) {
      throw new Error("Patient not found");
    }
    return patient._id;
  };
  const getDoctorfromEmail = async (email) => {
    const doctor = await getUser(email, "doctor");
    if (doctor === undefined) {
      throw new Error("Doctor not found");
    }
    return doctor._id;
  };

  const getPendingAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "pending"
    );
  };
  const getApprovedAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "approved"
    );
  };
  const getRejectedAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "rejected"
    );
  };

  const delIt = async (id, ele) => {
    try {
      const item = await deleteEle(id, ele);
      toast.success(item.message || "Deleted Successfully");
      if (ele === "patient") {
        await fetchPatient();
      } else if (ele === "doctor") {
        await fetchDoctor();
      } else if (ele === "appointment") {
        await fetchAppointment();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <DataContext.Provider
      value={{
        doctors,
        patients,
        appointments,
        fetchDoctor,
        fetchPatient,
        fetchAppointment,
        getPatientfromEmail,
        getDoctorfromEmail,
        fetchDoctorAppointment,
        fetchPatientAppointment,
        getPendingAppointments,
        getApprovedAppointments,
        getRejectedAppointments,
        delIt,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { DataProvider, useData };
