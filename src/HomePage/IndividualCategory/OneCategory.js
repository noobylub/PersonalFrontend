import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttpHook from "../../Hooks/FetchHook";
import NewItem from "./NewItem";

import "./OneCategory.css";

export default function OneCategory() {
  const { id } = useParams();
  const { error, loading, sendBackEnd } = useHttpHook();
  const [category, setCategory] = useState([]);
  const [IndividualFav, setIndividualFav] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const oneCate = await sendBackEnd(
          `http://localhost:3001/category/get/one/${id}`,
          { "Content-Type": "application/json" },
          "GET"
        );

        console.log(oneCate.oneCategory);
        setCategory(oneCate.oneCategory);
        setIndividualFav(oneCate.oneCategory.individualFav);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="category-one">
      <div className="introduction-category">
        <h1>{category.name}</h1>
      </div>
      <hr />
      <h4 className="introduction-category">{category.description}</h4>
      <button
        onClick={() => {
          console.log(IndividualFav);
        }}
      >
        More info
      </button>
      <div className="list-all-items">
        {IndividualFav.map((item) => (
          <div key={item._id} className="entire-one">
            <button 
              onClick={() => {
                console.log(item);
              }}
            >
               <h1>{item.name}</h1>
            </button>
           
          </div>
        ))}
      </div>
      <div className="new-form">
        <NewItem Categoryid={id} categoryName={category.name}></NewItem>
      </div>
    </div>
  );
}
