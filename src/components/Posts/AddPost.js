import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { addPostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/Loadingcomponent";
import ErrorComponent from "../Alert/ErrorMsg";
import SuccessComponent from "../Alert/SuccessMsg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import QuillToolbar, { modules, formats } from "../Editor/QuillToolbar";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { categories } = useSelector((state) => state?.categories);
  const options = categories?.categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    };
  });
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts
  );

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    if (success) {
      navigate("/posts");
    }
  }, [dispatch, success, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
    tags: [],
  });

  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "Title is required";
    if (!data.image) errors.image = "Image is required";
    if (!data.category) errors.category = "Category is required";
    if (!data.content) errors.content = "Content is required";
    return errors;
  };

  const handleBlur = (e) => {
    if (e && e.target) {
      const { name } = e.target;
      const formErrors = validateForm(formData);
      setErrors({ ...errors, [name]: formErrors[name] });
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleTagChange = (newValue) => {
    setFormData({ ...formData, tags: newValue.map((tag) => tag.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(
        addPostAction({
          ...formData,
          tags: formData.tags,
        })
      );
      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
        tags: [],
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-4xl rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Add New Post
          </h2>
          {error && <ErrorComponent message={error?.message} />}
          {success && <SuccessComponent message="Post created successfully" />}
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
              onBlur={handleBlur}
            />
            {errors?.title && <p className="text-red-500 ">{errors.title}</p>}
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Thumbnail Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {errors?.image && <p className="text-red-500 ">{errors.image}</p>}
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
              onBlur={handleBlur}
            />
            {errors?.category && (
              <p className="text-red-500 ">{errors.category}</p>
            )}
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Tags</span>
            <CreatableSelect
              isMulti
              onChange={handleTagChange}
              value={formData.tags.map((tag) => ({ label: tag, value: tag }))}
              options={formData.tags.map((tag) => ({ label: tag, value: tag }))}
              placeholder="Enter tags"
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <QuillToolbar />
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className=" leading-5 w-full text-coolGray-400 font-normal"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={(content) => handleChange("content", content)}
              onBlur={handleBlur}
            />
            {errors?.content && (
              <p className="text-red-500 ">{errors.content}</p>
            )}
          </label>

          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
