import "../sass/main.scss";
import { validation } from "./validation";
import { calcFormValues, toggleForm } from "../js/form";
import { elements } from "./variables";
import { listen } from "./base";
import { callModal } from "./modal";

/* Modal Controller */

listen(".call-modal", "click", () => {
  elements.callModal.style.display = "none";
  elements.theModal.style.display = "inline-block";
  elements.modalQuestion1.style.display = "inline-block";
});

callModal();

//remove # at reload - delete later
// window.addEventListener("load", () => {
//   window.location.hash = "";
// });
