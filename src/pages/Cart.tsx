import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { projectsData, cartsData } from "../store/store";
import { Link } from "react-router-dom";

import { useCartLength } from "../hooks/useCartLength";

export default function Cart() {
  const [allDatas, setAllDatas] = useRecoilState(projectsData);
  const [cartLength, setCartLength] = useRecoilState(cartsData);
  const [filterDatas, setFilterDatas] = useState([]);

  useEffect(() => {
    if (cartLength === 0 || allDatas.length <= 0) {
      setFilterDatas([]);
      return;
    }

    const getItem = JSON.parse(localStorage.getItem("CART_DATA"));
    if (getItem !== null) {
      dataUpdate(getItem);
    }
  }, [cartLength, allDatas]);

  const dataUpdate = (item: itemType) => {
    setFilterDatas([]);

    const keyArray = Object.keys(item);

    const data: cartDataType = {};

    for (let i = 0; i < keyArray.length; i++) {
      const key = keyArray[i];

      data[key] = allDatas.find((allData) => allData.id === Number(key));
      data[key] = { ...data[key], count: item[key].count };
      setFilterDatas((oldArray) => [...oldArray, data[key]]);
    }

    return data;
  };

  const handlePlus = (data: cartDataType) => {
    const getItem = JSON.parse(localStorage.getItem("CART_DATA"));

    const stringId = String(data.filterData.id);

    let cartInfo = {};

    if (getItem !== null && getItem[stringId]) {
      cartInfo = {
        ...getItem,
        [stringId]: {
          id: data.filterData.id,
          count: ++getItem[stringId].count,
        },
      };
    }

    localStorage.setItem("CART_DATA", JSON.stringify(cartInfo));
    setCartLength(useCartLength());
  };

  const handleMinus = (data: cartDataType) => {
    const getItem = JSON.parse(localStorage.getItem("CART_DATA"));

    const stringId = String(data.filterData.id);

    let cartInfo: itemType = {};

    if (getItem !== null && getItem[stringId]) {
      if (getItem[stringId].count > 1) {
        cartInfo = {
          ...getItem,
          [stringId]: {
            id: data.filterData.id,
            count: --getItem[stringId].count,
          },
        };
      } else {
        let newItems = Object.keys(getItem).map((item) => getItem[item]);

        newItems = newItems.filter((newItem) => {
          return newItem.id !== data.filterData.id;
        });

        newItems.forEach((item) => {
          cartInfo[item.id] = item;
        });
      }
    }

    localStorage.setItem("CART_DATA", JSON.stringify(cartInfo));
    setCartLength(useCartLength());
  };

  const handleModalClick = () => {
    localStorage.removeItem("CART_DATA");
    setCartLength(0);
  };

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>홈</li>
            <li>장바구니</li>
          </ul>
        </div>
        <div className="mt-6 md:mt-14 px-2 lg:px-0">
          {cartLength < 1 ? (
            <div>
              <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
              <Link to="/" className="btn btn-primary mt-10">
                담으러 가기
              </Link>
            </div>
          ) : (
            <div className="lg:flex justify-between mb-20">
              <div>
                {filterDatas.length > 0 &&
                  filterDatas.map((filterData) => (
                    <div
                      key={filterData.id}
                      className="lg:flex lg:items-center mt-4 px-2 lg:px-0"
                    >
                      <Link to={`/product/${filterData.id}`}>
                        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                          <img
                            src={filterData.image}
                            alt="상품 이미지"
                            className="object-contain w-full h-48"
                          ></img>
                        </figure>
                      </Link>
                      <div className="card-body px-1 lg:px-12">
                        <h2 className="card-title">
                          <Link
                            to={`/product/${filterData.id}`}
                            className="link link-hover"
                          >
                            {filterData.title}
                          </Link>
                        </h2>
                        <p className="mt-2 mb-4 text-3xl">
                          $
                          {Math.round(
                            (filterData.price as number) * filterData.count
                          ).toLocaleString()}
                        </p>
                        <div className="card-actions">
                          <div className="btn-group">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleMinus({ filterData })}
                            >
                              -
                            </button>
                            <button className="btn btn-ghost no-animation">
                              {filterData.count}
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() => handlePlus({ filterData })}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="self-start shrink-0 flex items-center mt-10 mb-20">
                <span className="text-xl md:text-2xl"></span>
                <label
                  htmlFor="confirm-modal"
                  className="modal-button btn btn-primary ml-5"
                >
                  구매하기
                </label>
              </div>
            </div>
          )}
        </div>
        <input type="checkbox" id="confirm-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">정말로 구매하시겠습니까?</h3>
            <p className="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
            <div className="modal-action">
              <label
                role="none"
                htmlFor="confirm-modal"
                className="btn btn-primary"
                onClick={handleModalClick}
              >
                네
              </label>
              <label htmlFor="confirm-modal" className="btn btn-outline">
                아니오
              </label>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
