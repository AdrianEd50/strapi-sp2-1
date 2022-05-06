import { baseUrl } from "./constants/api.js";

const productsUrl = baseUrl + "products";
const productsConteiner = document.querySelector(
  ".featured-products-conteiner"
);

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    createHTML(products);
  } catch (error) {
    console.log(error);
  }
})();

function createHTML(products) {
  for (let i = 0; i < products.length; i++) {
    let productLink = `<a href="details.html?id=${products[i].id}" class="cta-home">View</a>`;
    console.log(products);
    if (products[i].featured === true) {
      productsConteiner.innerHTML += `<div class="featured-product">
                                       <img src="http://localhost:1337${products[i].image.url}">
                                       <h2>${products[i].title}</h2>
                                       <p>$${products[i].price}</p>
                                       <div class="home-link">${productLink}</div>
                                    </div>`;
    }
  }
}
