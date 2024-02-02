import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { createAppointment } from "../../data/api";
import { Loading } from "../common";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AllDoctors = () => {
  const [loading, setLoading] = useState(false);
  const {
    doctors,
    fetchDoctor,
    getDoctorfromEmail,
    getPatientfromEmail,
    delIt,
  } = useData();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorEmail: null,
    patientEmail: "",
    slot: "",
    date: "",
    details: "",
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleBookAppointment(doctor) {
    const availableSlots = doctor.availability;
    setSlots(availableSlots);
    setAppointmentData({
      doctorEmail: doctor.email,
      patientEmail: "",
      slot: availableSlots.length > 0 ? availableSlots[0] : "", // Default to the first available slot
      date: "",
      details: "",
    });
    setOpenModal(true);
  }

  const handleCreateAppointment = async () => {
    try {
      const { doctorEmail, patientEmail, slot, date, details } =
        appointmentData;
      setLoading(true);
      const doctorId = await getDoctorfromEmail(doctorEmail);
      const patientId = await getPatientfromEmail(patientEmail);
      const data = await createAppointment({
        doctorId,
        patientId,
        slot,
        date,
        details,
      });
      setLoading(false);
      toast.success("Appointment created successfully");
      setOpenModal(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length === 0) {
      fetchDoctor();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">All Doctors</h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            fetchDoctor();
          }}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {doctors.map((doctor) => {
          return (
            <div
              key={doctor.id}
              className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
            >
              <div className="bg-white shadow-md rounded-lg p-4">
                <div>
                  <div className="flex flex-row items-center space-x-4">
                    <img
                      className="justify-between h-auto rounded-full "
                      src="https://cdn.askapollo.com/live/images/doctors/defaultprofilepicmale.jpg"
                      alt={doctor.name}
                    />
                    <div>
                      <h1 className="font-semibold text-md">
                        <span className="mr-2 text-slate-500">Name:</span>{" "}
                        {doctor.name}
                      </h1>
                      <h1 className="font-semibold text-md">
                        <span className="mr-2 text-slate-500">
                          Specialization:
                        </span>
                        {doctor.specilization}
                      </h1>
                      <h1 className="font-semibold text-md">
                        {" "}
                        <span className="mr-2 text-slate-500">Email:</span>{" "}
                        {doctor.email}
                      </h1>
                      <div>
                        {doctor.availability.length > 0 ? (
                          <h1 className="font-semibold text-md">
                            {" "}
                            <span className="mr-2 text-slate-500">
                              Availability:
                            </span>{" "}
                            {doctor.availability.join(", ")}
                          </h1>
                        ) : (
                          <h1 className="font-semibold text-md">
                            {" "}
                            <span className="mr-2 text-slate-500">
                              Availability:
                            </span>{" "}
                            Not Available
                          </h1>
                        )}
                      </div>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => delIt(doctor._id, "doctor")}
                          className="text-white bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-end mt-2">
                    <Button
                      gradientMonochrome="lime"
                      onClick={() => handleBookAppointment(doctor)}
                    >
                      Book Appointment
                    </Button>
                  </div>

                  <Modal
                    show={openModal}
                    size="md"
                    onClose={onCloseModal}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="space-y-6">
                        <div>
                          <div className="block mb-2">
                            <Label htmlFor="doctorEmail" value="Doctor Email" />
                          </div>
                          <TextInput
                            id="doctorEmail"
                            value={appointmentData.doctorEmail}
                          />
                        </div>
                        <div>
                          <div className="block mb-2">
                            <Label
                              htmlFor="patientEmail"
                              value="Patient Email"
                            />
                          </div>
                          <TextInput
                            id="patientEmail"
                            placeholder="name@company.com"
                            value={appointmentData.patientEmail}
                            onChange={(e) =>
                              setAppointmentData({
                                ...appointmentData,
                                patientEmail: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <div className="block mb-2">
                            <Label htmlFor="slot" value="Appointment Slot" />
                          </div>
                          <select
                            id="slot"
                            value={appointmentData.slot}
                            onChange={(e) =>
                              setAppointmentData({
                                ...appointmentData,
                                slot: e.target.value,
                              })
                            }
                            required
                          >
                            {slots.map((slot) => (
                              <option key={slot} value={slot} className="p-2">
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="block mb-2">
                            <Label
                              htmlFor="details"
                              value="Appointment Details"
                            />
                          </div>
                          <TextInput
                            id="details"
                            value={appointmentData.details}
                            onChange={(e) =>
                              setAppointmentData({
                                ...appointmentData,
                                details: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <div className="block mb-2">
                            <Label htmlFor="date" value="Appointment Date" />
                          </div>
                          <TextInput
                            id="date"
                            type="date"
                            value={appointmentData.date}
                            onChange={(e) =>
                              setAppointmentData({
                                ...appointmentData,
                                date: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                          <Button
                            gradientMonochrome="cyan"
                            onClick={handleCreateAppointment}
                          >
                            Create Appointment
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllDoctors;
