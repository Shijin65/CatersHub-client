import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const Contact = () => {
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
  };

  return (
    <div
      id="contact"
      className="py-10 px-6 md:px-16 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white rounded-3xl relative z-10"
    >
      <h3 className="text-3xl font-bold text-center mb-8">Contact Us</h3>

      <div className="flex flex-col md:flex-row gap-12 justify-between items-center">
        {/* Contact Info */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="flex items-center text-lg font-medium">
              <MapPinIcon className="w-6 h-6 mr-2" />
              Address
            </p>
            <p className="ml-8">4321 California St, San Francisco, CA 12345</p>
          </div>

          <div>
            <p className="flex items-center text-lg font-medium">
              <PhoneIcon className="w-6 h-6 mr-2" />
              Phone
            </p>
            <p className="ml-8">+1 123 456 1234</p>
          </div>

          <div>
            <p className="flex items-center text-lg font-medium">
              <EnvelopeIcon className="w-6 h-6 mr-2" />
              Email
            </p>
            <p className="ml-8">info@company.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-xl p-6 shadow-lg text-black space-y-5">
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            variant="outlined"
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};
