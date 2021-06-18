import React, { useState } from "react";
import { Button, UserInput } from "../../components";
import "./style.css";

const GetUser = () => {
  const list = [
    {
      name: "testuser1",
      bookmark: true,
    },
    {
      name: "testuser2",
      bookmark: false,
    },
  ];
  const [user, setUser] = useState("");
  const [listData, setList] = useState(list);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfUsers = 2;

  const handleClick = () => {
    if (user) {
      const updateList = [...listData, { name: user, bookmark: false }];
      setList(updateList);
    }
    setUser("");
  };
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchedValue(e.target.value);
    }
  };
  const handleRating = (e) => {
    const {
      nativeEvent: {
        srcElement: {
          parentNode: { id },
        },
      },
    } = e;
    const foundIndex = listData.findIndex((ele) => ele.name === id);
    if (foundIndex !== -1) {
      if (listData[foundIndex].bookmark) {
        listData[foundIndex].bookmark = false;
      } else {
        listData[foundIndex].bookmark = true;
      }
      setList([...listData]);
    }
  };
  const handleList = (listData) => {
    let filterList = listData;
    if (searchedValue) {
      const filterResult = listData.filter(
        (item) => item.name === searchedValue
      );
      filterList = filterResult;
    }
    const sortBookmarks = filterList.sort((a) => (!a.bookmark ? 1 : -1));
    const indexOfLastTodo = currentPage * numberOfUsers;
    const indexOfFirstTodo = indexOfLastTodo - numberOfUsers;
    console.log(indexOfFirstTodo, indexOfLastTodo);
    const currentTodos = sortBookmarks.slice(indexOfFirstTodo, indexOfLastTodo);
    return currentTodos.map((item) => (
      <li id={item.name} key={item.name}>
        <span className="username">
          {`${item.name}`}
          <br />
          <span className="sub-text">is your friend</span>
        </span>
        <i
          className={item.bookmark ? "fa fa-star checked" : "fa fa-star"}
          onClick={(e) => handleRating(e)}
        ></i>
        <i class="fa fa-trash-o" onClick={(e) => handleDelete(e)}></i>
      </li>
    ));
  };
  const handleDelete = (e) => {
    const {
      nativeEvent: {
        srcElement: {
          parentNode: { id },
        },
      },
    } = e;
    const foundIndex = listData.findIndex((ele) => ele.name === id);
    console.log(foundIndex, "foundIndex");
    if (foundIndex !== -1) {
      const newData = listData.splice(foundIndex + 1, listData.length - 1);
      setList([...newData]);
    }
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listData.length / numberOfUsers); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={(e) => setCurrentPage(e.target.id)}>
        {number}
      </li>
    );
  });
  return (
    <div className="container">
      <div className="input-box">
        <UserInput
          value={user}
          handleChange={handleChange}
          placeholder={"Enter name"}
        />
        <Button handleClick={() => handleClick()} buttonLabel={"Add"} />
      </div>
      <div className="list-block">
        <div className="search-box">
          <strong>Friends List</strong>
          <UserInput
            placeholder={"Enter your friend's name..."}
            onKeyDown={(e) => handleSearch(e)}
          />
        </div>
        <ul>{handleList(listData)}</ul>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    </div>
  );
};
export default GetUser;
