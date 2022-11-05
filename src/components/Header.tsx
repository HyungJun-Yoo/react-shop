import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { projectsData } from "../store/store";

import Nav from "./Nav";
import Menu from "./Menu";
import { products } from "../apis/products";

export default function Header() {
  const [data, setData] = useRecoilState(projectsData);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await products();
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
        <div className="flex w-full xl:container xl:m-auto">
          <Nav />
          <Menu />
        </div>
      </div>
    </>
  );
}
