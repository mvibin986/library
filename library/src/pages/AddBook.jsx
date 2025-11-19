import React, { useState } from "react";
import axios from "axios";
import { API } from "./api";

function AddBook({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleAddBook = async () => {
    try {
      await axios.post(`${API}/add`, form);

      alert("Book added!");
      setForm({ name: "", category: "", description: "" });
      refresh();
    } catch (err) {
      console.log("Error adding book:", err);
    }
  };

  return (
    <div className="section">
      <h2>Add New Book</h2>

      <input
        className="input"
        placeholder="Book Name"
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
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="btn" onClick={handleAddBook}>
        Add Book
      </button>
    </div>
  );
}

export default AddBook;
