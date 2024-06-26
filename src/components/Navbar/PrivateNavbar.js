import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postsSlice";
import { FaSearch } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const { profile, userAuth } = useSelector((state) => state?.users);

  // dispatch
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const logoutHandler = () => {
    dispatch(logoutAction());
    // reload
    window.location.reload();
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      dispatch(fetchPrivatePostsAction({ category: selectedCategory, searchTerm }));
    }, 500); // Adjust the delay time as needed

    setSearchTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, selectedCategory, searchTerm]);

  const { categories } = useSelector((state) => state?.categories);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between border-b border-gray-200">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link to="/posts" className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-5 w-auto lg:hidden"
                    src="/logo.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-5 w-auto lg:block"
                    src="/logo.png"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {categories?.categories?.map((category) => (
                    <Link
                      className={classNames(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium",
                        category?._id === selectedCategory
                          ? "border-b-2 border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      )}
                      onClick={() => setSelectedCategory(category?._id)}
                      key={category?._id}
                    >
                      {category?.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {/* Search input */}
                <div className="relative flex items-center mr-10">
                  <FaSearch className="absolute left-0 pl-3 h-7 w-7 text-gray-400" />
                  <input
                    className="pl-10 border-2 border-gray-300 bg-gray-200 bg-opacity-50 h-10 rounded-full text-sm focus:outline-none"
                    type="text"
                    placeholder="Search By Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0">
                  <Link
                    to={"/add-post"}
                    className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray"
                  >
                    <TfiWrite className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add New Post
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            userAuth?.userInfo?.profilePicture ||
                            "https://res.cloudinary.com/dulfgdn5w/image/upload/v1715157387/insightPost-api/tvxzyhimiqhvtoq0fuc5"
                          }
                          alt={userAuth?.userInfo?.username}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/user-profile"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Posts
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to={"/user-profile"}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Your Profile
                </Link>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
