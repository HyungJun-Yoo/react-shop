/// <reference types="vite/client" />

interface ObjData {
  id: number;
  count?: number;
  category: string;
  description?: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

type itemType = {
  [key: string]: {
    id: number;
    count: number;
  };
};

type cartDataType = {
  [key: string]: {
    id: number;
    count: number;
    category: string;
    description?: string;
    image: string;
    price: number;
    rating: {
      count: number;
      rate: number;
    };
    title: string;
  };
};
