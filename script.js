const divEle = document.querySelector(".card-container");

// -------------------using XMLHttpRequest-----------------------
// function getData(id) {
//   const req = new XMLHttpRequest();
//   req.open("GET", `https://dummyjson.com/users/${id}`);
//   req.send();
//   req.addEventListener("load", function () {
//     if (req.status === 404) return;
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     displayUser(data, "beforeend");
//     //next user
//     const req2 = new XMLHttpRequest();
//     req2.open("GET", `https://dummyjson.com/users/${id - 1}`);
//     req2.send();
//     req2.addEventListener("load", function () {
//       if (req2.status === 404) return;
//       const data = JSON.parse(this.responseText);
//       console.log(data);
//       displayUser(data, "afterbegin", "other");
//     });

//     const req3 = new XMLHttpRequest();
//     req3.open("GET", `https://dummyjson.com/users/${id + 1}`);
//     req3.send();
//     req3.addEventListener("load", function () {
//       if (req3.status === 404) return;
//       const data = JSON.parse(this.responseText);
//       console.log(data);
//       displayUser(data, "beforeend", "other");
//     });
//   });
// }

// -------------------using Fetch()-----------------------
function getData(id) {
  fetch(`https://dummyjson.com/users/${id}`)
    .then((response) => {
      afterFetch(response, "beforeEnd");
      return fetch(`https://dummyjson.com/users/${id - 1}`);
    })
    .then((response) => {
      afterFetch(response, "afterBegin", "other");
      return fetch(`https://dummyjson.com/users/${id + 1}`);
    })
    .then((response) => {
      afterFetch(response, "beforeEnd", "other");
    })
    .catch((err) => {
      console.error(err);
    });
}

function afterFetch(response, pos, className = "") {
  console.log(response);
  if (!response.ok) {
    throw new Error("Id not found");
  }
  response
    .json()
    .then((data) => {
      displayUser(data, pos, className);
    })
    .catch((err) => {
      console.error(err);
    });
}

function displayUser(data, pos, className = "") {
  const card = `<div class="user-card ${className}">
      <img src=${data.image} alt="Profile Image"/>
      <h3>${data.firstName}</h3>
      <h3>${data.lastName}</h3>
      <p class="email">${data.email}</p>
      <button class="btn">View Profile</button>
      </div>`;

  divEle.insertAdjacentHTML(pos, card);
}

getData(2);
