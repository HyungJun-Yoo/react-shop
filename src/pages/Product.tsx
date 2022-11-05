import { useEffect, useState } from "react";
import { useParams, Link, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectsData, cartsData } from "../store/store";

import { useCartLength } from "../hooks/useCartLength";

const starCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Product() {
  const [allDatas, setAllDatas] = useRecoilState(projectsData);
  const [cartLength, setCartLength] = useRecoilState(cartsData);
  const [state, setState] = useState<ObjData>();
  const [category, setCategory] = useState("");
  const [starRating, setStarRating] = useState(0);
  const params = useParams();
  const match = useMatch(`/:product/${params.productId}`);

  useEffect(() => {
    const result = allDatas.find(
      (alldata: ObjData) => alldata.id === Number(params.productId)
    );

    setState(result);
  }, [allDatas, match]);

  useEffect(() => {
    if (!state) return;

    if (
      state.category === "men's clothing" ||
      state.category === "women's clothing"
    ) {
      setCategory("패션");
    } else if (state.category === "jewelery") {
      setCategory("액세서리");
    } else if (state.category === "electronics") {
      setCategory("디지털");
    }

    if (state.rating.rate) {
      setStarRating(Math.floor(state.rating.rate * 10) / 10);
    }
  }, [state]);

  useEffect(() => {
    const stars = document.querySelectorAll(
      ".bg-yellow-400"
    ) as NodeListOf<HTMLInputElement>;
    stars.forEach((star, idx) => {
      if ((idx + 1) / 2 <= starRating) {
        star.checked = true;
      }
    });
  }, [starRating]);

  const handleClick = (info: ObjData) => {
    const getItem = JSON.parse(localStorage.getItem("CART_DATA"));

    const stringId = String(info.id);

    let cartInfo: itemType = {};

    if (getItem !== null && getItem[stringId]) {
      cartInfo = {
        ...getItem,
        [stringId]: {
          id: info.id,
          count: ++getItem[stringId].count,
        },
      };
    } else {
      cartInfo = {
        ...getItem,
        [stringId]: {
          id: info.id,
          count: 1,
        },
      };
    }

    localStorage.setItem("CART_DATA", JSON.stringify(cartInfo));
    setCartLength(useCartLength());
  };

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>{category}</li>
              <li>{state?.title}</li>
            </ul>
          </div>
          <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
            <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
              <img
                src={state?.image}
                alt={state?.title}
                className="object-contain w-full h-72"
              ></img>
            </figure>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                {state?.title}
                <span className="badge badge-accent ml-2">NEW</span>
              </h2>
              <p>{state?.description}</p>

              <div className="flex items-center mt-3">
                <div className="rating rating-half">
                  {starCount.map((star) =>
                    star % 2 === 0 ? (
                      <input
                        key={star}
                        type="radio"
                        name="rating-10"
                        className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                        disabled
                      />
                    ) : (
                      <input
                        key={star}
                        type="radio"
                        name="rating-10"
                        className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                        disabled
                      />
                    )
                  )}
                </div>
                <div className="ml-2">
                  {starRating} / {state?.rating.count} 참여
                </div>
              </div>
              <p className="mt-2 mb-4 text-3xl">
                ${Math.round(state?.price as number).toLocaleString()}
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleClick(state)}
                >
                  장바구니에 담기
                </button>
                <Link to="/cart" className="btn btn-outline ml-1">
                  장바구니로 이동
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
