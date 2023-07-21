import React, { useState } from 'react';
import './ManageAppointment.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments from the database or API
  const fetchAppointments = () => {
    // Replace this with actual logic to fetch appointments
    // Set the fetched appointments in the state
    const fetchedAppointments = []; // Fetch appointments from the database or API
    setAppointments(fetchedAppointments);
  };

  // Function to update an appointment
  const updateAppointment = (appointmentId) => {
    // Replace this with actual logic to update appointment
    // Implement the update functionality based on the appointmentId
    console.log(`Updating appointment with id ${appointmentId}`);
  };

  // Function to delete an appointment
  const deleteAppointment = (appointmentId) => {
    // Replace this with actual logic to delete appointment
    // Implement the delete functionality based on the appointmentId
    console.log(`Deleting appointment with id ${appointmentId}`);
  };

  return (
    <div className="manage-appointment">
      <Header />

      <h1>Manage Appointments</h1>
      <div className="options">
        <button>
          <Link to="/ViewAppointments">View Appointments</Link>
        </button>
        <button onClick={() => console.log('Option 2 clicked')}>
          Update Appointment
        </button>
        <button onClick={() => console.log('Option 3 clicked')}>
          Delete Appointment
        </button>
      </div>

      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <button onClick={() => updateAppointment(appointment.id)}>
                    Update
                  </button>
                  <button onClick={() => deleteAppointment(appointment.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
      <Footer />
    </div>
  );
};

export default ManageAppointment;
