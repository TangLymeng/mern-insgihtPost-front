import React from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ posts }) => {
  return (
    <section className="relative py-24 bg-white">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
      />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mx-auto mb-8 text-center md:max-w-5xl md:mb-16">
          <span className="inline-block px-2 py-px mb-4 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
            Your Posts
          </span>
          <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
            User Posts [{posts?.length}]
          </h3>
        </div>

        <div className="flex flex-wrap mb-12 -mx-4 md:mb-20">
          {posts?.map((post) => {
            return (
              <>
                <div className="w-full px-4 mb-8 md:w-1/2">
                  <a className="block mb-6 overflow-hidden rounded-md" href="#">
                    <img
                      className="w-full h-80 object-cover"
                      src={post?.image}
                      alt={post?.tile}
                    />
                  </a>
                  <div className="mb-4">
                    <a
                      className="inline-block px-3 py-1 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm hover:text-green-600 hover:bg-green-200"
                      href="#"
                    >
                      {post?.category?.name}
                    </a>
                  </div>
                  <p className="mb-2 font-medium text-coolGray-500">
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
                  {/* <a
                    className="inline-flex items-center text-base font-semibold text-green-500 md:text-lg hover:text-green-600"
                    href="#"
                  >
                    edit icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </a> */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserPosts;
