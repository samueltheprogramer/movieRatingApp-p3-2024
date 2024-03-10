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

export default function LikedMovies() {
  const [likedMovies, setLikedMovies] = useState([]);
  const likedMoviesRef = collection(db, "likedMovies");

  useEffect(() => {
    const querydata = query(
      likedMoviesRef,
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let likedMov = [];
      snapshot.forEach((doc) => {
        likedMov.push({ ...doc.data(), id: doc.id });
      });
      setLikedMovies(likedMov);
    });
    return () => unsuscribe;
  }, []);

  const handleDeleteMovies = async (id) => {
    const moviesDocs = doc(db, "likedMovies", id);
    await deleteDoc(moviesDocs);
  };
  return (
    <div>
      <Header />
      <h1 className="bg-red-600 m-2 text-white text-lg text-center">
        Liked Movies
      </h1>
      <div className="bg-red-500 m-2">
        {likedMovies.map((movie) => (
          <div key={movie.id}>
            <div className="flex gap-2 border-2 border-black m-2  items-center bg-gradient-to-b from-blue-500 to-red-500">
              <Image
                src={"https://image.tmdb.org/t/p/w500/" + movie.moviePoster}
                width={50}
                height={50}
              />
              <h1 className="w-[150px]">{movie.movieTitel}</h1>
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
