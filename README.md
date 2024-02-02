# Nalco Care Medical Appointment System 

## Overview

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The primary goal is to create a Medical Appointment System that allows patients to schedule appointments, view their appointments, and enables doctors and admins to manage and approve/reject appointments.

## Technologies Used

- **Frontend:**
  - React.js: User interface and interaction.
  - Redux: State management for a predictable state container.
  - Axios: Handling HTTP requests to the backend.

- **Backend:**
  - Node.js: Server-side JavaScript runtime.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing appointment and user data.

## Features

### 1. User Authentication

- Users can register and log in as patients, doctors, or admins.

### 2. Appointment Creation

- Patients can schedule appointments, providing details like date, time, and reason for the appointment.

### 3. Appointment Status

- Appointments have three status types: 
  - **Pending (Default):** Initial status when an appointment is created.
  - **Approved:** Status set by doctors after reviewing and approving the appointment.
  - **Rejected:** Status set by doctors when they cannot accommodate the appointment.

### 4. Patient Dashboard

- Patients can view their scheduled appointments, including status information.

### 5. Doctor Approval/Rejection

- Doctors have the authority to approve or reject appointments based on their availability and suitability.

### 6. Admin Dashboard

- Admins can access a centralized dashboard displaying all appointments, doctors, and patients.

### 7. Admin Approval/Rejection

- Admins can approve or reject appointments if needed, providing an additional layer of authorization.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install` in both the frontend and backend directories.
3. Set up MongoDB and configure the connection string in the backend.
4. Run the backend server using `npm start` in the backend directory.
5. Run the frontend application using `npm start` in the frontend directory.

## Usage

1. Navigate to the application through the provided URL.
2. Register or log in based on your role (patient, doctor, or admin).
3. Use the respective dashboard to create appointments, manage appointments, and perform necessary actions based on your role.

## Conclusion

This Nalco Care Medical Appointment System provides an efficient and organized way for patients, doctors, and admins to interact with and manage appointments. The clear separation of roles ensures secure and controlled access to the system's functionalities.