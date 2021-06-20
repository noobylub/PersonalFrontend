import React from "react";
import { useFormik } from "formik";

import useHttpHook from "../../Hooks/FetchHook";

export default function NewItem(props) {
  const { Categoryid, categoryName } = props;
  const { sendBackEnd, error } = useHttpHook();
  const person = JSON.parse(window.sessionStorage.getItem("person"));
  const formik = useFormik({
    initialValues: {
      name: " ",
      description: " ",
      imageURL: " ",
    },
    async onSubmit(val) {
      const toSend = await sendBackEnd(
        `http://localhost:3001/favorite-items/new-favorite/${person._id}/${Categoryid}`,
        { "Content-Type": "application/json" },
        "POST",
        JSON.stringify({
          name: val.name,
          description: val.description,
          image: val.imageURL,
        })
      );
      console.log(toSend);
    },
  });
  return (
    <div className="form-new-category">
      <div className="first-content">
        <h2>New Favorite for {categoryName}</h2>
      </div>
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            required
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <h3>Title</h3>
        </div>
        <div className="descrip">
         
          <textarea name="description" id="desk" cols="30" rows="10" required >
            
          </textarea>
          <h3>Description for {formik.values.name}</h3>
        </div>
        <div className="image-url">
          <h3>Image for{formik.values.name}</h3>
          <input
            required
            type="text"
            name="imageURL"
            value={formik.values.imageURL}
            onChange={formik.handleChange}
          />
          <img src={formik.values.imageURL} alt="" />
        </div>

        <button type="submit">
          <h1>Submit</h1>
        </button>
      </form>
    </div>
  );
}
