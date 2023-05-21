const themeToggle = document.querySelector(".theme-toggle");
const toggle = document.querySelector(".theme-toggle .toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  toggle.classList.toggle("dark");
  body.classList.toggle("dark");
});

const form = document.querySelector("form");
const inputFields = document.querySelectorAll(".field.value input");

const heightValue = document.querySelector(".res .height .value");
const weightValue = document.querySelector(".res .weight .value");
const bmiValue = document.querySelector(".res .bmi-value h1");
const bmiCategory = document.querySelector(".res .bmi-value h2");
const slider = document.querySelector(".bmi-stat .range .slider");

const user = document.querySelector(".res header h2 em");
const userNameField = document.querySelector("#username");

var userInfo = {
  height: null,
  weight: null,
  username: null,
};
let valid;

inputFields.forEach((field) => {
  field.addEventListener("input", (e) => {
    if (!Number(e.target.value) || e.target.value == "") {
      e.target.classList.add("invalid");
      valid = false;
    } else {
      e.target.classList.remove("invalid");
      userInfo[e.target.name] = e.target.value;
      valid = true;
    }
  });
});

userNameField.addEventListener("input", (e) => {
  userInfo = {
    ...userInfo,
    username: e.target.value,
  };
});

form.addEventListener("submit", (e) => {
  if (valid) {
    e.preventDefault();

    heightValue.textContent = userInfo.height + " m";
    weightValue.textContent = userInfo.weight + " kg";

    bmiValue.textContent = BMI(userInfo.height, userInfo.weight);
    user.textContent = userInfo.username;
    form.reset();
  }
});

function BMI(height, weight) {
  const bmiValue = weight / (height * height);

  if (bmiValue < 18.5) {
    slider.style.left = `${10}%`;
    bmiCategory.textContent = "UNDERWEIGHT";
  } else if (bmiValue > 18.5 && bmiValue < 24.9) {
    slider.style.left = `${40}%`;
    bmiCategory.textContent = "NORMAL";
  } else if (bmiValue > 24.9 && bmiValue < 30) {
    slider.style.left = `${65}%`;
    bmiCategory.textContent = "OVERWEIGHT";
  } else {
    slider.style.left = `${95}%`;
    bmiCategory.textContent = "OBESE";
  }

  return bmiValue.toFixed(2);
}
