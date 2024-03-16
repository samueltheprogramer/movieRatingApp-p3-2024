import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Trailer({ movieId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, [movieId]);

  const getVideos = async () => {
    try {
      await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?api_key=5e7ca356aa22007a90bb1814d63031f9&language=en-US"
      )
        .then((res) => res.json())
        .then((data) => {
          setVideos(data.results);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ReactPlayer
        width={300}
        height={150}
        url={`https://www.youtube.com/embed/${videos[0]?.key}`}
      />
    </div>
  );
}
