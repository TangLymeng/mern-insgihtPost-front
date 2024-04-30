import React, { useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentsSlice";
import CommentSucessMsg from "../Alert/CommentSucessMsg";

const AddComment = ({ postId, comments }) => {
  const [formData, setFormData] = useState({
    message: "",
  });
  //dispatch
  const dispatch = useDispatch();
  // ! Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //! get comment from store
  const { success } = useSelector((state) => state?.comments);
  //reload
  useEffect(() => {
    // if (success) {
    //   window.location.reload();
    // }
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCommentAction({ ...formData, postId }));

    setFormData({
      message: "",
    });
  };

  return (
    <section className="bg-white py-8 lg:py-16 antialiased">
      {success && <CommentSucessMsg message="Comment posted successfully" />}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Discussion ({comments?.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className=" mb-4 bg-white rounded-lg rounded-t-lg">
            <label for="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-4 py-2 w-full text-sm text-gray-900 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
              placeholder="Write a comment..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
      </div>
      <CommentsList comments={comments} />
    </section>
  );
};

export default AddComment;
