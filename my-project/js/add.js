import showMessage from "./components/showMessage.js";
import { retriveToken } from "./utils/storage.js";
import { baseUrl } from "./constants/api.js";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const message = document.querySelector(".message-conteiner");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const featuredValue = featured.value.trim();
  const descriptionValue = description.value.trim();
  const imageValue = image.value.trim();
  console.log(priceValue);
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    featuredValue.length === 0 ||
    descriptionValue.length === 0 ||
    imageValue.length === 0
  ) {
    return showMessage("warning", "invalid values", ".message-conteiner");
  }

  addAnProduct(
    titleValue,
    priceValue,
    featuredValue,
    descriptionValue,
    imageValue
  );
}

async function addAnProduct(title, price, featured, description, image) {
  const url = baseUrl + "products";

  const data = JSON.stringify({
    title: title,
    price: price,
    featured: featured,
    description: description,
    image: image,
  });

  const token = retriveToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      showMessage("success", "Product made", ".message-conteiner");
      form.reset();
    }

    if (json.error) {
      showMessage("error", "Not valid", ".message-conteiner");
    }
    console.log(json);
  } catch (error) {
    console.log(error);
    showMessage("error", "An error occured", ".message-conteiner");
  }
}
