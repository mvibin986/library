import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import "./book.css";

import AddBook from "./AddBook.jsx";
import UpdateBook from "./UpdateBook.jsx";
import FindBook from "./FindBook.jsx";
import DeleteBook from "./DeleteBook.jsx";

function BookApp() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="box">
      <h1 className="title">Library Management</h1>

      <AddBook refresh={fetchBooks} />
      <UpdateBook refresh={fetchBooks} />
      <FindBook />

      <h2>All Books</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="book-list">
          {books.map((b) => (
            <li className="book-item" key={b.id}>
                <h7>{b.id}</h7>
              <b>{b.name}</b> — {b.category}
              <br />
              {b.description}
              <br />
              <DeleteBook id={b.id} refresh={fetchBooks} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookApp;
