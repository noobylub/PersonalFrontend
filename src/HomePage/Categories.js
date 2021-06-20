import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import useHttpHook from "../Hooks/FetchHook";
import NewCategory from "./NewCategory";

export default function Categories() {
  let person = JSON.parse(window.sessionStorage.getItem("person"));
  const { error, loading, sendBackEnd, clearError } = useHttpHook();
  const [DetailOpen, SetDetailOpen] = useState(false);
  const [categories, setCategories] = useState();
  const history = useHistory();

  useEffect(() => {
    person = JSON.parse(window.sessionStorage.getItem("person"));
    const fetchData = async () => {
      try {
        const categ = await sendBackEnd(
          `http://localhost:3001/category/get/${person._id}`,
          { "Content-Type": "application/json" },
          "GET"
        );
        console.log(categ)
        setCategories(categ.allCategory);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="categories">
      <h1 className="display-first"> Your Categories</h1>
      <h2 className=" name">{person.name}</h2>
      <h1 className="display-first">{error}</h1>
      <hr />

      {categories && (
        <div className="category-display">
          {categories.length > 0 ? (
            <div className="category-list">
              <h3>Hover to EDIT</h3>
              <div className="list-all">
                {categories.map((cat) => (
                  <div className="entire-thing">
                    <div
                      className="individual"
                      onClick={() => history.push(`/one-category/${cat._id}`)}
                    >
                      <h1>{cat.name}</h1>

                      <hr />
                      <p>{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-itemes">
              <h1>Add Something here</h1>
            </div>
          )}
          <div className="add-something">
            <h2 className="name">New Categories</h2>
            <hr />
            <NewCategory person={person}></NewCategory>
          </div>
        </div>
      )}
    </div>
  );
}
