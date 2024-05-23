import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState([]);
  const [authorData, setAuthor] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const fetchData = async () => {
    await axios
      .get(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/`)
      .then((e) => setData(e.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setAuthor(data.filter((e) => e.id === id));
  }, [data]);
  console.log(authorData);
  return (
    <div className="form-background ">
      <div className="form pb-3">
        {authorData &&
          authorData.map((ele, index) => {
            return (
              <div key={ele.id}>
                <h1>{ele.author}</h1>

                <p className="mb-0 fw-bold">Birthdate</p>
                {ele.birthdate ? (
                  <p>{ele.birthdate}</p>
                ) : (
                  <p className="text-danger">click edit to add birthdate</p>
                )}

                <p className="mb-0 fw-bold">About Author</p>
                {ele.bio ? (
                  <p>{ele.bio}</p>
                ) : (
                  <p className="text-danger">
                    click edit to add details about Author
                  </p>
                )}
                <div className="w-100 d-flex pt-4">
                  <button
                    onClick={() => {
                      navigate(`/author/edit/${ele.id}`);
                    }}
                    className="ms-auto btn btn-success button py-0 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-outline-danger ms-3 py-0 button"
                  >
                    Back
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Author;
