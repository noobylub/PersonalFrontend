import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useFormik } from "formik";
import useHttpHook from "../Hooks/FetchHook";

function HomePage() {
  const { error, loading, sendBackEnd, clearError } = useHttpHook();
  const [ToEdit, setToEdit] = useState(false);
  let person = JSON.parse(window.sessionStorage.getItem("person"));
  useEffect(() => {
    console.log("ediited");
    person = JSON.parse(window.sessionStorage.getItem("person"));
  });

  const Formik = useFormik({
    initialValues: {
      description: person.description,
      profession: person.profession,
      gender: `${person.gender}`,
      origin: `${person.origin}`,
    },
    enableReinitialize: true,
    async onSubmit(val) {
      try {
        const data = await sendBackEnd(
          `http://localhost:3001/person/edit-profile/${person._id}`,
          { "Content-Type": "application/json" },
          "POST",
          JSON.stringify({
            description: val.description,
            profession: val.profession,
            gender: val.gender,
            origin: val.origin,
          })
        );
        console.log(data);
        window.sessionStorage.setItem("person", JSON.stringify(data.person));
      } catch (err) {
        console.log(err);
      }

      setToEdit(false);
      console.log(val);
    },
  });

  return (
    <div className="home-page">
      <div className="name">
        <h1>Welcome</h1>
        <h2>{person.name}</h2>
        <hr />
      </div>
      <div className="main-profile">
        <div className="description describe">
          <h2>Description</h2>
          {ToEdit ? (
            <textarea
              className="inputting descr"
              name="description"
              onChange={Formik.handleChange}
              value={Formik.values.description}
            ></textarea>
          ) : (
            <p>{person.description}</p>
          )}
        </div>
        <div className="description describe">
          <h2>Profession</h2>
          {ToEdit ? (
            <textarea
              className="inputting descr"
              name="profession"
              onChange={Formik.handleChange}
              value={Formik.values.profession}
            ></textarea>
          ) : (
            <p>{person.profession}</p>
          )}
        </div>
        <div className="gender describe">
          <h2>Gender</h2>
          {ToEdit ? (
            <textarea
              className="inputting gender"
              name="gender"
              placeholder={person.gender}
              onChange={Formik.handleChange}
              value={Formik.values.gender}
            ></textarea>
          ) : (
            <p>{person.gender}</p>
          )}
        </div>
        <div className="origin describe">
          <h2>Origin</h2>
          {ToEdit ? (
            <textarea
              className="inputting origin"
              name="origin"
              placeholder={person.origin}
              onChange={Formik.handleChange}
              value={Formik.values.origin}
            ></textarea>
          ) : (
            <p>{person.origin}</p>
          )}
        </div>
        {ToEdit ? (
          <button onClick={Formik.handleSubmit}>Submit</button>
        ) : (
          <button
            onClick={() => {
              setToEdit(true);
            }}
            className="change button"
          >
            Change Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
