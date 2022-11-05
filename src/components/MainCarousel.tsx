import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import fashion from "../assets/img_shop_fashion.jpeg";
import digital from "../assets/img_shop_digital.jpeg";
import grocery from "../assets/img_shop_grocery.jpeg";

export default function MainCarousel() {
  const texts = [
    {
      title: "물빠진 청바지!",
      desc: "이제 막 도착한 패션 청바지를 구경해 보세요.",
      src: fashion,
      alt: "fashion",
    },
    {
      title: "신속한 업무처리!",
      desc: "다양한 디지털 상품을 둘러보세요.",
      src: digital,
      alt: "digital",
    },
    {
      title: "신선한 식품!",
      desc: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
      src: grocery,
      alt: "grocery",
    },
  ];

  return (
    <Carousel
      className="carousel-container"
      showStatus={false}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={10000}
      showArrows={true}
    >
      {texts.map((text) => (
        <div className="carousel-slide" key={text.title}>
          <div className="carousel-description absolute left-auto right-auto bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10">
            <h2 className="text-2xl lg:text-4xl font-bold text-white">
              {text.title}
            </h2>
            <p className="my-2 text-white">{text.desc}</p>
            <Link className="btn btn-sm lg:btn-md mt-3" to={`/${text.alt}`}>
              바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <img src={text.src} alt={text.alt} />
        </div>
      ))}
    </Carousel>
  );
}
