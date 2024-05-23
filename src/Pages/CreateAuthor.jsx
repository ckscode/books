import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const CreateAuthor = () => {
  const { id } = useParams();
  const [data1, setData] = useState([]);
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/${id}`)
      .then((res) => {
        setData(res.data);
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
    birthdate: Yup.string().required("birth date of author"),
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
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="form-background">
      <div className="form">
        <h3>
          Create Author details for
          <br />
          <span className="fst-italic">{data1.title}</span>
        </h3>
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
            <label className="text-danger">{formik.errors.birthdate}</label>
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

export default CreateAuthor;
