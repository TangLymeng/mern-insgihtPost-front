import React, { useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentsSlice";

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
    if (success) {
      window.location.reload();
    }
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAction({ ...formData, postId }));
  };

  <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (20)
        </h2>
      </div>
      <form class="mb-6" onSubmit={handleSubmit}>
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
    </div>
  </section>;

  return (
    
    <section class="bg-white py-8 lg:py-16 antialiased">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900">
            Discussion ({comments.length})
          </h2>
        </div>
        <form class="mb-6" onSubmit={handleSubmit}>
          <div class=" mb-4 bg-white rounded-lg rounded-t-lg">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              class="px-4 py-2 w-full text-sm text-gray-900 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
              placeholder="Write a comment..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
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
