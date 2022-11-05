import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { projectsData } from "../store/store";

import { Link } from "react-router-dom";

export default function Fashion() {
  const [allDatas, setAllDatas] = useRecoilState(projectsData);
  const [fashionData, setFashionData] = useState<ObjData[]>([]);

  useEffect(() => {
    const fashionArray = allDatas.filter(
      (alldata: ObjData) =>
        alldata.category === "men's clothing" ||
        alldata.category === "women's clothing"
    );

    setFashionData(fashionArray);
  }, [allDatas]);

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>홈</li>
            <li>패션</li>
          </ul>
        </div>

        <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
            패션
          </h2>
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list"
            data-scroll="false"
          >
            {fashionData.length > 0 &&
              fashionData.map((data) => (
                <Link
                  key={data.id}
                  to={`/product/${data.id}`}
                  className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                >
                  <figure className="flex h-80 bg-white overflow-hidden">
                    <img
                      src={data.image}
                      alt="상품 이미지"
                      className="transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body bg-gray-100 dark:bg-gray-700">
                    <p className="card-title text-base">{data.title}</p>
                    <p className="text-base">{`$${Math.round(
                      data.price
                    ).toLocaleString()}`}</p>
                  </div>
                </Link>
              ))}
          </div>
        </article>
      </section>
    </section>
  );
}
