const tableBody = document.getElementById("table-data");

function createTableBtn(text, color, handlerFn, prodId) {
  const btnCell = document.createElement("td");
  const btn = document.createElement("button");

  btn.textContent = text;

  btn.classList.add("btn", `btn-${color}`);

  btn.addEventListener("click", handlerFn.bind(null, prodId));

  btnCell.appendChild(btn);

  return btnCell;
}

export function createElement(
  product,
  prodId,
  deleteHandlerFn,
  updateHandlerFn
) {
  const newTableEl = document.createElement("tr");
  newTableEl.innerHTML = `

    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.category}</td>
    <td>${product.desc}</td>

    `;

  const updateBtnCell = createTableBtn(
    "UPDATE",
    "warning",
    updateHandlerFn,
    prodId
  );
  const deletebtnCell = createTableBtn(
    "DELETE",
    "danger",
    deleteHandlerFn,
    prodId
  );

  newTableEl.id = prodId;
  newTableEl.appendChild(updateBtnCell);
  newTableEl.appendChild(deletebtnCell);

  return newTableEl;
}

export function renderProducts(products, deleteProductFn, updateProductFn) {
  tableBody.innerHTML = "";
  products.forEach(product => {
    const newTableEl = createElement(
      product,
      product.id,
      deleteProductFn,
      updateProductFn
    );
    tableBody.appendChild(newTableEl);
  });
}

export function updateProducts(
  product,
  prodId,
  deleteProductFn,
  updateProductFn,
  isAdding
) {
  if (isAdding) {
    const newProductEl = createElement(
      product,
      prodId,
      deleteProductFn,
      updateProductFn
    );
    tableBody.insertAdjacentElement("afterbegin", newProductEl);
  } else {
    const productEl = document.getElementById(prodId);
    productEl.remove();
  }
}
