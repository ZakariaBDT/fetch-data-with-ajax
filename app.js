const loadMoreBtn = document.getElementById("loadmore");
const todoList = document.getElementById("items");

loadMoreBtn.addEventListener("click", () => {
  loadUsers();
});

let loadedUsers = 0;
const initialUsers = 5;
const usersPerClick = 3;

function loadUsers() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      let output = "";
      // Determine the range of users to load
      const startIndex = loadedUsers;
      const endIndex = loadedUsers + usersPerClick;
      for (let i = startIndex; i < endIndex && i < response.length; i++) {
        output += `<div class="flex border rounded p-5 mb-5 items-center">`;
        output += `<div class="w-10 h-10 rounded-full border flex justify-center items-center mr-3 flex-none">${response[i].id}</div>`;
        output += `<div class="font-bold flex-1">${response[i].title}</div>`;
        output += `<div class="flex-none ml-3">${
          response[i].completed
            ? "<div class='bg-green-700 text-white px-2 py-1 rounded'>Completed</div>"
            : "<div class='bg-red-700 text-white px-2 py-1 rounded'>Not Completed</div>"
        }</div>`;
        output += `</div>`;
      }
      todoList.innerHTML += output;
      loadedUsers += usersPerClick;
      // Disable the button if all users are loaded
      if (loadedUsers >= response.length) {
        loadMoreBtn.style.display = "none";
      }
    }
  };
  const apiUrl = "https://jsonplaceholder.typicode.com/todos?_limit=20";
  xhttp.open("GET", apiUrl, true);
  xhttp.send();
}

// Load initial users on page load
window.onload = function () {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      let output = "";
      const endIndex = initialUsers;
      for (let i = 0; i < endIndex && i < response.length; i++) {
        output += `<div class="flex border rounded p-5 mb-5 items-center">`;
        output += `<div class="w-10 h-10 rounded-full border flex justify-center items-center mr-3 flex-none">${response[i].id}</div>`;
        output += `<div class="font-bold flex-1">${response[i].title}</div>`;
        output += `<div class="flex-none ml-3">${
          response[i].completed
            ? "<div class='bg-green-700 text-white px-2 py-1 rounded'>Completed</div>"
            : "<div class='bg-red-700 text-white px-2 py-1 rounded'>Not Completed</div>"
        }</div>`;
        output += `</div>`;
      }

      todoList.innerHTML += output;
      loadedUsers += initialUsers;
    }
  };
  const apiUrl = "https://jsonplaceholder.typicode.com/todos?_limit=20";
  xhttp.open("GET", apiUrl, true);
  xhttp.send();
};
