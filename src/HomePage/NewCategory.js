import React, { useState } from "react";
import { useFormik } from "formik";
import useHttpHook from "../Hooks/FetchHook";
import * as Yup from "yup";

export default function NewCategory(person) {
  const { error, loading, sendBackEnd, clearError } = useHttpHook();

  const Formik = useFormik({
    initialValues: {
      CategoryTitle: "",
      CategoryDescription: "",
    },
    validationSchema: Yup.object({
      CategoryTitle: Yup.string()
        .max(20, "Must be shorter")
        .required("Put something PLZZ"),
      CategoryDescription: Yup.string()
        .min(10, "Come on put something more")
        .required("Put Something PLZZ"),
    }),
    async onSubmit(val) {

      console.log(val);
      try {
        const data = await sendBackEnd(
          `http://localhost:3001/category/create-category/${person.person._id}`,
          { "content-type": "application/json" },
          "POST",
          JSON.stringify({
            name: val.CategoryTitle,
            description: val.CategoryDescription,
          })
        );
          window.location.reload(false);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="new-categories">
      {loading ? (
        <h1>Still Loading...</h1>
      ) : (
        <div className="new-form">
          <form onSubmit={Formik.handleSubmit}>
            <h3>Name</h3>
            <input
              id="CategoryTitle"
              type="text"
              name="CategoryTitle"
              onChange={Formik.handleChange}
              values={Formik.values.CategoryTitle}
            />
            {Formik.errors.CategoryTitle && (
              <div className="error-form">
                <h1>{Formik.errors.CategoryTitle}</h1>
              </div>
            )}
            <h3>Description</h3>
            <textarea
              name="CategoryDescription"
              id="CategoryDescription"
              cols="30"
              rows="10"
              onChange={Formik.handleChange}
              value={Formik.values.CategoryDescription}
            ></textarea>
            {Formik.errors.CategoryDescription && (
             <div className="error-form">
                <h1>{Formik.errors.CategoryDescription}</h1>
             </div>
            )}
            <button type="submit">
              <h1>Submit</h1>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
