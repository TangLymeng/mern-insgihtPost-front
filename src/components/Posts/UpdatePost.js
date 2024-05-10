import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { getPostAction, updatePostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/Loadingcomponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";

const UpdatePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { categories } = useSelector((state) => state.categories);
  const { post, error, loading, success } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    dispatch(getPostAction(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post?.post?.title,
        image: null,
        category: post?.post?.category?._id,
        content: post?.post?.content,
      });
    }
  }, [post]);

  const options = categories?.categories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePostAction({ ...formData, postId })).then(() => {
      // Navigate to post detail page after update is successful
      navigate(`/posts/${postId}`);
    });
  };

    // Customize the toolbar options
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ "code-block": true }],
        ["clean"],
      ],
    };
    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "image",
      "code-block",
    ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-4xl rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Update Post
          </h2>
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post Updated successfully" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Category</span>
            <Select
              options={options}
              name="category"
              value={
                formData.category && options
                  ? options.find((option) => option.value === formData.category)
                  : null
              }
              onChange={handleSelectChange}
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <ReactQuill
              theme="snow"
              modules={modules}
              className=" leading-5 w-full text-coolGray-400 font-normal"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={(content) => handleChange("content", content)}
            />
          </label>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
