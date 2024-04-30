import { useDispatch } from "react-redux";
import { resetSuccesAction } from "../../redux/slices/globalSlice/globalSlice";
import Swal from "sweetalert2";

const CommentSucessMsg = ({message}) => {
  const dispatch = useDispatch();
  Swal.fire({
    position: "top-end",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    title: "Good Job",
    text: message,
  });
  dispatch(resetSuccesAction());
};

export default CommentSucessMsg;
