import { renderProducts, updateProducts } from "./rendering";

const prodName = document.querySelector("#prod-name");
const prodPrice = document.querySelector("#prod-price");
const prodCatg = document.querySelector("#prod-catg");
const prodDesc = document.querySelector("#prod-desc");

let addBtn = document.getElementById("addBtn");
let products;
let currentIdx;

if (JSON.parse(localStorage.getItem("products")) == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
}

export function deleteProduct(prodId) {
  const updatedProducts = [];
  let deletedProduct;
  for (const prod of products) {
    if (prod.id !== prodId) {
      updatedProducts.push(prod);
    } else {
      deletedProduct = prod;
    }
  }
  products = updatedProducts;
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  updateProducts(deletedProduct, prodId, deleteProduct, updateProd, false);
}

export function addProduct() {
  if (
    prodName.value.trim().length === 0 ||
    prodPrice.value.trim().length === 0 ||
    prodCatg.value.trim().length === 0
  ) {
    alert("please enter some valid input values ");
    return;
  }

  const newProduct = {
    id: new Date().toString(),
    name: prodName.value,
    price: prodPrice.value,
    category: prodCatg.value,
    desc: prodDesc.value,
  };
  products.unshift(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  updateProducts(newProduct, newProduct.id, deleteProduct, updateProd, true);
  clearForm();
}

export function saveProduct() {
  const updatedProduct = {
    id: new Date().toString(),
    name: prodName.value,
    price: prodPrice.value,
    category: prodCatg.value,
    desc: prodDesc.value,
  };
  products[currentIdx] = updatedProduct;
  localStorage.setItem("products", JSON.stringify(products));
  addBtn.textContent = "add";
  renderProducts(products, deleteProduct, updateProd);
  clearForm();
}

export function updateProd(prodId) {
  const prodIdx = products.findIndex(prod => prod.id === prodId);

  currentIdx = prodIdx;
  prodName.value = products[prodIdx].name;
  prodPrice.value = products[prodIdx].price;
  prodCatg.value = products[prodIdx].category;
  prodDesc.value = products[prodIdx].desc;

  addBtn.textContent = "update";
  //edit add btn text
}

function clearForm() {
  prodName.value = "";
  prodPrice.value = "";
  prodCatg.value = "";
  prodDesc.value = "";
}
