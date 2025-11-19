import React from "react";
import axios from "axios";
import { API } from "./api";

function DeleteBook({ id, refresh }) {
  const handleDeleteBook = async () => {
    try {
      await axios.delete(`${API}/${id}`);
      alert("Deleted!");
      refresh();
    } catch (err) {
      console.log("Error deleting book:", err);
    }
  };

  return (
    <button className="delete-btn" onClick={handleDeleteBook}>
      Delete
    </button>
  );
}

export default DeleteBook;
