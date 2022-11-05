import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { projectsData } from "../store/store";

import { Link } from "react-router-dom";

export default function Search() {
  const [allDatas, setAllDatas] = useRecoilState(projectsData);
  const [filterDatas, setFilterDatas] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilterDatas([]);
      return;
    }

    const filterArray = allDatas.filter(
      (data) => data.title.toLowerCase().indexOf(searchValue) >= 0
    );

    if (filterArray) {
      setFilterDatas(filterArray);
    } else {
      setFilterDatas([]);
    }
  }, [searchValue]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClick = () => {
    setSearchValue("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="검색"
        className="fixed left-0 top-4 -z-10 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput"
        value={searchValue}
        onChange={handleChange}
      />

      <ul className="!fixed left-0 sm:!absolute sm:top-14 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600">
        {filterDatas.length > 0 &&
          filterDatas.map((filter) => (
            <li key={filter.id}>
              <Link
                to={`product/${filter.id}`}
                className="text-left js-searchedItem"
                onClick={handleClick}
              >
                <span className="text-gray-600 dark:text-white line-clamp-2">
                  {filter.title}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
