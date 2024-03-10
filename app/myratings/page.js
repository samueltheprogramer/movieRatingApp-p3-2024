"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import Image from "next/image";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import Header from "../components/Header";

export default function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const ratedMoviesRef = collection(db, "ratedMovies");

  useEffect(() => {
    const querydata = query(
      ratedMoviesRef,
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let ratedMov = [];
      snapshot.forEach((doc) => {
        ratedMov.push({ ...doc.data(), id: doc.id });
      });
      setRatedMovies(ratedMov);
    });
    return () => unsuscribe;
  }, []);

  const handleDeleteMovies = async (id) => {
    const moviesDocs = doc(db, "ratedMovies", id);
    await deleteDoc(moviesDocs);
  };
  return (
    <div>
      <Header />
      <h1 className="bg-blue-600 m-2 text-white text-lg text-center">
        Rated Movies
      </h1>
      <div className="bg-blue-500 m-2">
        {ratedMovies.map((movie) => (
          <div key={movie.id}>
            <div className="flex gap-2 border-2 border-black m-2 items-center bg-gradient-to-b from-blue-500 to-red-500">
              <Image
                src={"https://image.tmdb.org/t/p/w500/" + movie.moviePoster}
                width={50}
                height={50}
              />
              <div>
                <h1>{movie.movieTitel}</h1>
                <h2>MyRatings :{movie.ratings}/10</h2>
              </div>
              <button
                className="border-2 border-blue-500 rounded-3xl mt-1 ml-20 w-5"
                onClick={() => handleDeleteMovies(movie.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
