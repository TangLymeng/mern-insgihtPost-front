import React from "react";
import { useDispatch } from "react-redux";
import { resetSuccesAction } from "../../redux/slices/globalSlice/globalSlice";
import Swal from "sweetalert2";
const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
  dispatch(resetSuccesAction());
};

export default SuccessMsg;