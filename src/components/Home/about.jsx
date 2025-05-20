import React from "react";
import aboutImage from "../../assets/about_image.jpg";

export const About = (props) => {
  return (
    <div id="about" className=" flex items-center h-full my-10">
      <div className="flex flex-col gap-6 container mx-auto px-6 lg:px-20 ">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={aboutImage}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p className="text-gray-600 mb-4">
              {props.data ? props.data.paragraph : "loading..."}
            </p>
          </div>
        </div>
        <div>
          {/* Why Choose Us */}
          <h3 className="text-xl text-center font-semibold mb-3">Why Choose Us?</h3>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3  gap-4 pt-3">
            {props.data
              ? props.data.Why.map((d, i) => (
                  <div key={`${d}-${i}`} className="flex items-center">
                    ✅ <span className="ml-2">{d}</span>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>
    </div>
  );
};
