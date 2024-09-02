import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">{currentYear}</span>
                <a
                  href="#"
                  className="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  {" "}
                  Passer Digital Inc.
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
