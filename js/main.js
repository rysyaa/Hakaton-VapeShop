let API = "http://localhost:8000/VapeCatalog";
let prodictCardContainer = document.querySelector("#product-card-container")
let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#prevBtn");
let currentPage = 1;
let pageLength =1;
let btnCardInfo = document.querySelector(".product-card__button");
let modal = document.querySelector("#modal2");
let closeBtnDetailsModal = document.querySelector("#closeBtn"); 
let detailsImage = document.querySelector("#modalLeft"); 
let detailsName = document.querySelector("#modalRight h2"); 
let detailsPrice = document.querySelector("#modalRight h3"); 
let detailsDesc = document.querySelector("#modalRight p");
let form = document.querySelector("form");
let inpName = document.getElementById("inpName");
let inpImg = document.getElementById("inpImg");
let inpSkills = document.getElementById("inpDesc");
let inpPrice = document.getElementById("inpPrice");
let btnCreate = document.getElementById("btnCreate");
let btnDelete = document.querySelector(".product-card__button2")



// !create

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   Проверка на заполненность полей
  if (
    !inpName.value.trim() ||
    !inpImg.value.trim() ||
    !inpDesc.value.trim() ||
    !inpPrice.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }

  //   Создаём новый объект и туда добавляем значения наших инпутов
  let newProfile = {
    name: inpName.value,
    image: inpImg.value,
    description: inpDesc.value,
    price: inpPrice.value,
  };
  createObj(newProfile);
});


async function createObj(objProf) {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(objProf),
  });

  vapeCatalog();

  let inputs = document.querySelectorAll("form input");
  inputs.forEach((elem) => {
    elem.value = "";
  });
}
// ! read

async function vapeCatalog (){
  let res = await fetch(`${API}?_page=${currentPage}&_limit=6`);
  let data = await res.json()
  prodictCardContainer.innerHTML = "";
  data.forEach((elem) => {
      prodictCardContainer.innerHTML += `
  <div class="product-card">
      <img
        class="product-card__image"
        src="${elem.image}"
        alt="Image 1"
      />
      <h3 class="product-card__title">${elem.name}</h3>
      <p class="product-card__description">
        <strong>Комплектация:</strong><br />
        ${elem.description}
      </p>
      <span class="product-card__price">${elem.price}</span> <br />
      <button class="product-card__button" onclick="showDetailsModal(${elem.id})">Подробнее...</button>
      <button class="product-card__button" onclick="showModalEdit(${elem.id})">Изменить</button>
      <button class="product-card__button2" onclick="deleteObj(${elem.id})"><img src="../images/delete.png" alt=""></button>
    </div>
  `
  });
  countPages();
}
vapeCatalog()

// ! delete

async function deleteObj(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  vapeCatalog();
}

// ! edit
let editmodal = document.querySelector(".editModal");
let closeBtn = document.querySelector("#closeEditModal");
let editInpName = document.querySelector("#editInpName");
let editInpImage = document.querySelector("#editInpImage");
let editInpDesc = document.querySelector("#editInpDesc");
let editInpPrice = document.querySelector("#editInpPrice");
let editForm = document.querySelector("#editForm");
let btnSave = document.querySelector("#editForm button");

async function showModalEdit(id) {
  editmodal.style.display = "flex";
  let res = await fetch(`${API}/${id}`);
  let data = await res.json();
  editInpName.value = data.name;
  editInpImage.value = data.image;
  editInpDesc.value = data.description;
  editInpPrice.value = data.price;
  btnSave.setAttribute("id", data.id);
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let editedProfile = {
    name: editInpName.value,
    image: editInpImage.value,
    description: editInpDesc.value,
    price: editInpPrice.value,
  };
  editProfileFunc(editedProfile, btnSave.id);
});

async function editProfileFunc(editedProfile, id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedProfile),
    });
    editmodal.style.display = "none";
    vapeCatalog();
  } catch (error) {
    console.error(error);
  }
}

closeBtn.addEventListener("click", () => {
  editmodal.style.display = "none";
});






async function countPages() {
    let res = await fetch(API);
    let data = await res.json();
    pageLength = Math.ceil(data.length / 3);
  }

  nextBtn.addEventListener("click", () => {
    if (currentPage >= pageLength || currentPage >= 3) return;
    currentPage++;
    vapeCatalog();
  });
  prevBtn.addEventListener("click", () => {
    if (currentPage <= 1) return;
    currentPage--;
    vapeCatalog();
  });

  async function showDetailsModal(id) {
    modal.style.display = "flex";
    let res = await fetch(`${API}/${id}`);
    let data = await res.json();
    detailsImage.src = data.image;
    detailsName.innerText = data.name;
    detailsPrice.innerText = data.price;
    detailsSkills.innerText = data.skills;
  }
  closeBtnDetailsModal.addEventListener("click", () => {
    modal.style.display = "none"
  })


  