import { getProducts } from "./getProducts.js";

export function searchForProducts(products) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().startsWith(searchValue) |
        product.description.toLowerCase().startsWith(searchValue)
      ) {
        return true;
      }
    });
    getProducts(filteredProducts);
  };
}
