import showMessage from "./components/showMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./constants/api.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-conteiner");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return showMessage("warning", "invalid values", ".message-conteiner");
  }

  login(usernameValue, passwordValue);
}

async function login(username, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.user) {
      //showMessage("success", "successfully logged in", ".message-conteiner");

      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "index.html";
    }

    if (json.error) {
      showMessage("warning", "invalid login details", ".message-conteiner");
    }
  } catch (error) {
    console.log(error);
  }
}
