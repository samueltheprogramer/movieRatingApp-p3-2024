import React from "react";
import SearchMovies from "../components/SearchMovies";
import Header from "../components/Header";

export default function page() {
  return (
    <div className="bg-gradient-to-r  from-blue-500 to-red-500  ">
      <Header />
      <SearchMovies />
    </div>
  );
}
