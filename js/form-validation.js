export function validate(input) {
  const inputType = input.dataset.type; //with this we can reuse with different data types and names
  if (validators[inputType]) {
    validators[inputType](input);
  }
  //   console.log(input.parentElement);
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      showErrorMessage(inputType, input);
  }
}

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const errorMessages = {
  //this customized msgs wont be translated (if user use diff language), solition: use an API to translate the objects.//
  name: {
    valueMissing: "Este campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo email no puede estar vacio",
    typeMismatch: "El correo no es valido.",
  },
  password: {
    valueMissing: "Este campo password no puede estar vacio",
    patternMismatch:
      "Debe ser alfanumerico, debe ser entre 6 y 12 caracs y no puede contener caracteres especiales.",
  },
  birthDate: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes ser +18.",
  },
  telephone: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es de 10 numeros.",
  },
  address: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La direccion debe ser entre 10 y 40 caracs.",
  },
  county: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El nombre del estado debe ser entre 3 y 40 caracs.",
  },
};

const validators = {
  birthDat: (input) => checkBirth(input),
};

function showErrorMessage(inputType, input) {
  let message = "";
  errorTypes.forEach((error) => {
    if (input.validity[error]) {
      console.log(inputType, error);
      console.log(input.validity[error]);
      console.log(errorMessages[inputType][error]);
      message = errorMessages[inputType][error];
    }
  });
  return message;
}

const birthInput = document.querySelector("#birth");

birthInput.addEventListener("blur", (event) => {
  checkBirth(event.target);
}); //blur is when user click outside input

function checkBirth(input) {
  const userDate = new Date(input.value);
  let message = "";
  if (!over18(userDate)) {
    message = "Debes ser +18";
  }
  input.setCustomValidity(message);
}

function over18(userDate) {
  const currentDate = new Date(); //nueva instancia de la clase "date"
  const diffDate = new Date(
    userDate.getUTCFullYear() + 18,
    userDate.getUTCMonth(),
    userDate.getUTCDate()
  );
  //   console.log(userDate, " ----- ", currentDate);
  //   console.log(diffDate <= currentDate);
  return diffDate <= currentDate;
}

// const patterns = {
//     name: /^[a-z\d]{5,12}$/,
//     email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
//     password:,
//     dateOfBirth:,
//     telephone:,

// }
