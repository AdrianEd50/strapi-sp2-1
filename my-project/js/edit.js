import { baseUrl } from "./constants/api.js";
import showMessage from "./components/showMessage.js";
import { retriveToken } from "./utils/storage.js";
import deleteBtn from "./components/allProducts/delete.js";

const querryString = document.location.search;
const params = new URLSearchParams(querryString);
const id = params.get("id");

if (!id) {
  document.location.href = "index.html";
}

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const description = document.querySelector("#description");

const idInput = document.querySelector("#id");
const message = document.querySelector(".message-conteiner");

(async function () {
  try {
    const response = await fetch(productUrl);
    const edits = await response.json();

    title.value = edits.title;
    price.value = edits.price;
    featured.value = edits.featured;
    description.value = edits.description;
    idInput.value = edits.id;

    deleteBtn(edits.id);

    console.log(edits);
  } catch (error) {
    console.log(error);
  } finally {
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const featuredValue = featured.value.trim();
  const descriptionValue = description.value.trim();

  const idValue = idInput.value;
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    featuredValue.length === 0 ||
    descriptionValue.length === 0
  ) {
    return showMessage("warning", "invalid values", ".message-conteiner");
  }

  updateTheProduct(
    titleValue,
    priceValue,
    featuredValue,
    descriptionValue,
    idValue
  );
}

async function updateTheProduct(title, price, featured, description, id) {
  const url = baseUrl + "products/" + id;
  const data = JSON.stringify({
    title: title,
    price: price,
    featured: featured,
    description: description,
  });

  const token = retriveToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      return showMessage("success", "updated product", ".message-conteiner");
    }

    if (json.error) {
      return showMessage("error", "invalid values", ".message-conteiner");
    }
  } catch (error) {
    console.log(error);
  }
}
