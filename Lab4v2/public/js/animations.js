fetch("https://restcountries.com/v3.1/all")
.then((response) => response.json())
.then((data) => {
  const countryList = document.getElementById("country-list");
  data.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name.common;
    countryList.appendChild(option);
  });
})
.catch((error) => {
  console.log("Error fetching country data:", error);
});

const carousel = document.querySelector(".teacher-carousel");
firstImg = carousel.querySelectorAll(".teacher-img-round")[0];
arrowIcons = document.querySelectorAll(".teacher-wrapper i");

let firstImgWidth = firstImg.clientWidth + 70 * 7;

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
  });
});

function openInfoPopup() {
  const popup = document.getElementById("info-popup");
  popup.style.display = "block";
}

function closeInfoPopup() {
  const popup = document.getElementById("info-popup");
  popup.style.display = "none";
}

function openAddPopup() {
  const popup = document.getElementById("add-popup");
  popup.style.display = "block";
}

function closeAddPopup() {
  const popup = document.getElementById("add-popup");
  popup.style.display = "none";
}
