import React from "react";
import backgroundImage from "../../assets/landing_background.jpeg";
import { Button } from "@mui/material";
export const Header = (props) => {
  return (
    <header
      id="header"
      className="relative flex items-center justify-center h-full bg-cover bg-center gap-4"
      style={{ backgroundImage: `url(${backgroundImage}) ` }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: 1 }}
      ></div>
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold">
          {props.data ? props.data.title : "Loading"}
        </h1>
        <p className="my-4 text-lg md:text-xl">
          {props.data ? props.data.paragraph : "Loading"}
        </p>
        <Button variant="contained" color="primary">
          <a
            href="#about"
          >
            Learn More
          </a>
        </Button>
      </div>
    </header>
  );
};
