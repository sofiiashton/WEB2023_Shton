// import { v4 as uuidv4 } from 'uuid'
import { additionalUsers, randomUserMock } from "./FE4U-Lab3-mock.js";

const courseList = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];
let teacherIdCounter = 0;

const formatTeachers = (data) => {
  const transformedData = randomUserMock.map((teacher) => {
    return {
      id: `teacher_${teacherIdCounter++}`,
      gender: teacher.gender.charAt(0).toUpperCase() + teacher.gender.slice(1),
      title: teacher.name.title,
      full_name: teacher.name.first + " " + teacher.name.last,
      city: teacher.location.city,
      state: teacher.location.state,
      country: teacher.location.country,
      postcode: teacher.location.postcode,
      coordinates: {
        Latitude: teacher.location.coordinates.latitude,
        Longitude: teacher.location.coordinates.longitude,
      },
      timezone: {
        offset: teacher.location.timezone.offset,
        description: teacher.location.timezone.description,
      },
      email: teacher.email,
      b_date: teacher.dob.date,
      age: teacher.dob.age,
      phone: teacher.phone,
      picture_Large: teacher.picture.large,
      picture_thumbnail: teacher.picture.thumbnail,
      favorite: false,
      course: courseList[Math.floor(Math.random() * courseList.length)],
      bg_color: "#ffffff",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus facilisis odio eget malesuada. Fusce aliquam neque eu metus tincidunt aliquet. In venenatis, augue non aliquet elementum, lectus enim condimentum urna, id varius risus ligula ac massa. Morbi mollis, lorem a commodo elementum, est elit elementum metus, lacinia euismod risus leo nec dolor. Nam aliquam pharetra nulla sed interdum. Integer sollicitudin leo turpis, et ornare quam sollicitudin sed.",
    };
  });
  return transformedData;
};

const teachers = formatTeachers(randomUserMock);

