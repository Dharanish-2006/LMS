import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    aadharNumber: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleRoleSelection = (role) => {
    setRole(role);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      role,
      ...formData
    };

    axios.post('http://localhost:5000/submit', data)
      .then(response => {
        setMessage('Details submitted successfully!');
        setFormData({
          name: '',
          phoneNumber: '',
          aadharNumber: '',
          address: ''
        });
      })
      .catch(error => {
        setMessage('Error submitting details: ' + error.message);
      });
  };

  return (
    <div className="App">
      <h1>Worker or Builder App</h1>
      {role ? (
        <div>
          <h2>Enter Your Details - You are a {role}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            /><br></br>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            /><br></br>
            <input
              type="text"
              name="aadharNumber"
              placeholder="Aadhar Number"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
            /><br></br>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            /><br></br>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Are you a Worker or Builder?</h2>
          <button onClick={() => handleRoleSelection('Worker')}>I am a Worker</button>
          <button onClick={() => handleRoleSelection('Builder')}>I am a Builder</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
