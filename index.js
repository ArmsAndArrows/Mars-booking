/////BACKGROUND STARS MOUSE HOVER MOVEMENT

let backgroundContainer = document.querySelector("body");
let isMouseMoving = false;
let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener("mousemove", function (event) {
  isMouseMoving = true;

  let mouseX = event.clientX;
  let mouseY = event.clientY;

  let backgroundPositionX = -(mouseX / window.innerWidth) * 100;
  let backgroundPositionY = -(mouseY / window.innerHeight) * 100;

  backgroundContainer.style.transition = "none";
  backgroundContainer.style.backgroundPosition =
    backgroundPositionX + "% " + backgroundPositionY + "%";

  lastMouseX = mouseX;
  lastMouseY = mouseY;
});

function moveBackground() {
  let backgroundPositionX = -(lastMouseX / window.innerWidth) * 100;
  let backgroundPositionY = -(lastMouseY / window.innerHeight) * 100;

  backgroundContainer.style.transition = "background-position 0.5s ease-out";
  backgroundContainer.style.backgroundPosition =
    backgroundPositionX + "% " + backgroundPositionY + "%";
}

setInterval(function () {
  if (!isMouseMoving) {
    moveBackground();
  }
  isMouseMoving = false;
}, 1000 / 30);

/////FORM VALIDATION

const form = document.querySelector(".pop-up__form");
const dateInInput = document.querySelector("#date-in");
const dateOutInput = document.querySelector("#date-out");
const amountInput = document.querySelector("#amount");

// Function to validate the form
function validateForm(event) {
  event.preventDefault();
  clearErrorMessages();
  let isValid = true;

  // Check if date-in is empty
  if (dateInInput.value === "") {
    displayErrorMessage("Дата заезда не может быть пустой", "pop-up__error--1");
    isValid = false;
  } else {
    // Check if date-in is in the past
    const currentDate = new Date();
    const selectedDateIn = new Date(dateInInput.value);
    if (selectedDateIn < currentDate) {
      displayErrorMessage(
        "Дата заезда не может быть в прошлом",
        "pop-up__error--1"
      );
      isValid = false;
    }
  }

  // Check if date-out is empty
  if (dateOutInput.value === "") {
    displayErrorMessage("Дата выезда не может быть пустой", "pop-up__error--2");
    isValid = false;
  } else {
    // Check if date-out is in the past
    const currentDate = new Date();
    const selectedDateOut = new Date(dateOutInput.value);
    if (selectedDateOut < currentDate) {
      displayErrorMessage(
        "Дата выезда не может быть в прошлом",
        "pop-up__error--2"
      );
      isValid = false;
    }
  }

  // Check if date-in is after date-out
  const selectedDateIn = new Date(dateInInput.value);
  const selectedDateOut = new Date(dateOutInput.value);
  if (selectedDateIn > selectedDateOut) {
    displayErrorMessage(
      "Дата заезда указана после даты выезда",
      "pop-up__error--1"
    );
    displayErrorMessage(
      "Дата выезда указана перед датой заезда",
      "pop-up__error--2"
    );
    isValid = false;
  }

  // Check if amount is empty or not a number
  const amountValue = amountInput.value.trim();
  if (amountValue === "" || isNaN(amountValue)) {
    displayErrorMessage("Количество должно быть числом", "pop-up__error--3");
    isValid = false;
  }

  if (isValid) {
    form.submit();
  }
}

function displayErrorMessage(message, errorClass) {
  const errorElement = document.querySelector(`.${errorClass}`);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".pop-up__error");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  });
}

form.addEventListener("submit", validateForm);

/////OPEN POPUP
const popupWindow = document.querySelector(".pop-up");
const btnOpen = document.querySelector(".navigation__cta");
btnOpen.addEventListener("click", function () {
  popupWindow.classList.remove("nodisp");
  popupWindow.classList.remove("hidden");
  popupWindow.classList.add("active");
});

/////CLOSE POPUP

const btnClose = document.querySelector(".pop-up__close");

btnClose.addEventListener("click", function () {
  popupWindow.classList.add("hidden");
  setTimeout(() => {
    popupWindow.classList.add("nodisp");
  }, 500);
});

//////BURGER logic

const burgerMenu = document.querySelector(".navigation__btn");
const navItems = document.querySelector(".navigation__items");
const homeContainer = document.querySelector(".home__container");

burgerMenu.addEventListener("click", function () {
  if (navItems.classList.contains("active-list")) {
    burgerMenu.innerHTML = `"
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 28 28"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 7C3 6.44771 3.44772 6 4 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H4C3.44772 8 3 7.55229 3 7Z"
          fill="#ffffff"
        />
        <path
          d="M3 14C3 13.4477 3.44772 13 4 13H24C24.5523 13 25 13.4477 25 14C25 14.5523 24.5523 15 24 15H4C3.44772 15 3 14.5523 3 14Z"
          fill="#ffffff"
        />
        <path
          d="M4 20C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H24C24.5523 22 25 21.5523 25 21C25 20.4477 24.5523 20 24 20H4Z"
          fill="#ffffff"
        />
      </svg>"`;
  } else {
    burgerMenu.innerHTML = `'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <path fill="#ffffff" d="M9.9 11.1c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L20 18.6l8.7-8.7c.4-.4 1-.4 1.4 0s.4 1 0 1.4L21.4 20l8.7 8.7c.4.4.4 1 0 1.4s-1 .4-1.4 0L20 21.4l-8.7 8.7c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L18.6 20 9.9 11.3c-.4-.4-1-.4-1.4 0z"/>
  </svg>
  
  '`;
  }
  homeContainer.classList.toggle("home__container--putback");

  navItems.classList.toggle("active-list");
});

///SMOKE CAROUSEL

const carousel = document.querySelector(".carousel");
const slides = carousel.querySelectorAll(".slide");

slides.forEach((slide) => {
  const cloneSlide = slide.cloneNode(true);
  carousel.insertAfter(cloneSlide, carousel.lastChild);
});
