import React,{useState} from "react";
import './App.css';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = () => {
    const { username, email, dob, phone } = formData;
    if (!username || !email || !dob || !phone) {
      alert("Please fill in all fields.");
    } else if (!email.includes("@")) {
      alert("Please include an '@' in the email address.'hjhjhj' is missing an '@' ");
    } else if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      // Submit logic here
      alert("Form submitted successfully!");
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      setIsOpen(false);
    }
  };

  const closeModal = (e) => {
    if (e.target.className === "modal") {
      setIsOpen(false);
    }
  };
  return (
    <div>
      <h1>User Details Modal</h1>
      <button  onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              /><br/>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              /><br/>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleInputChange}
              /><br/>
               <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
              /><br/>
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
