import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/Loadingcomponent";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";

const PostLists = () => {
  //! redux store
  const dispatch = useDispatch();
  const { posts, error, loading, success } = useSelector(
    (state) => state?.posts
  );
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date

  //Pagination state
  const [page, setPage] = useState(1);

  //dispatch
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
    <>
      <div>
        <section className="relative py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                'url("flex-ui-assets/elements/pattern-white.svg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left top",
            }}
          />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
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
            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {/* loop */}
              {loading ? (
                <div className="w-full flex justify-center">
                  <LoadingComponent />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : posts?.post?.length <= 0 ? (
                <h1>No Post found</h1>
              ) : (
                posts?.posts?.map((post) => {
                  return (
                    <div className="w-full md:w-1/2 px-4 mb-8" key={post._id}>
                      {/* Your post item JSX */}
                      <a
                        className="block mb-6 overflow-hidden rounded-md"
                        href="#"
                      >
                        <img
                          className="w-full h-80 object-cover"
                          alt="post image"
                          src={post?.image}
                        />
                      </a>
                      <div className="mb-4">
                        <a
                          className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm"
                          href="#"
                        >
                          {post?.category?.name}
                        </a>
                      </div>
                      <p className="mb-2 text-coolGray-500 font-medium">
                        {new Date(post?.createdAt).toDateString()}
                      </p>
                      <Link
                        className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline"
                        to={`/posts/${post?._id}`} // Use "to" instead of "href"
                      >
                        {post?.title}
                      </Link>
                      <div
                        className="mb-10 text-lg line-clamp-3 font-medium md:text-xl text-coolGray-500"
                        style={{ wordWrap: "break-word" }} // Add this style
                        dangerouslySetInnerHTML={{
                          __html: post?.content,
                        }}
                      ></div>
                      <Link
                        className="inline-flex items-center text-base md:text-lg text-green-500 hover:text-green-600 font-semibold"
                        to={`/posts/${post?._id}`}
                      >
                        <span className="mr-3">Read Post</span>
                        <svg
                          width={8}
                          height={10}
                          viewBox="0 0 8 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.94667 4.74665C7.91494 4.66481 7.86736 4.59005 7.80666 4.52665L4.47333 1.19331C4.41117 1.13116 4.33738 1.08185 4.25617 1.04821C4.17495 1.01457 4.08791 0.997253 4 0.997253C3.82246 0.997253 3.6522 1.06778 3.52667 1.19331C3.46451 1.25547 3.4152 1.32927 3.38156 1.41048C3.34792 1.4917 3.33061 1.57874 3.33061 1.66665C3.33061 1.84418 3.40113 2.01445 3.52667 2.13998L5.72667 4.33331H0.666667C0.489856 4.33331 0.320286 4.40355 0.195262 4.52858C0.070238 4.6536 0 4.82317 0 4.99998C0 5.17679 0.070238 5.34636 0.195262 5.47138C0.320286 5.59641 0.489856 5.66665 0.666667 5.66665H5.72667L3.52667 7.85998C3.46418 7.92196 3.41458 7.99569 3.38074 8.07693C3.34689 8.15817 3.32947 8.24531 3.32947 8.33331C3.32947 8.42132 3.34689 8.50846 3.38074 8.5897C3.41458 8.67094 3.46418 8.74467 3.52667 8.80665C3.58864 8.86913 3.66238 8.91873 3.74361 8.95257C3.82485 8.98642 3.91199 9.00385 4 9.00385C4.08801 9.00385 4.17514 8.98642 4.25638 8.95257C4.33762 8.91873 4.41136 8.86913 4.47333 8.80665L7.80666 5.47331C7.86736 5.40991 7.91494 5.33515 7.94667 5.25331C8.01334 5.09101 8.01334 4.90895 7.94667 4.74665Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
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
    </>
  );
};

export default PostLists;
