import { retriveUsername } from "../utils/storage.js";

export default function makeMenu() {
  const { pathname } = document.location;

  const username = retriveUsername();

  console.log(username);

  let authLink = `<a href="login.html" class="${
    pathname === "/my-project/login.html" ? "active" : ""
  }">Login</a>`;

  if (username) {
    authLink = `<a href="add.html" class="${
      pathname === "/my-project/add.html" ? "active" : ""
    }">Add Product</a>
    
    <button class="login-button"> Logout</button>`;
  }

  const conteiner = document.querySelector(".menu-conteiner");

  conteiner.innerHTML = `<div class="menu">
                              <a href="index.html" class="${
                                pathname === "/my-project/index.html"
                                  ? "active"
                                  : ""
                              }">Home</a>

                              <a href="products.html" class="${
                                pathname === "/my-project/products.html"
                                  ? "active"
                                  : ""
                              }">Products</a>

                              ${authLink}

                              
                              
                              <a href="checkout.html" class="${
                                pathname === "/my-project/checkout.html"
                                  ? "active"
                                  : ""
                              }"><i class="fa-solid fa-cart-shopping"></i></a>
                          </div>`;
}
