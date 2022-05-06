const conteiner = document.querySelector(".products-details");

const querryString = document.location.search;

const params = new URLSearchParams(querryString);

const id = params.get("id");

console.log(id);

const url = "http://localhost:1337/products/" + id;

async function fetchProduct() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);
    createHTML(json);
  } catch (error) {
    console.log(error);
  }
}

fetchProduct();

function createHTML(json) {
  conteiner.innerHTML += `<div >
                         <img src="http://localhost:1337${json.image.url}" alt="${json.title}" class="product-details-image">
                          </div>
                         <div class="product-details__details">
                         <h1>${json.title}</h1>
                         <p>${json.price}</p>
                         <p>${json.description}</p>
                         <a href="checkout.html" class="cart cta-cart">Add to cart</a>
                         </div>`;
}
