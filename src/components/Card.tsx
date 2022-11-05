import { Link } from "react-router-dom";

export default function Card({ datas }: { datas: ObjData[] }) {
  return (
    <>
      {datas.map((data) => (
        <Link
          to={`/product/${data.id}`}
          key={data.id}
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
    </>
  );
}