const mergeLists = (arrayA, arrayB) => {
  const mergedArray = [...arrayA, ...arrayB];
  const resultArray = mergedArray.reduce((acc, curr) => {
    if (!acc.find((obj) => obj["full_name"] === curr["full_name"])) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return resultArray;
};

const mergedTeachers = mergeLists(teachers, additionalUsers);

const validation = (teacherInfo) => {
  const { full_name, gender, note, state, city, country, age, phone, email } =
    teacherInfo;

  const regex = /^[\p{Lu}]/u;

  if (typeof full_name !== "string" || regex.test(full_name) != true) {
    throw new Error("Incorrect input of full name. Please try again.");
  }
};

const form = document.getElementById("addTeacherForm");
form.addEventListener("submit", submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const form = event.target;
  const full_name = form.fname.value;
  const course = form["specialty-list"].value;
  const country = form["country-input"].value;
  const city = form.city.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const age = parseInt(form.birthday.value);
  const gender = form.gender.value;
  const note = form.comment.value;
  const background_color = form.bgcolor.value;

  try {
    const teacherInfo = {
      full_name,
      course,
      country,
      city,
      email,
      phone,
      age,
      gender,
      note,
      background_color,
    };

    validation(teacherInfo);

    const newTeacher = {
      id: `teacher_${teacherIdCounter++}`,
      full_name,
      course,
      country,
      city,
      email,
      phone,
      age,
      gender,
      note,
      background_color,
    };

    teachers.push(newTeacher);
    displayTeachers(teachers);
    closeAddPopup();
    form.reset();
  } catch (error) {
    console.error(error.message);
  }
}

const filterTeachers = (
  teachers,
  country,
  ageRange,
  gender,
  photoOnly,
  favorite
) => {
  return teachers.filter((teacher) => {
    const hasPhoto =
      teacher.picture_Large !== undefined &&
      teacher.picture_thumbnail !== undefined;

    return (
      (country === undefined || teacher.country === country) &&
      (ageRange === undefined || checkAgeRange(teacher.age, ageRange)) &&
      (gender === undefined || teacher.gender === gender) &&
      (photoOnly === undefined || hasPhoto === true) &&
      (favorite === undefined || teacher.favorite === favorite)
    );
  });
};

const checkAgeRange = (teacherAge, ageRange) => {
  if (!ageRange) {
    return true;
  }

  const minAge = ageRange.min;
  const maxAge = ageRange.max;

  return teacherAge >= minAge && teacherAge <= maxAge;
};

const sortTeachers = (teachers, ascending = true, sortBy = "full_name") => {
  return teachers.sort((a, b) => {
    if (sortBy === "age") {
      if (ascending) {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    } else if (sortBy === "full_name") {
      if (ascending) {
        return a.full_name.localeCompare(b.full_name);
      } else {
        return b.full_name.localeCompare(a.full_name);
      }
    } else if (sortBy === "b_day") {
      if (ascending) {
        return new Date(a.b_date) - new Date(b.b_date);
      } else {
        return new Date(b.b_date) - new Date(a.b_date);
      }
    } else if (sortBy === "country") {
      if (ascending) {
        return a.country.localeCompare(b.country);
      } else {
        return b.country.localeCompare(a.country);
      }
    }
  });
};

const findTeacher = (teachers, searchParam) => {
  const lowercaseSearchParam = searchParam.toLowerCase().trim();
  return teachers.filter((teacher) => {
    return (
      teacher.full_name.toLowerCase().includes(lowercaseSearchParam) ||
      teacher.note.toLowerCase().includes(lowercaseSearchParam) ||
      teacher.age.toString().toLowerCase().includes(lowercaseSearchParam)
    );
  });
};

const calculatePercentage = (teachers, searchParam) => {
  const matchingObjects = teachers.filter((teacher) => {
    return (
      teacher.name === searchParam ||
      teacher.note === searchParam ||
      teacher.age === searchParam
    );
  });

  const totalObjects = teachers.length;
  const matchingCount = matchingObjects.length;

  const percentage = (matchingCount / totalObjects) * 100;
  return percentage.toFixed(1);
};

let searchParameter = 40;
console.log(
  "The percentage of teachers that match your search parameter (",
  searchParameter,
  ") is ",
  calculatePercentage(mergedTeachers, searchParameter),
  "%"
);

const displayTeachers = (teachers) => {
  const teachersContainer = document.getElementById("teachersContainer");

  teachersContainer.innerHTML = "";

  if (teachers.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.classList.add("no-results-message");
    noResultsMessage.textContent = "No matching teachers found.";
    teachersContainer.appendChild(noResultsMessage);
  } else {
    teachers.forEach((teacher) => {
      const teacherCard = document.createElement("div");
      teacherCard.classList.add("teacher-grid-el");

      const teacherImage = document.createElement("img");
      teacherImage.src = teacher.picture_Large;
      teacherImage.alt = teacher.full_name;
      teacherImage.classList.add("teacher-img-round");

      teacherImage.addEventListener("click", () => {
        openInfoPopup(teacher);
      });

      const teacherName = document.createElement("p");
      teacherName.classList.add("teacher-name");
      teacherName.innerHTML = `${teacher.full_name.split(" ")[0]}<br>${
        teacher.full_name.split(" ")[1]
      }`;

      const teacherSubject = document.createElement("p");
      teacherSubject.classList.add("teacher-subject");
      teacherSubject.textContent = teacher.course;

      const teacherCountry = document.createElement("p");
      teacherCountry.classList.add("teacher-country");
      teacherCountry.textContent = teacher.country;

      teacherCard.appendChild(teacherImage);
      teacherCard.appendChild(teacherName);
      teacherCard.appendChild(teacherSubject);
      teacherCard.appendChild(teacherCountry);

      teachersContainer.appendChild(teacherCard);
    });
  }
};

const openInfoPopup = (teacher) => {
  const popupContainer = document.getElementById("info-popup");
  popupContainer.classList.add("active");
  popupContainer.innerHTML = "";

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const popupHeader = document.createElement("div");
  popupHeader.classList.add("popup-header");

  const popupHeaderText = document.createElement("p");
  popupHeaderText.classList.add("popup-header-text");
  popupHeaderText.textContent = "Teacher info";

  const popupCloseButton = document.createElement("p");
  popupCloseButton.classList.add("popup-close-button");
  popupCloseButton.innerHTML = "&times;";
  popupCloseButton.addEventListener("click", () => {
    closeInfoPopup(popupContainer);
  });

  const popupMain = document.createElement("div");
  popupMain.classList.add("popup-main");

  const popupMainTop = document.createElement("div");
  popupMainTop.classList.add("popup-main-top");

  const teacherImageDiv = document.createElement("div");
  teacherImageDiv.classList.add("teacher-img-div");

  const teacherImage = document.createElement("img");
  teacherImage.classList.add("teacher-img-popup");
  teacherImage.src = teacher.picture_Large;
  teacherImage.alt = teacher.full_name;

  const teacherPopupInfo = document.createElement("div");
  teacherPopupInfo.classList.add("teacher-popup-info");

  const teacherName = document.createElement("p");
  teacherName.classList.add("popup-teacher-name");
  teacherName.textContent = teacher.full_name;

  const teacherSubject = document.createElement("p");
  teacherSubject.classList.add("popup-teacher-subject");
  teacherSubject.textContent = teacher.course;

  const teacherCountry = document.createElement("p");
  teacherCountry.classList.add("popup-teacher-font");
  teacherCountry.textContent = teacher.country;

  const teacherAgeGender = document.createElement("p");
  teacherAgeGender.classList.add("popup-teacher-font");
  teacherAgeGender.textContent = `${teacher.age}, ${teacher.gender}`;

  const teacherEmail = document.createElement("p");
  teacherEmail.classList.add("popup-teacher-font", "popup-teacher-email");
  teacherEmail.textContent = teacher.email;

  const teacherPhone = document.createElement("p");
  teacherPhone.classList.add("popup-teacher-font");
  teacherPhone.textContent = teacher.phone;

  const teacherNote = document.createElement("p");
  teacherNote.textContent = teacher.note;

  const addToFavoritesButton = document.createElement("button");
  addToFavoritesButton.textContent = "Add to Favorites";
  addToFavoritesButton.classList.add("button");
  addToFavoritesButton.addEventListener("click", () => {
    toggleFavorite(teacher.id);
  });

  popupHeader.appendChild(popupHeaderText);
  popupHeader.appendChild(popupCloseButton);

  teacherImageDiv.appendChild(teacherImage);
  teacherPopupInfo.appendChild(teacherName);
  teacherPopupInfo.appendChild(teacherSubject);
  teacherPopupInfo.appendChild(teacherCountry);
  teacherPopupInfo.appendChild(teacherAgeGender);
  teacherPopupInfo.appendChild(teacherEmail);
  teacherPopupInfo.appendChild(teacherPhone);

  popupMainTop.appendChild(teacherImageDiv);
  popupMainTop.appendChild(teacherPopupInfo);
  popupMain.appendChild(popupMainTop);
  popupMain.appendChild(teacherNote);
  popupMain.appendChild(addToFavoritesButton);
  popupContent.appendChild(popupHeader);
  popupContent.appendChild(popupMain);
  popupContainer.appendChild(popupContent);

  teachersContainer.appendChild(popupContainer);
};

const closeInfoPopup = (popupContainer) => {
  popupContainer.innerHTML = "";
  popupContainer.classList.remove("active");
};

displayTeachers(teachers);

// filter by age
const ageSelect = document.getElementById("age");
ageSelect.addEventListener("change", () => {
  const selectedAge = ageSelect.value;

  if (selectedAge === "") {
    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  } else {
    const ageRange = selectedAge.split("-");
    const minAge = parseInt(ageRange[0]);
    const maxAge = parseInt(ageRange[1]);

    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      { min: minAge, max: maxAge },
      undefined,
      undefined,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  }
});

// filter by country
const fetchCountryData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const countries = data.map((country) => country.name.common);
    populateCountryOptions(countries);
  } catch (error) {
    console.log("Error fetching country data:", error);
  }
};

const populateCountryOptions = (countries) => {
  countries.sort();
  const countryList = document.getElementById("country");

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryList.appendChild(option);
  });
};

