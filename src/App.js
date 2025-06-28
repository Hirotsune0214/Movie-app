import { useEffect, useState } from "react";
import "./App.css";
import {
  API_POPULAR,
  API_SEARCH,
  API_UPCOMING,
  API_NOWPLAYING,
} from "./constants";

import "bootstrap/dist/css/bootstrap.min.css";
import MovieBox from "./components/MovieBox/MovieBox";
import Header from "./components/Header/Header";

function App() {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_NOWPLAYING);
        const data = await res.json();
        console.log(data);
        setMovieData(data.results);

        return data;
      } catch (error) {
        alert("データ取得に失敗しました。");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    // console.log(query);
    try {
      const res = await fetch(`${API_SEARCH}${query}`);
      const data = await res.json();
      setMovieData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchUpcoming = async () => {
    try {
      const res = await fetch(`${API_UPCOMING}`);
      const data = await res.json();
      // console.log("test");
      setMovieData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchPopular = async () => {
    try {
      const res = await fetch(`${API_POPULAR}`);
      const data = await res.json();
      // console.log("test");
      setMovieData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        onSearch={handleSearch}
        onClickUpcoming={FetchUpcoming}
        onClickPopular={FetchPopular}
      />
      <div className="container">
        <div className="grid">
          {movieData.length === 0 ? (
            <h1 className="noMovie">Sorry, No movie</h1>
          ) : (
            movieData.map((movie) => {
              return <MovieBox key={movie.id} {...movie} />;
            })
          )}
        </div>
      </div>
    </>
  );
}
export default App;
