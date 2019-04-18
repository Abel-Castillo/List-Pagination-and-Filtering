/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Grade Goal: "Exceed Expectations"

//Create an array of all the students list items
let students = document.querySelectorAll("li");
//Number of items to be displayed per page
const itemsPerPage = 10;

//taarget main <div class='page'></div>
const page = document.querySelector(".page");

//Create Search bar for students and append to '.page-header'
const pageHeader = document.querySelector(".page-header");
const studentSearch = document.createElement("div");
studentSearch.className = "student-search";
studentSearch.innerHTML = `
      <input class ='search-input' placeholder="Search for students...">
      <button>Search</button>`;
pageHeader.appendChild(studentSearch);

//Search bar functionality
const searchInput = document.querySelector(".search-input");
//Search list filter in real time with 'keyup'
searchInput.addEventListener("keyup", e => {
  //Remove the '<h3>' result not found error
  const err = document.querySelector(".error");
  if (err) {
    err.remove();
  }
  //fnd the matching name in students array and push to filterStudents array
  let filterStudents = [];
  students.forEach(student => {
    //  convert students name to lower case and the input to lower case, as well as use trim() to ignore whitespace before or after the input search.
    if (
      student
        .querySelector("h3")
        .textContent.toLocaleLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    ) {
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
    const h3 = document.createElement("h3");
    page.appendChild(h3);
    h3.outerHTML = `<h3 class='error' style='color: red;'>Sorry, no students named "${
      e.target.value
    }".</h3>`;
  }
  //recreate new student list and pagination button
  appendPageLinks(filterStudents);
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
  //divide the length of student results by 10
  const pages = Math.ceil(list.length / 10);
  //Create list items for amount of pages
  let paginationListItems = "";
  for (let i = 1; i <= pages; i++) {
    paginationListItems += `
    <li class='pagination-list-item'>
      <a href='#'>${[i]}</a>
    </li>`;
  }
  //create <div> with pagination <ul>
  const pagination = document.createElement("div");
  page.appendChild(pagination);
  pagination.outerHTML = `
   <div class='pagination'>
      <ul class='pagination-list'>
         ${paginationListItems}
      </ul>
   </div>`;

  //put all pagination <a>'s into an array
  const pageList = document.querySelectorAll(".pagination-list-item a");
  if (pageList.length > 0) {
    pageList[0].className = "active";
  }
  //By deafult show items with page 1
  showPage(list, 1);
  //when clicked on page number remove link class '.active' from all links and apply to target item only anf pass the page number to showPage()
  const paginationPageLinks = document.querySelectorAll(".pagination a");
  paginationPageLinks.forEach(page => {
    page.addEventListener("click", e => {
      paginationPageLinks.forEach(el => el.removeAttribute("class"));
      e.target.className = "active";
      showPage(list, e.target.textContent);
    });
  });
};

appendPageLinks(students);
