import React, { useState, useRef } from "react";
import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import classes from "./AddUser.module.css";

const AddUser = (props) => {

  const nameInputRef = useRef()
  // if you just want to read a value, refs are better
  // always is an object with a current prop and holds the value that ref is connected with
  const ageInputRef = useRef()
  // returns a value and alows us to work with the element we connect

  const [error, setError] = useState();
  // useState always returns an array with 2 elements
  // using array destructuring to pull the 2 elements out of the array and store them
  // the 1st element is the current state snapshot
  // the 2nd element holds a function which we can call to change the state

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName= nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      // adding the + in front of enteredAge turns it into a number
      // enteredAge is a string, anything that is entered into input is retrieved as a string
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (greater than 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value= '';
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
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="text"
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
