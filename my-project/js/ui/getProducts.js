import { retriveUsername } from "../utils/storage.js";

export function getProducts(productsToGet) {
  const conteiner = document.querySelector(".products-conteiner");

  conteiner.innerHTML = "";

  productsToGet.forEach(function (product) {
    const username = retriveUsername();

    let link = `<a href="details.html?id=${product.id}" class="cta-home">View</a>`;

    if (username) {
      link = `<a href="edit.html?id=${product.id}" class="cta-home">View</a>`;
    } else {
      link = `<a href="details.html?id=${product.id}" class="cta-home">View</a>`;
    }

    conteiner.innerHTML += `<div class="product">  
                                <img src="http://localhost:1337${product.image.url}" alt="${product.title}" class="product-details-image" />                                                
                                  <h4>${product.title}<h4>
                                  <p>$${product.price}<p>
                                  <div class="home-link">${link}</div>
                               </div>`;
  });
}
