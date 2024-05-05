const divEle = document.querySelector(".card-container");

function getData(id) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://dummyjson.com/users/${id}`);
  req.send();
  req.addEventListener("load", function () {
    if (req.status === 404) return;
    const data = JSON.parse(this.responseText);
    console.log(data);
    displayUser(data, "beforeend");
    //next user
    const req2 = new XMLHttpRequest();
    req2.open("GET", `https://dummyjson.com/users/${id - 1}`);
    req2.send();
    req2.addEventListener("load", function () {
      if (req2.status === 404) return;
      const data = JSON.parse(this.responseText);
      console.log(data);
      displayUser(data, "afterbegin", "other");
    });

    const req3 = new XMLHttpRequest();
    req3.open("GET", `https://dummyjson.com/users/${id + 1}`);
    req3.send();
    req3.addEventListener("load", function () {
      if (req3.status === 404) return;
      const data = JSON.parse(this.responseText);
      console.log(data);
      displayUser(data, "beforeend", "other");
    });
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
