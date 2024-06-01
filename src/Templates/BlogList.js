import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../redux/slices/posts/postsSlice";
import LoadingComponent from "../components/Alert/Loadingcomponent";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../redux/slices/categories/categoriesSlice";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  //! redux store
  const dispatch = useDispatch();
  const { posts, error, loading, success } = useSelector(
    (state) => state?.posts
  );
  const [category, setCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  //Pagination state

  //dispatch
  useEffect(() => {
    dispatch(
      fetchPrivatePostsAction({ category, searchTerm })
    );
    dispatch(fetchCategoriesAction());
  }, [dispatch, category, searchTerm, ]);



  // Function to strip HTML tags
  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const { categories } = useSelector((state) => state?.categories);

  return (
    <div className="bg-white py-5">
      <div className="px-6 lg:px-8 ">
        <div className="mx-auto max-w-7xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>

          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20 sm:w-full">
            {posts?.posts?.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-w-16 aspect-h-9 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-square lg:w-64 lg:shrink-0">
                  <img
                    src={post?.image}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {new Date(post?.createdAt).toDateString()}
                    </time>
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post?.category?.name}
                    </a>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post?.title}
                      </a>
                    </h3>

                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {stripHtmlTags(post?.content)}
                    </p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <img
                        src={post?.author?.profilePicture}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post?.author?.username}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* Pagination buttons */}
          {/* <div className="flex justify-center items-center my-4 space-x-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
