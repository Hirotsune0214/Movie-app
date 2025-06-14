import { useEffect, useState } from "react";
import "./App.css";
import MovieBox from "./components/MovieBox";

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=bb46848237eacc0a36827f6639b47ee3";

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
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

  return (
    <div>
      {movieData.map((movie) => {
        return <MovieBox key={movie.id} {...movie} />;
      })}
    </div>
  );
}
export default App;
