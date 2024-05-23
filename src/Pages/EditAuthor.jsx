import axios from "axios";
import { useFormik } from "formik";
import React, {useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const EditAuthor = () => {
  const { id } = useParams();
  const [data1, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(data1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    formik.setValues(data1);
  }, [data1]);

  const validationSchema = Yup.object().shape({
    author: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*(?: [A-Z][a-zA-Z]+(?:['-][A-Z][a-zA-Z]+)*)*$/,
        "proper name is required"
      )
      .required("Author name is required"),
    birthdate: Yup.string().required("birth date of publication"),
    bio: Yup.string().required("bio is required"),
  });

  const formik = useFormik({
    initialValues: {
      author: "",
      birthdate: "",
      bio: "",
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
        navigate(`/author/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteAuthor = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`, {
          author: "",
          birthdate: "",
          bio: "",
        })
        .then((e) => console.log(e.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    formik.author = "";
    console.log(formik.values);
  };
  return (
    <div className="form-background">
      <div className="form">
        <h1>
          Edit Author details of{" "}
          <span className="fst-italic">{data1.title}</span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="author"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.author}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Author's Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.date}</label>
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
              value={formik.values.bio}
              onChange={formik.handleChange}
            />
            <label className="text-danger">{formik.errors.bio}</label>
          </div>
          <div className="w-100 d-flex">
            <button type="submit" className="btn btn-success button">
              Okay
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline-danger ms-3"
            >
              Cancel
            </button>
            <button
              onClick={deleteAuthor}
              className="btn btn-outline-danger ms-auto"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuthor;
