import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import "./Contact.css"; // Make sure to include the CSS file properly

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if any of the form fields are empty
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields."); 
      return; // Exit the function if any field is empty
    }
  
    // Handle form submission
    console.log(formData);
  
    alert("Your message has been submitted successfully!"); 
    // Clear form data after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contactus">
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit} // Call handleSubmit function onClick as well
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
