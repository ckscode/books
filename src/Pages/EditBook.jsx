import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { thisId } from "../App";

const EditBook = () => {
  const {id} = useContext(thisId)
  const [data1, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`) .then((res) => {
        setData(res.data);
        console.log(data1);
      }).catch((error)=>console.log(error))
  };

  useEffect(() => {
    formik.setValues(data1);
  }, [data1]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    author: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*(?: [A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*)*$/,
        "proper name is required"
      )
      .required("Author name is required"),
    isbn: Yup.string()
      .matches(
        /^(?:\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?[\dX]|\d{3}[- ]?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?\d)$/,
        "not a valid ISBN"
      )
      .required("ISBN number is required"),
    date: Yup.string().required("select date of publication"),
    birthdate: Yup.string().required("birth date of author"),
    bio: Yup.string().required("bio is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      isbn: "",
      date: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios
          .put(
            `https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`,
            values
          )
          .then((e) => console.log(e.data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="form-background">
      <div className="form ">
        <h1>Edit Book</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.title}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Book ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="12345"
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.isbn}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              publish date
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.date}</label>
          </div>
          <button type="submit" className="btn btn-success button">
            Yes
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-danger ms-3"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
