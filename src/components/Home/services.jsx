import React from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CakeIcon from "@mui/icons-material/Cake";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import SpaIcon from "@mui/icons-material/Spa";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const data = [
  {
    icon: <RestaurantMenuIcon fontSize="large" />,
    name: "Custom Menu Planning",
    text: "Tailor-made menus to suit your event, dietary preferences, and theme.",
  },
  {
    icon: <CakeIcon fontSize="large" />,
    name: "Wedding Catering",
    text: "Elegant catering solutions to make your special day even more memorable.",
  },
  {
    icon: <BusinessIcon fontSize="large" />,
    name: "Corporate Catering",
    text: "Professional catering services for business meetings, conferences, and office parties.",
  },
  {
    icon: <HomeIcon fontSize="large" />,
    name: "Private Events",
    text: "From birthday parties to family gatherings, we offer personalized catering experiences.",
  },
  {
    icon: <SpaIcon fontSize="large" />,
    name: "Vegetarian & Vegan Options",
    text: "We provide delicious and thoughtfully curated plant-based menu options.",
  },
  {
    icon: <LocalShippingIcon fontSize="large" />,
    name: "On-Site & Delivery",
    text: "Enjoy the convenience of on-site catering or delivery straight to your event.",
  },
];

export const Services = () => {
  return (
    <div
      id="services"
      className="text-center h-full py-16 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white -mt-5 z-10 relative rounded-3xl"
    >
      <div className="container mx-auto my-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold">OUR SERVICES</h2>
          <p className="mt-2 text-lg">
            We provide high-quality solutions tailored to meet your needs,
            ensuring excellence and reliability in every project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data
            ? data.map((service, index) => (
                <div key={index} className="flex flex-col items-center">
                   <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm">{service.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
