/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Create an array of all the students list items
let students = document.querySelectorAll("li");
//Numeber of tiems to be displayed per page
const itemsPerPage = 10;

//Create Search bar for students and append to '.page-header'
const pageHeader = document.querySelector(".page-header");
const studentSearch = document.createElement("div");
studentSearch.className = "student-search";
studentSearch.innerHTML = `
      <input class ='search-input' placeholder="Search for students...">
      <button>Search</button>`;
pageHeader.appendChild(studentSearch);

//Search functionality
const search = e => {
  //Remove the '<h3>' result not found error
  const err = document.querySelector(".error");
  if (err) {
    err.remove();
  }
  //fnd the matching name or email in students array and push to filterStudents array
  let filterStudents = [];
  students.forEach(student => {
    if (student.textContent.includes(e.target.value)) {
      filterStudents.push(student);
      student.style.display = "";
    } else {
      student.style.display = "none";
    }
  });
  //remove the previous pagination results to create new one for search results
  const pagination = document.querySelector(".pagination");
  pagination.remove();

  //if no search results found create <h3> with error message
  if (filterStudents.length <= 0) {
    const page = document.querySelector(".page");
    const h3 = document.createElement("h3");
    h3.textContent = `Sorry, no students named "${e.target.value}".`;
    h3.style.color = "red";
    h3.className = "error";
    page.appendChild(h3);
  }
  //recreate new student list and pagination button
  appendPageLinks(filterStudents);
};

const searchInput = document.querySelector(".search-input");
//Search list filter in real time
searchInput.addEventListener("keyup", e => {
  search(e);
});
//search button if keyup event does not trigger
searchInput.addEventListener("change", e => {
  search(e);
});

//Show only 10 items per page, hide the rest of the items.
const showPage = (list, page) => {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage - 1;
  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};

//pass the studets list to display search results and break list into pagination links
const appendPageLinks = list => {
  //append div with class name '.pagination'  to '.page'
  const page = document.querySelector(".page");
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  page.appendChild(pagination);
  pagination.innerHTML = `<ul class='pagination-list'></ul>`;
  //divide the length of student results by 10
  const pages = Math.ceil(list.length / 10);
  //form a list of the pagination list items
  let paginationListItems = "";
  for (let i = 1; i <= pages; i++) {
    paginationListItems += `
    <li class='pagination-list-item'>
      <a href='#'>${[i]}</a>
    <li>`;
  }
  //append pagination list items to <ul>
  const paginationList = document.querySelector(".pagination-list");
  paginationList.innerHTML = paginationListItems;

  //put all pagination <li>'s into an array
  const pageList = document.querySelectorAll(".pagination-list-item");
  if (pageList.length > 0) {
    pageList[0].firstElementChild.className = "active";
  }
  //By deafult show items with page 1
  showPage(list, 1);
  //when clicked on page remove link class '.active' from all links and apply to target item only anf pass the page number to showPage()
  paginationList.addEventListener("click", e => {
    pageList.forEach(el => el.firstElementChild.removeAttribute("class"));
    e.target.className = "active";
    showPage(list, e.target.textContent);
  });
};

appendPageLinks(students);
