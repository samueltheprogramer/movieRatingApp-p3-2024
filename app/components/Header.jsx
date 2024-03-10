"use client";

import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div>
      <h1 className="bg-blue-950 text-white text-center  text-xl">
        Movie Ratting App{" "}
      </h1>
      <Navbar />
    </div>
  );
}
