import * as React from "react";

const Navbar: React.FunctionComponent = () => {
  return (
    <div className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="text-2xl text-white font-bold">Logo</div>
          <div className="flex items-center">
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white ml-4">
              About
            </a>
            <a href="#" className="text-white ml-4">
              Services
            </a>
            <a href="#" className="text-white ml-4">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
