import React, { createContext, useState } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Books from './Pages/Books';
import EditBook from './Pages/EditBook';
import CreateBook from './Pages/CreateBook';
import EditAuthor from './Pages/EditAuthor';
import Author from './Pages/Author';
import CreateAuthor from './Pages/CreateAuthor';

export const thisId = createContext('')
const App = () => {
  const [id,setId] = useState()
  return (
 <div>
  <BrowserRouter>
  <div>
  <Navbar/>
  </div>
  <thisId.Provider value={{id,setId}}>
  <Routes>
    
    <Route path="/" element={<Books id={id} setId={setId}/>}/>
    <Route path="/createbook" element={<CreateBook/>}/>
    <Route path="/edit/:id" element={<EditBook id={id}/>}/>
    <Route path="/author/:id" element={<Author id={id}/>}/>
    <Route path="/createauthor/:id" element={<CreateAuthor id={id}/>}/>
    <Route path="/author/edit/:id" element={<EditAuthor id={id}/>}/>
    
  </Routes>
  </thisId.Provider>
  </BrowserRouter>
 </div>
  );
};

export default App;