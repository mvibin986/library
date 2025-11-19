import React, { useState } from "react";
import axios from "axios";
import { API } from "./api";

function UpdateBook({ refresh }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
  });

  const handleUpdateBook = async () => {
    try {
      if (!form.id) {
        alert("Enter ID to update");
        return;
      }

      await axios.patch(`${API}/up/${form.id}`, {
        name: form.name,
        category: form.category,
        description: form.description,
      });

      alert("Book Updated!");
      setForm({ id: "", name: "", category: "", description: "" });
      refresh();
    } catch (err) {
      console.log("Error updating book:", err);
    }
  };

  return (
    <div className="section">
      <h2>Update Book</h2>

      <input
        className="input"
        placeholder="ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />

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

      <button className="btn" onClick={handleUpdateBook}>
        Update Book
      </button>
    </div>
  );
}

export default UpdateBook;
