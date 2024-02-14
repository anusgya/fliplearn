import React, { useState } from "react";
import Button from "./Button";
import "../Styles-HomePageComponents/ConfirmModal.css";
import ReactModal from "react-modal";

export default function ConfirmModal({
  state,
  content,
  handleCancel,
  handleConfirm,
  item
}) {
  return (
    <ReactModal
      isOpen={state}
      className={"confirm-modal"}
      overlayClassName={"overlay"}
      // shouldCloseOnOverlayClick={true}
    >
      <div className="confirm-question">
        Are you sure you want to delete <br/> the {item}?
        {/* <div>{content}</div> */}
        <div>{content} You cannot undo this action.</div>
      </div>
      <div className="confirm-cancel-btns-container">
        <Button
          className={"cancel-delete-btn"}
          value={"Cancel"}
          handleClick={handleCancel}
        />
        <Button
          className={"confirm-delete-btn"}
          value={"Delete"}
          handleClick={handleConfirm}
        />
      </div>
    </ReactModal>
  );
}
