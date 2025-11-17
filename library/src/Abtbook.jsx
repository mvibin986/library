import React, { useEffect, useState } from "react";
import axios from "axios";
import './book.css'
   

const API = "http://localhost:9000/api/products";

function BookApp() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [searchId, setSearchId] = useState("");
  const [foundBook, setFoundBook] = useState(null);

  
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API);
      setBooks(res.data);
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const handleAddBook = async () => {
    try {
      await axios.post(`${API}/add`, form);
      alert("Book added!");
      setForm({ name: "", category: "", description: "" });
      fetchBooks();
    } catch (err) {
      console.log("Error adding book:", err);
    }
  };


 const handleFindBook = async () => {
  try {
    const res = await axios.get(`${API}/${searchId}`);
    setFoundBook(res.data.book[0]);  // << FIXED
  } catch (err) {
    alert("Book not found!");
  }
};



  const handleDeleteBook = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
    alert("Deleted!");
    fetchBooks();
  } catch (err) {
    console.log("Error deleting book:", err);
  }
};


  return (
    <div className="box">
      <h1 className="title">Library Management</h1>

     
      <div className="section">
        <h2>Add New Book</h2>

        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="btn" onClick={handleAddBook}>Add Book</button>
      </div>

      
      <div className="section">
        <h2>Find Book by ID</h2>

        <input
          className="input"
          placeholder="Enter book ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <button className="btn" onClick={handleFindBook}>Find</button>

        {foundBook && (
          <div className="found-box">
            <h3>Found Book:</h3>
            <p><b>Name:</b> {foundBook.name}</p>
            <p><b>Category:</b> {foundBook.category}</p>
            <p><b>Description:</b> {foundBook.description}</p>
          </div>
        )}
      </div>

 
      <h2>All Books</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="book-list">
          {books.map((b) => (
            <li className="book-item" key={b.id}>
              <b>{b.name}</b> — {b.category}
              <br />
              {b.description}
              <br />
              <button className="delete-btn" onClick={() => handleDeleteBook(b.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookApp;

