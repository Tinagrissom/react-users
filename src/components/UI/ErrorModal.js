import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {/* createPortal method takes 2 arguments, 
      1st is react node that should be rendered in JSX form,
      2nd is a pointer to the container in the DOM where element should be rendered
      */}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.tile}
          message={props.message}
          onConfirm={props.onConfirm}
        />, document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;
