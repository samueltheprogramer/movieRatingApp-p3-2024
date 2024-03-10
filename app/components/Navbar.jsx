"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className=" text-blue-800 text-lg border-2 border-blue-800  flex justify-between m-1 text-center items-center bg-gradient-to-r  from-blue-500 to-red-500 ">
        <Link href="/home" className=" hover:bg-blue-400 rounded-lg">
          Home
        </Link>
        <Link href="/myratings" className=" hover:bg-blue-400 rounded-lg">
          Ratings
        </Link>
        <Link href="/likedmovies" className=" hover:bg-blue-400 rounded-md">
          Liked
        </Link>
      </div>
    </div>
  );
}
