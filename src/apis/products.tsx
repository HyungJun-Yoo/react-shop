import axios from "axios";

const products = async () => {
  const res = await axios.get(`https://fakestoreapi.com/products`);

  return res;
};

export { products };
