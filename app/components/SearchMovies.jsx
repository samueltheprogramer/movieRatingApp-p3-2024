"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Trailer from "./Trailer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function SearchMovies() {
  const API_KEY = "api_key=5e7ca356aa22007a90bb1814d63031f9";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

  const IMG_PREFIX = "https://image.tmdb.org/t/p/w500/";
  const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

  const [popularMovies, setPopularMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(0);

  const likedMoviesRef = collection(db, "likedMovies");
  const ratedMoviesRef = collection(db, "ratedMovies");

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getMovies = async (url) => {
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPopularMovies(data.results);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (movieName) {
      getMovies(SEARCH_URL + "&query=" + movieName);
    } else {
      getMovies(API_URL);
    }
  };

  const addToLikedMovies = async (movieTitel, moviePoster) => {
    await addDoc(likedMoviesRef, {
      movieTitel,
      moviePoster,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });
  };
  const addToRatedMovies = async (movieTitel, moviePoster) => {
    await addDoc(ratedMoviesRef, {
      movieTitel,
      moviePoster,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      ratings: rating,
    });
  };

  return (
    <div>
      <form className="flex justify-between items-center m-4 ">
        <div className="flex flex-col justify-center  items-center">
          <div>
            <label htmlFor="search" className="text-center">
              Enter Movie Name
            </label>
          </div>
          <input
            className="w-[150px] ring-2 ring-black bg-white"
            type="text"
            name=""
            id="search"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <button
            className="border-2 border-red-400 rounded-3xl mt-1 bg-blue-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className=" className=" flex flex-col justify-center items-center>
          <Image
            className="rounded-full"
            src={auth?.currentUser?.photoURL}
            width={50}
            height={50}
            alt="profile pic"
          />
          <h1 className="text-sm">{auth?.currentUser?.displayName}</h1>
          <button className="border-2 border-blue-400 rounded-3xl mt-1 bg-red-400 text-sm">
            sign-out
          </button>
        </div>
      </form>

      <div className="p-2">
        {popularMovies.map((movie, index) => (
          <div
            key={index}
            className=" border-2 border-black mb-2 shadow-md  bg-gradient-to-b from-blue-500 to-red-500 w-[300] "
          >
            <div className="flex flex-col justify-center items-center m-4 gap-4 ">
              <div className="flex  w-full">
                <div className="">
                  <Image
                    width={100}
                    height={150}
                    className="h-[150px] "
                    src={IMG_PREFIX + movie?.poster_path}
                    alt="IMG"
                  />
                </div>
                <div className="text-center flex w-full flex-col justify-center items-center">
                  <h1>{movie?.title}</h1>
                  <h3>{movie?.release_date}</h3>
                  <h1>Ratings :{movie?.vote_average}/10</h1>

                  <div>
                    <label htmlFor="">like:</label>
                    <input
                      className="rounded-md bg-white"
                      onChange={(e) => {
                        e.target.checked
                          ? addToLikedMovies(movie?.title, movie?.poster_path)
                          : "";
                      }}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </div>
                  <div>
                    <label htmlFor="">personal ratings :</label>
                    <input
                      type="number"
                      name=""
                      id=""
                      className="w-8 rounded-md bg-white"
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <span>/10</span>
                  </div>
                  <button
                    className="border-2 border-blue-500 rounded-3xl mt-1 bg-red-400"
                    onClick={() =>
                      addToRatedMovies(movie.title, movie.poster_path)
                    }
                  >
                    done!
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Image
                  width={300}
                  height={150}
                  className="h-[150px]"
                  src={IMG_PREFIX + movie.backdrop_path}
                  alt="IMG"
                />
                 <Trailer movieId={movie.id} />

                <p className="text-center">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
