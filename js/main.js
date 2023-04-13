let API = "http://localhost:8000/VapeCatalog";
let prodictCardContainer = document.querySelector("#product-card-container")
let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#prevBtn");
let currentPage = 1;
let pageLength =1;
let btnCardInfo = document.querySelector(".product-card__button");
let modal = document.querySelector("#modal");
let closeBtnDetailsModal = document.querySelector("#closeBtn"); 
let detailsImage = document.querySelector("#modalLeft"); 
let detailsName = document.querySelector("#modalRight h2"); 
let detailsPrice = document.querySelector("#modalRight h3"); 
let detailsDesc = document.querySelector("#modalRight p");

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
      </div>
    `
    });
    countPages();
}
vapeCatalog()
async function countPages() {
    let res = await fetch(API);
    let data = await res.json();
    pageLength = Math.ceil(data.length / 3);
  }

  nextBtn.addEventListener("click", () => {
    if (currentPage >= pageLength || currentPage >= 2) return;
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