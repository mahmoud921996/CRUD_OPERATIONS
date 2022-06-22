import { renderProducts } from "./rendering";

function addProduct() {
  import("./ProductsManagment.js").then(mod => {
    mod.addProduct();
  });
}

function deleteProduct(productId) {
  import("./ProductsManagment.js").then(module => {
    module.deleteProduct(productId);
  });
}

function updateProd(productId) {
  import("./ProductsManagment.js").then(module => {
    module.updateProd(productId);
  });
}

function saveProduct() {
  import("./ProductsManagment.js").then(mod => {
    mod.saveProduct();
  });
}

const addBtn = document.getElementById("addBtn");
const searchInp = document.getElementById("search");
let products;

if (JSON.parse(localStorage.getItem("products")) == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
}

function initProducts() {
  renderProducts(products, deleteProduct, updateProd);
}

initProducts();

addBtn.addEventListener("click", function () {
  if (addBtn.textContent === "add") {
    addProduct();
  } else {
    saveProduct();
  }
});

searchInp.addEventListener("keyup", e => {
  let newTxt = "";
  let dataContainer = "";
  let term = e.target.value;
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.includes(term.trim())) {
      newTxt = products[i].name.replace(
        term,
        `<span style="color:red">` + term + `</span>`
      );
      dataContainer += `<p>${newTxt}</p>`;
    }
  }
  document.getElementById("searchResults").innerHTML = dataContainer;
});
