import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/Loadingcomponent";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";

const PostLists = () => {
  // Redux store
  const dispatch = useDispatch();
  const { posts, error, loading, success } = useSelector(
    (state) => state?.posts
  );
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date

  // Pagination state
  const [page, setPage] = useState(1);

  // Dispatch actions
  useEffect(() => {
    console.log({ category, searchTerm, startDate, endDate, page }); // Add this line
    dispatch(
      fetchPrivatePostsAction({
        category,
        searchTerm,
        startDate,
        endDate,
        page,
      })
    );
    dispatch(fetchCategoriesAction());
  }, [dispatch, category, searchTerm, startDate, endDate, page]);

  return (
    <div className="bg-white py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="md:max-w-5xl mx-auto mb-4 md:mb-4 text-center">
            <h3 className="text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              Insight Post Articles
            </h3>
            <p className="text-2xl md:text-xl mt-5 leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              filter posts by date range
            </p>
            <div className="flex justify-center mt-4 mb-4">
              {/* Date range inputs */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 bg-gray-200 rounded-md p-2 mr-2 focus:border-green-500 focus:outline-none"
                placeholder="Start Date"
              />
              <p className="p-2 mr-2"> to </p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 bg-gray-200 rounded-md p-2 focus:border-green-500 focus:outline-none"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingComponent />
          </div>
        ) : (
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts?.posts?.map((post) => (
              <article
                key={post._id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <img
                    src={post?.image}
                    alt="post image"
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={new Date(post?.createdAt).toDateString()}
                      className="text-gray-500"
                    >
                      {new Date(post?.createdAt).toDateString()}
                    </time>
                    <a
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      href="#"
                    >
                      {post?.category?.name}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link to={`/posts/${post?._id}`}>
                        <span className="absolute inset-0" />
                        {post?.title}
                      </Link>
                    </h3>
                    <div
                      className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
                      style={{ wordWrap: "break-word" }}
                      dangerouslySetInnerHTML={{ __html: post?.content }}
                    ></div>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src={post?.author?.profilePicture}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-100"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link to={`/user-public-profile/${post?.author?._id}`}>
                          <span className="absolute inset-0" />
                          {post?.author?.username}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostLists;
