import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { projectsData } from "../store/store";
import Card from "./Card";

export default function ProductsList() {
  const [allDatas, setAllDatas] = useRecoilState(projectsData);
  const [fashionData, setFashionData] = useState<ObjData[]>([]);
  const [accessoryData, setAccessoryData] = useState<ObjData[]>([]);
  const [digitalData, setDigitalData] = useState<ObjData[]>([]);

  useEffect(() => {
    const fashionArray = allDatas.filter(
      (alldata: ObjData) => alldata.category === "men's clothing"
    );

    const accessoryArray = allDatas.filter(
      (alldata: ObjData) => alldata.category === "jewelery"
    );

    const digitalArray = allDatas.filter(
      (alldata: ObjData) =>
        alldata.category === "electronics" && alldata.id < 13
    );

    setFashionData(fashionArray);
    setAccessoryData(accessoryArray);
    setDigitalData(digitalArray);
  }, [allDatas]);

  return (
    <>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
          패션
        </h2>
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list"
          data-scroll="true"
        >
          {fashionData.length > 0 && <Card datas={fashionData} />}
        </div>
      </section>

      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
          액세서리
        </h2>
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list"
          data-scroll="true"
        >
          {fashionData.length > 0 && <Card datas={accessoryData} />}
        </div>
      </section>

      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
          디지털
        </h2>
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list"
          data-scroll="true"
        >
          {fashionData.length > 0 && <Card datas={digitalData} />}
        </div>
      </section>
    </>
  );
}
