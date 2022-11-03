import React from "react";
// import styles from './Header.module.scss'
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  set_active_user,
  remove_active_user,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
const navigation = [
  { name: "Admin", to: "/admin", current: true },
  { name: "Home", to: "/", current: false },
  { name: "Contact", to: "/contact", current: false },
  {
    name: "Cart",
    to: "/cart",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let activeStyle = {
    fontSize: "18px",
    color: "#E1CE7A",
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // Monito Currently Signin User
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // const uid = user.uid;
          if (user.displayName === null) {
            const u1 = user.email.substring(0, user.email.indexOf("@"));
            const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
            setUsername(uName);
          } else {
            setUsername(user.displayName);
            dispatch(() => remove_active_user());
          }
          dispatch(
            set_active_user({
              email: user.email,
              userName: user.displayName ? user.displayName : userName,
              userID: user.uid,
            })
          );

          // ...
        } else {
          setUsername("");
          // User is signed out
          // ...
        }
      },
      [dispatch, userName]
    );
  });

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <div className="flex flex-shrink-0 items-center">
                      <h1 className="text-white font-bold">RevealerShop</h1>
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        key={item.name}
                        to={item.to}
                        end
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <ShowOnLogin>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/home"
                        end
                        onClick={logoutUser}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "'
                      >
                        Logout
                      </NavLink>
                    </ShowOnLogin>
                    <ShowOnLogout>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/login"
                        end
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "'
                      >
                        Login
                      </NavLink>
                    </ShowOnLogout>
                    <ShowOnLogin>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/order-history"
                        end
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "'
                      >
                        My Orders
                      </NavLink>
                    </ShowOnLogin>
                    {/* <ShowOnLogout>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to="/register"
                        end
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "'
                      >
                        Register
                      </NavLink>
                    </ShowOnLogout> */}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <div className="flex items-center">
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    <p>0</p>
                  </div>
                </button>
                <ShowOnLogin>
                  <a
                    href="http://"
                    className="text-[#fffa5b] flex items-center justify-between gap-3 text-[10px] sm:text-[15px]"
                  >
                    <FaUserCircle size={16} />
                    Hi, {userName}
                  </a>
                </ShowOnLogin>
                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="http"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="http"
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
                          <a
                            href="http"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
