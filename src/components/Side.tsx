import { Link } from "react-router-dom";

export default function Side() {
  const handleClick = () => {
    const target = document.querySelector("#side-menu") as HTMLInputElement;
    if (target.checked) {
      target.checked = false;
    }
  };

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <Link
            to="/fashion"
            className="!text-gray-700 active:!text-white dark:!text-white"
            onClick={handleClick}
          >
            패션
          </Link>
        </li>
        <li>
          <Link
            to="/accessory"
            className="!text-gray-700 active:!text-white dark:!text-white"
            onClick={handleClick}
          >
            액세서리
          </Link>
        </li>
        <li>
          <Link
            to="/digital"
            className="!text-gray-700 active:!text-white dark:!text-white"
            onClick={handleClick}
          >
            디지털
          </Link>
        </li>
      </ul>
    </div>
  );
}
