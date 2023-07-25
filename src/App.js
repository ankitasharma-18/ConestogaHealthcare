import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ConfirmationPage from './ConfirmationPage';
import Payment from './Payment';




const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [patientIdInput, setPatientIdInput] = useState('');
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [doctorsByDepartment, setDoctorsByDepartment] = useState({});
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const handlePaymentOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // You can implement any necessary logic here based on the selected payment option.
    // For example, you can call an API to make the actual payment transaction.
    // For this example, we'll just show a confirmation message.
    setError('');
    if (selectedPaymentOption === 'insurance') {
      // Handle insurance payment
      setSelectedPaymentOption(null); // Reset selected payment option after confirmation
    } else if (selectedPaymentOption === 'credit_debit') {
      // Handle credit/debit card payment
      // Redirect to the payment gateway page
      // For demonstration purposes, we'll just show a confirmation message
      setSelectedPaymentOption(null); // Reset selected payment option after confirmation
    }
  };




  useEffect(() => {
    // Fetch department names from the server when the component mounts
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/departments'); // Replace with the actual API endpoint
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  
 
    // Fetch doctors by department from the server when the department changes
    const fetchDoctorsByDepartment = async (selectedDepartment) => {
      try {
        setError('');
        if (selectedDepartment) {
          const response = await axios.get(`http://localhost:8080/doctors/${selectedDepartment}`);
          setDoctorsByDepartment((prevDoctorsByDept) => ({
            ...prevDoctorsByDept,
            [selectedDepartment]: response.data,
          }));
        } else {
          // If no department is selected, clear the doctor list
          setDoctorsByDepartment({});
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
   ;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic for submitting the form data and booking the appointment
      // Make sure to include any necessary API calls here
      setError('');
      // Resetting the form after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setDoctor('');
      setDepartment('');
      setDate('');
      setTime('');
    } catch (error) {
      // Handle any errors that occur during form submission
      setError('An error occurred while booking the appointment.');
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    setDoctor('');
    fetchDoctorsByDepartment(selectedDepartment); // Fetch doctors for the selected department
  };
  const handlePatientIdChange = (e) => {
    setPatientIdInput(e.target.value);
    setSearchedPatient(null);
  };

  const searchPatient = async () => {
    try {
      setError('');
      // Fetch patient details based on the entered patient ID
      const response = await axios.get(`http://localhost:8080/patients/${patientIdInput}`);
      setSearchedPatient(response.data);
    } catch (error) {
      // Handle the case when patient ID is not found in the database
      setError('Patient ID not found in the database.');
    }
  };

 

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="form-container">
          <h1 className="heading">Appointment Booking</h1>
          <form className="appointment-form" onSubmit={handleSubmit}>
            {/* Other form inputs (name, email, phone, etc.) as in your original code */}
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              id="patientId"
              value={patientIdInput}
              onChange={handlePatientIdChange}
              required
            />
            <button type="button" onClick={searchPatient}>
              Search Patient
            </button>
            {error && <p className="error">{error}</p>}
            {searchedPatient && (
              <div>
                {/* Display patient details if found */}
                <h2>Patient Details</h2>
                <p>Name: {searchedPatient.Name}</p>
                <p>Phone: {searchedPatient.Phone}</p>
                {/* Include any other patient details you want to display */}
              </div>
            )}
             
             <label htmlFor="department">Department:</label>
            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option value={dept} key={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <label htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {department &&
                doctorsByDepartment[department]?.map((doc) => (
                  <option value={doc.doctorid} key={doc.doctorid}>
                    {doc.Name}
                  </option>
                ))}
            </select>


            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

<label htmlFor="paymentOption">Payment Option:</label>
            <select
              id="paymentOption"
              value={selectedPaymentOption}
              onChange={handlePaymentOptionChange}
              required
            >
              <option value="">Select Payment Option</option>
              <option value="insurance">Insurance</option>
              <option value="credit_debit">Payment via Credit/Debit</option>
            </select>

            {/* Conditionally render the confirmation page or the payment gateway page */}
            {selectedPaymentOption === 'insurance' ? (
              // <ConfirmationPage />
              <button type="submit">
              <Link to="/ConfirmationPage">Book Appointment</Link>
            </button>
            ) : selectedPaymentOption === 'credit_debit' ? (
              // <Payment />
              <button type="submit">
              <Link to="/Payment">Book Appointment</Link>
            </button>
            ) : null}

            
          </form>
        </div>
      </main>

    
    </div>
  

  );
};

export default AppointmentForm;