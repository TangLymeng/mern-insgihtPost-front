import React, { useState } from "react";

const CommentsList = ({ comments }) => {
  return (
    
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        {/* <div className="flex-none">
          <img
            src="https://via.placeholder.com/50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div> */}
        <div className="flex-grow">
          <div>
            {comments?.length <= 0 ? (
              <h2>No Comments</h2>
            ) : (
              comments?.map((comment) => {
                console.log(comment?.author);

                return (
                  <>
                    <article className="p-6 text-base bg-white rounded-lg">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={comment?.author?.profilePicture}
                              alt="Michael Gough"
                            />
                            {comment?.author?.username}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time
                              pubdate
                              datetime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              {new Date(comment?.createdAt).toDateString()}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment?.message}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <button
                          type="button"
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                          <svg
                            className="mr-1.5 w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </article>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
