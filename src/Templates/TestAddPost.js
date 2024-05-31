import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, {
  modules,
  formats,
} from "../components/Editor/QuillToolbar";

export class TestAddPost extends Component {
  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto pt-4">
        <div className="lg:ml-8 lg:mr-4 ">
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Post Title
            </div>
            <div className="mt-3">
              <input
                type="text"
                name="courseTitle"
                id="courseTitle"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Post Title"
              />
            </div>
          </div>
          <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Thumbnail Image
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-center w-full mt-5">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  dark:hover:border-gray-500 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-4 lg:mr-8 ">
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Post Title
            </div>
            <div className="mt-3">
              <QuillToolbar />
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                className=" leading-5 w-full text-coolGray-400 font-normal h-96"
                placeholder="Write your post content"
                name="content"
              />
            </div>
          </div>
          {/* <label className="mb-4 flex flex-col w-full ">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <QuillToolbar />
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className=" leading-5 w-full text-coolGray-400 font-normal h-96"
              placeholder="Write your post content"
              name="content"
            />
          </label> */}
        </div>
      </div>
    );
  }
}

export default TestAddPost;
