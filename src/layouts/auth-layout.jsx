import React from "react";
import { MainLoader } from "../components/ui/main-loader";
import { Outlet } from "react-router-dom";
import Logo from "../assets/logo.png";

const AuthLayout = () => {

  return (
    <div className="relative h-[93%] w-full flex flex-wrap md:flex-nowrap text-gray-900">
      {/* Left Side - Background & Branding */}
      <div className="basis-full md:basis-1/2 relative flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Background Image */}
        <div className="absolute inset-0 hidden md:block">
          <img
            src="https://i.pinimg.com/736x/d3/2f/4b/d32f4bf33dd7e0468ac5888178e2c571.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0))",
            }}
          />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-white"></div>

        </div>

        {/* Content (Logo & Title) */}
        <div className="relative z-10 flex flex-col items-center md:items-end text-center md:text-end space-y-4">
          <img src={Logo} alt="Logo" className="w-40 object-contain" />

          <h1 className=" text-xl lg:text-3xl xl:text-3xl font-extrabold text-gray-900">
            Welcome to <span className="text-[var(--primary-gold)]">CATERS HUB</span>
          </h1>

          <p className="text-gray-600 text-lg hidden md:block">
            Your one-stop solution for seamless catering management.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <main className="basis-full md:basis-1/2 flex items-center justify-center bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;

