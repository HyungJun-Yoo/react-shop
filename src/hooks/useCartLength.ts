const useCartLength = () => {
  const item = JSON.parse(localStorage.getItem("CART_DATA"));
  let value = 0;
  if (!item) return value;

  const keyArray = Object.keys(item);

  for (let i = 0; i < keyArray.length; i++) {
    const key = keyArray[i];
    value += item[key].count;
  }

  return value;
};

export { useCartLength };
