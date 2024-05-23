import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "./Pages/Books";
import EditBook from "./Pages/EditBook";
import CreateBook from "./Pages/CreateBook";
import EditAuthor from "./Pages/EditAuthor";
import Author from "./Pages/Author";
import CreateAuthor from "./Pages/CreateAuthor";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/createauthor/:id" element={<CreateAuthor />} />
          <Route path="/author/edit/:id" element={<EditAuthor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
