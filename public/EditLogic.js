let totalPrice = 0;

// 1. Input Area for to add product name and price and Add button so that we could add the items to the list
document
  .getElementById("addedItemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const price = parseFloat(document.getElementById("price").value);

    const listItem = document.createElement("li");
    listItem.textContent = `${product} - $${price.toFixed(2)}`;
    listItem.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "border",
      "border-2",
      "border-zinc-900",
      "p-2",
      "px-3",
      "rounded-lg",
      "mb-2",
      "gap-2",
      "w-fit"
    );

    // 2. Ability to delete a product from the list in case of a mistake
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =
      '<img src="/assets/delete_icon.svg" alt="Delete Icon" class="w-5 h-5" />';
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (confirm(`Are you sure you want to delete ${product}`)) {
        listItem.remove();
        totalPrice -= price;
        document.getElementById(
          "totalPrice"
        ).textContent = `$${totalPrice.toFixed(2)}`;
      }
    });

    listItem.appendChild(deleteButton);

    // 3. Display all the products and the total price of all added items.
    document.getElementById("detailsList").appendChild(listItem);

    totalPrice += price;
    // Dont have decimal values
    document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(
      2
    )}`;

    // Reset the values
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
  });

// 4. Update button to save the updated list (moved outside the form submission handler)

const editArea = document.getElementById("editArea");

const updateListButton = document.getElementById("updateListButton");
updateListButton.addEventListener("click", () => {
  const listItems = document.querySelectorAll("li");

  // Iterate through the NodeList
  listItems.forEach((item) => {
    console.log(item.textContent); // Access textContent of each item
    editArea.innerHTML += `  <span class="text-gray-300">${item.textContent}</span>  `;
  });
});

const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");

editButton.addEventListener("click", () => {
  editArea.setAttribute("contenteditable", "true");
  editArea.classList.add(
    "border-blue-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500"
  );
  saveButton.classList.remove("hidden");
  editButton.classList.add("hidden");
});

saveButton.addEventListener("click", () => {
  editArea.setAttribute("contenteditable", "false");
  editArea.classList.remove(
    "border-blue-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500"
  );
  saveButton.classList.add("hidden");
  editButton.classList.remove("hidden");
});
