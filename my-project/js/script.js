import { baseUrl } from "./constants/api.js";
import makeMenu from "./common/makeMenu.js";
import { retriveUsername } from "./utils/storage.js";

//import { retriveCartFav } from "./utils/favouriteCartFunction.js";

const productsUrl = baseUrl + "products";
const productsConteiner = document.querySelector(
  ".featured-products-conteiner"
);

makeMenu();
function logoutFunc() {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.href = "index.html";
  }
}
const logOutBtn = document.querySelector(".login-button");
if (logOutBtn) logOutBtn.addEventListener("click", logoutFunc);

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
    const username = retriveUsername();

    let link = `<a href="details.html?id=${products[i].id}" class="cta-home">View</a>`;

    if (username) {
      link = `<a href="edit.html?id=${products[i].id}" class="cta-home">View</a>`;
    } else {
      link = `<a href="details.html?id=${products[i].id}" class="cta-home">View</a>`;
    }
    console.log(products);
    if (products[i].featured === true) {
      productsConteiner.innerHTML += `<div class="featured-product">
                                       <img src="http://localhost:1337${products[i].image.url}">
                                       <h2>${products[i].title}</h2>
                                       <p>$${products[i].price}</p>
                                       <a class="home-link">${link}</a>
                                    </div>`;
    }
  }
}
