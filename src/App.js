import { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieBox from "./components/MovieBox/MovieBox";

function App() {
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
    <div className="container">
      <div className="grid">
        {movieData.map((movie) => {
          return <MovieBox key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
}
export default App;
