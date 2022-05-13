export default function makeMenu() {
  const { pathname } = document.location;
  console.log(pathname);

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

                              <a href="login.html" class="${
                                pathname === "/my-project/login.html"
                                  ? "active"
                                  : ""
                              }">Login</a>
                              
                              <a href="checkout.html" class="${
                                pathname === "/my-project/checkout.html"
                                  ? "active"
                                  : ""
                              }"><i class="fa-solid fa-cart-shopping"></i></a>
                          </div>`;
}
