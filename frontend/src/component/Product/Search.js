import React, { Fragment, useState } from "react";
import MetaData from "../layout/MataData";
import { useNavigate } from "react-router-dom"; //
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchbox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword} // Provide value prop
          onChange={(e) => setKeyword(e.target.value)} // Add onChange handler
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