const countrySelect = document.getElementById("country");
countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;

  if (selectedCountry === "") {
    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  } else {
    const filteredTeachers = filterTeachers(
      teachers,
      selectedCountry,
      undefined,
      undefined,
      undefined,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  }
});

fetchCountryData();

// filter by gender
const genderSelect = document.getElementById("gender");
genderSelect.addEventListener("change", () => {
  const selectedGender = genderSelect.value;

  if (selectedGender === "unselected") {
    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  } else {
    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      undefined,
      selectedGender,
      undefined
    );

    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";

    displayTeachers(filteredTeachers);
  }
});

//filter by photos
const photoCheckbox = document.getElementById("photoonly");
photoCheckbox.addEventListener("change", () => {
  const photoOnly = photoCheckbox.checked;

  if (photoOnly) {
    const filteredTeachers = filterTeachers(
      teachers,
      undefined,
      undefined,
      undefined,
      photoOnly,
      undefined
    );
    const teachersContainer = document.getElementById("teachersContainer");
    teachersContainer.innerHTML = "";
    displayTeachers(filteredTeachers);
  } else {
    displayTeachers(teachers);
  }
});

//filter by favorites
const favoriteCheckbox = document.getElementById("favoriteonly");
favoriteCheckbox.addEventListener("change", () => {
  const favoriteOnly = favoriteCheckbox.checked;

  const filteredTeachers = filterTeachers(
    teachers,
    undefined,
    undefined,
    undefined,
    undefined,
    favoriteOnly
  );
  const teachersContainer = document.getElementById("teachersContainer");
  teachersContainer.innerHTML = "";
  displayTeachers(filteredTeachers);
});

