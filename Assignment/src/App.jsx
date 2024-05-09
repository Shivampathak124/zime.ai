// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, selectedTags]);

  const fetchData = async () => {
    try {
      let url =
        `https://dummyjson.com/posts?skip=${(currentPage - 1) * 10}&limit=10`;
      const response = await axios.get(url);
      setData(response.data.posts);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
// console.log(data)
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
  };

  return (
    <div>
      <h1>JSON Table Pagination</h1>

      <Table data={data} />
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} >
        Next
      </button>
    </div>
  );
};

export default App;
