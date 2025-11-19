import React, { useState } from "react";
import axios from "axios";
import { API } from "./api";

function FindBook() {
  const [searchId, setSearchId] = useState("");
  const [foundBook, setFoundBook] = useState(null);

  const handleFindBook = async () => {
    try {
      const res = await axios.get(`${API}/${searchId}`);
      setFoundBook(res.data.book[0]);
    } catch (err) {
      alert("Book not found!");
    }
  };

  return (
    <div className="section">
      <h2>Find Book by ID</h2>

      <input
        className="input"
        placeholder="Enter book ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <button className="btn" onClick={handleFindBook}>
        Find
      </button>

      {foundBook && (
        <div className="found-box">
          <h3>Found Book:</h3>
          <p><b>Name:</b> {foundBook.name}</p>
          <p><b>Category:</b> {foundBook.category}</p>
          <p><b>Description:</b> {foundBook.description}</p>
        </div>
      )}
    </div>
  );
}

export default FindBook;
