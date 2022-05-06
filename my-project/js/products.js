import { baseUrl } from "./constants/api.js";
import { getProducts } from "./ui/getProducts.js";
import { searchForProducts } from "./ui/searchForProducts.js";

const productsUrl = baseUrl + "products";

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    console.log(products);

    getProducts(products);
    searchForProducts(products);
  } catch (error) {
    console.log(error);
  }
})();
