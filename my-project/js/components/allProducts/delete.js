import { baseUrl } from "../../constants/api.js";
import { retriveToken } from "../../utils/storage.js";

export default function deleteBtn(id) {
  const conteiner = document.querySelector(".delete-conteiner");

  conteiner.innerHTML = `<button type="button" class="delete">Delete</button>`;

  const btn = document.querySelector("button.delete");

  btn.onclick = async function () {
    console.log(id);

    const confirmDelete = confirm("Are you sure you want to delete this?");
    console.log(confirmDelete);

    if (confirmDelete) {
      const url = baseUrl + "products/" + id;

      const token = retriveToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "index.html";

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
