import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);

    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Please enter a valid date.");
    } else if (!validateEmail(formData.email)) {
      alert("Invalid email. Please check your email address.");
    } else if (!validatePhoneNumber(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else {
      toggleModal();
    }
  };

  const validateEmail = (email) => {

    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={toggleModal}>Open Form</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <form onSubmit={handleSubmit} className="form">
                <h1>Fill Details</h1>
                <h2>Username:</h2>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <h2>Email Address:</h2>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <h2>Phone Number:</h2>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <h2>Date of Birth:</h2>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;