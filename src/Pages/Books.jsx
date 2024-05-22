import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { thisId } from "../App";

const Books = () => {
    const {setId} = useContext(thisId);
  const [data, setData] = useState();
  const [deleteData, setDelete] = useState(true);
  const navigate = useNavigate();
  const [authorData, setAuthor] = useState();
  useEffect(() => {
    fetchData();
  }, [deleteData]);

  const fetchData = async () => {
    try {
      await axios
        .get("https://6642ef123c01a059ea20db85.mockapi.io/api/books")
        .then((e) => {
          setData(e.data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBook = async (id) => {
    try {
      await axios
        .delete(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`)
        .then((e) => setDelete(!deleteData));
    } catch (error) {
      console.log(error);
    }
  };

  const editBook = (e) => {
    navigate(`/edit/${e}`);
  };

  const getAuthor = (e) =>{
    navigate(`/author/${e}`)
  };
 
  return (
    <div className="py-4">
      <button
        onClick={() => navigate("/createbook")}
        className="btn btn-outline-light rounded-5 ms-3 py-1 fw-bold border-2"
      >
        + Add Book
      </button>
      <div className="row w-100 mx-auto ">
        {data &&
          data.map((ele, index) => {
            return (
              <div
                key={ele.id}
                className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col- p-3"
              >
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title head fw-bold">{ele.title}</h3>
                    <p className="card-text ">
                      {ele.author ? (
                        <>
                          <span className="fw-bold">by-</span>
                          <button
                            className=" fw-bold text-success fst-italic btn"
                            onClick={(e) => {
                                e.preventDefault();
                              setId(ele.id);
                             getAuthor(ele.id)
                            }}
                          >
                            {ele.author}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setId(ele.id);
                            navigate(`/createauthor/${ele.id}`);
                          }}
                          className="btn btn-info py-0"
                        >
                          Add Author
                        </button>
                      )}
                    </p>
                    <p className="card-text ">
                      Published on: <span className="fw-bold">{ele.date}</span>
                    </p>
                    <p className="card-text ">
                      ISBN: <span className="fw-bold">{ele.isbn}</span>
                    </p>
                    <div className="w-100 d-flex justify-content-end">
                      <button
                        className="btn btn-outline-info button me-2 py-0"
                        onClick={() => {
                          setId(ele.id);
                          editBook(ele.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger button py-0"
                        onClick={() => deleteBook(ele.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
               
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Books;
