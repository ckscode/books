import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const CreateBook = () => {
  const navigate = useNavigate();

  const validationSchema1 = Yup.object().shape({
    title: Yup.string().required("title is required"),
    author: Yup.string().matches(
      /^[A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*(?: [A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*)*$/,
      "proper name is required"
    ),
    isbn: Yup.string()
      .matches(
        /^(?:\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?[\dX]|\d{3}[- ]?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?\d)$/,
        "not a valid ISBN"
      )
      .required("ISBN number is required"),
    date: Yup.string().required("select date of publication"),
    birthdate: Yup.string(),
    bio: Yup.string(),
  });

  const formik1 = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      date: "",
      birthdate: "",
      bio: "",
    },
    validationSchema: validationSchema1,
    onSubmit: async (values) => {
      try {
        await axios
          .post("https://6642ef123c01a059ea20db85.mockapi.io/api/books", values)
          .then((e) => console.log(e.data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="form-background ">
      <div className="form ">
        <h1 className="mb-4 text-center">Add Book</h1>
        <form onSubmit={formik1.handleSubmit}>
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
              value={formik1.values.title}
              onChange={formik1.handleChange}
            />
            <label className="text-danger">{formik1.errors.title}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="author"
              name="author"
              value={formik1.values.author}
              onChange={formik1.handleChange}
            />
            <label className="text-danger">{formik1.errors.author}</label>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Author's Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              name="birthdate"
              value={formik1.values.birthdate}
              onChange={formik1.handleChange}
            />
             <label className="text-danger">{formik1.errors.birthdate}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              About Author
            </label>
            <textarea
              
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="author"
              name="bio"
              value={formik1.values.bio}
              onChange={formik1.handleChange}
            />
             <label className="text-danger">{formik1.errors.bio}</label>
          </div> */}
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
              value={formik1.values.isbn}
              onChange={formik1.handleChange}
            />
            <label className="text-danger">{formik1.errors.isbn}</label>
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
              value={formik1.values.date}
              onChange={formik1.handleChange}
            />
            <label className="text-danger">{formik1.errors.date}</label>
          </div>
          <button type="submit" className="btn btn-success">
            Create
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

export default CreateBook;
