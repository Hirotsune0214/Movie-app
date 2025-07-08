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

import toast, { Toaster } from "react-hot-toast";
import PaginationControls from "./components/PaginationControls/PaginationControls";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState("NOWPLAYING");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page = 1) => {
    try {
      toast.loading("Fetching new page");
      const res = await fetch(`${API_NOWPLAYING}&page=${page}`);
      const data = await res.json();
      setMovieData(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      toast.dismiss();
      toast.success("New page fetched successfully", {
        duration: 1500, // 1.5秒間表示後に自動的に非表示にする
      });
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Failed to acquire data");
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    try {
      setMode("SEARCH");
      setSearchQuery(query);
      const res = await fetch(`${API_SEARCH}${query}&page=${page}`);
      const data = await res.json();
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      setMovieData(data.results);
      toast.dismiss();
      toast.success("New page fetched successfully", {
        duration: 1500, // 1.5秒間表示後に自動的に非表示にする
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchUpcoming = async (page = 1) => {
    try {
      setLoading(true);
      setMode("UPCOMING");
      setSearchText("");
      toast.loading("Fetching new page");
      const res = await fetch(`${API_UPCOMING}&page=${page}`);
      const data = await res.json();
      setMovieData(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      toast.dismiss();
      toast.success("New page fetched successfully", {
        duration: 1500, // 1.5秒間表示後に自動的に非表示にする
      });
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Failed to acquire data");
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  const FetchPopular = async (page = 1) => {
    try {
      setLoading(true);
      setMode("POPULAR");
      setSearchText("");
      toast.loading("Fetching new page");
      const res = await fetch(`${API_POPULAR}&page=${page} + 1`);
      const data = await res.json();
      setMovieData(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      toast.dismiss();
      toast.success("New page fetched successfully", {
        duration: 1500, // 1.5秒間表示後に自動的に非表示にする
      });
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Failed to acquire data");
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = async (page = 1) => {
    if (currentPage < totalPages) {
      if (mode === "NOWPLAYING") {
        await fetchData(currentPage + 1);
      } else if (mode === "UPCOMING") {
        await FetchUpcoming(currentPage + 1);
      } else if (mode === "POPULAR") {
        await FetchPopular(currentPage + 1);
      } else if (mode === "SEARCH") {
        await handleSearch(searchQuery, currentPage + 1);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage === 1) {
      return;
    } else if (mode === "NOWPLAYING") {
      await fetchData(currentPage - 1);
    } else if (mode === "UPCOMING") {
      await FetchUpcoming(currentPage - 1);
    } else if (mode === "POPULAR") {
      await FetchPopular(currentPage - 1);
    } else if (mode === "SEARCH") {
      await handleSearch(searchQuery, currentPage - 1);
    }
  };

  return (
    <>
      <Toaster />
      <Header
        setSearchText={setSearchText}
        searchText={searchText}
        onSearch={(query) => handleSearch(query, 1)}
        onClickUpcoming={() => FetchUpcoming(1)}
        onClickPopular={() => FetchPopular(1)}
      />
      {loading ? (
        <></>
      ) : (
        <div className="container">
          <div className="grid">
            {movieData.length === 0 ? (
              <h1 className="noMovie">Sorry, No movie</h1>
            ) : (
              movieData.map((movie) => {
                return <MovieBox key={movie.id} {...movie} />;
              })
            )}
            <PaginationControls
              onClickNext={handleNextPage}
              onClickPrevious={handlePreviousPage}
              currentPage={currentPage}
              totalPages={totalPages}
              isPrevDisabled={currentPage === 1}
              isNextDisabled={currentPage === totalPages}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default App;