// display table
const displayTable = (teachers, currentPage = 1, rowsPerPage = 10) => {
  const tableContainer = document.getElementById("tableContainer");
  const paginationContainer = document.querySelector(".table-pagination");
  const totalRows = teachers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  tableContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < totalRows; i++) {
    const teacher = teachers[i];
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = teacher.full_name;
    row.appendChild(nameCell);

    const specialityCell = document.createElement("td");
    specialityCell.textContent = teacher.course;
    row.appendChild(specialityCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = teacher.age;
    row.appendChild(ageCell);

    const genderCell = document.createElement("td");
    genderCell.textContent = teacher.gender;
    row.appendChild(genderCell);

    const nationalityCell = document.createElement("td");
    nationalityCell.textContent = teacher.country;
    row.appendChild(nationalityCell);

    tableContainer.appendChild(row);
  }
  paginationContainer.innerHTML = "";
  for (let page = 1; page <= totalPages; page++) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = page;

    if (page === currentPage) {
      link.classList.add("active");
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      displayTable(teachers, page, rowsPerPage);
    });
    paginationContainer.appendChild(link);
  }
};
displayTable(teachers);

//arrow sorting
function toggleArrow(arrow) {
  const column = arrow.getAttribute("data-sort");
  const siblingArrow = arrow.nextElementSibling;
  const table = document.querySelector(".statistics-table");
  const rows = Array.from(table.rows).slice(1);

  if (arrow.classList.contains("down")) {
    arrow.style.display = "none";
    siblingArrow.style.display = "inline";
    arrow.classList.remove("down");
    const sortedTeachers = sortTeachers(teachers, true, column);
    displayTable(sortedTeachers);
  } else {
    arrow.style.display = "none";
    siblingArrow.style.display = "inline";
    arrow.classList.add("down");
    const sortedTeachers = sortTeachers(teachers, false, column);
    displayTable(sortedTeachers);
  }
}

const displayFavorites = (teachers) => {
  const favoritesSection = document.getElementById("displayFavorites");
  favoritesSection.innerHTML = "";

  const favoriteTeachers = filterTeachers(
    teachers,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );

  favoriteTeachers.forEach((teacher) => {
    const teacherElement = document.createElement("div");
    teacherElement.classList.add("teacher-carousel-el");

    const teacherImage = document.createElement("img");
    teacherImage.src = teacher.picture_Large;
    teacherImage.alt = teacher.full_name;
    teacherImage.classList.add("teacher-img-round");
    teacherImage.addEventListener("click", () => {
      openInfoPopup(teacher);
    });
    teacherElement.appendChild(teacherImage);

    const name = document.createElement("p");
    name.classList.add("teacher-name");
    name.innerHTML = `${teacher.full_name.split(" ")[0]}<br>${
      teacher.full_name.split(" ")[1]
    }`;
    teacherElement.appendChild(name);

    const subject = document.createElement("p");
    subject.classList.add("teacher-subject");
    subject.textContent = teacher.course;
    teacherElement.appendChild(subject);

    const country = document.createElement("p");
    country.classList.add("teacher-country");
    country.textContent = teacher.country;
    teacherElement.appendChild(country);

    favoritesSection.appendChild(teacherElement);
  });
};

displayFavorites(teachers);

const toggleFavorite = (teacherId) => {
  const teacher = teachers.find((teacher) => teacher.id === teacherId);
  if (teacher) {
    teacher.favorite = !teacher.favorite;
    displayTable(teachers);
    displayFavorites(teachers);
  }
};

//search teacher
const searchForm = document.querySelector(".search");
const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchParam = searchInput.value.trim().toLowerCase();
  const matchedTeachers = findTeacher(teachers, searchParam);
  displayTeachers(matchedTeachers);
});
