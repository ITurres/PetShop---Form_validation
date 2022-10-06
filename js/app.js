import { validate } from "./form-validation.js";

const inputs = document.querySelectorAll("input"); // will select all inputs

inputs.forEach((input) => {
  //will iterate throught all inputs
  input.addEventListener("blur", (input) => {
    validate(input.target);
  });
});
