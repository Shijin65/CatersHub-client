import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  return (
    <footer className="w-full  py-12">
      {/* Top Section */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 ">
        {/* Left Section */}
        <div className="md:w-2/4 flex flex-col items-center " >
          {/* Logo and Site Name */}
          <div className="my-auto gap-3 items-center ">
            <img src={Logo} alt="Site Logo" className="w-20 h-20 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800">CATERS HUB</h2>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-3 gap-8 text-sm flex-1">
          <div>
            <h4 className="font-semibold mb-2">Product</h4>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Features
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Testimonials
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Highlights
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Pricing
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              FAQs
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              About Us
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Careers
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Press
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Terms
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Privacy
            </Link>
            <Link className="block text-gray-600 hover:text-blue-600" to="#">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-6 mx-6"></div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-3">
          <Link to="#" className="hover:text-blue-600">
            Privacy Policy
          </Link>
          <span className="opacity-50">•</span>
          <Link to="#" className="hover:text-blue-600">
            Terms of Service
          </Link>
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-3 text-gray-600">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <InstagramIcon size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <XIcon size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
