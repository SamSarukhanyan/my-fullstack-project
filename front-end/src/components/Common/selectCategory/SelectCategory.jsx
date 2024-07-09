// src/components/SelectCategory.js
import React from "react";
import { Link } from "react-router-dom";
import data from "../../../data/data.json";
import "./selectCategory.css"; 

function SelectCategory() {
   document.title = 'Add Property'
  return (
    <div className="select_category">
      <h1>Select a category to add real estate</h1>
      <ul>
        {Object.keys(data.categories).map((category) => (
          <li key={category}>
            <Link to={`/admin/add-property/${category}`}>{data.categories[category]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectCategory;
