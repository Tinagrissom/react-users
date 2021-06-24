import React, { useState } from "react";
import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  // useState always returns an array with 2 elements
  // using array destructuring to pull the 2 elements out of the array and store them
  // the 1st element is the current state snapshot
  // the 2nd element holds a function which we can call to change the state

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      // adding the + in front of enteredAge turns it into a number
      // enteredAge is a string, anything that is entered into input is retrieved as a string
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (greater than 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const errorHandler = () => {
      setError(null);
  }

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="text"
            value={enteredAge}
            onChange={ageChangeHandler}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
