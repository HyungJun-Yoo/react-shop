import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const navs = [
    { title: "패션", link: "fashion" },
    { title: "액세서리", link: "accessory" },
    { title: "디지털", link: "digital" },
  ];

  return (
    <>
      <label
        htmlFor="side-menu"
        className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
        <Link
          to="/"
          className="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap"
        >
          React Shop
        </Link>
      </h1>

      <div className="flex-none hidden md:flex md:flex-1 ml-2">
        {navs.map((nav) => (
          <Link
            to={`/${nav.link}`}
            className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
            key={nav.title}
          >
            {nav.title}
          </Link>
        ))}
      </div>
    </>
  );
}
