/* In package.json: you import information, packages, dependencies related to the project*/
/* package.json is required to use 'import' */

import {products} from "./products.js";

const productContainer = document.querySelector(".product-container");
const btnContainer = document.querySelector(".btn-container");

// function to get products
// named function + arrow function together
const displayproducts = (productlist) => {
  let displayProduct = productlist.map(
    (product) =>
      `
    <div class="product-item">
        <img class="photo" src="${product.thumbnail}" alt="${product.title}">
        <div class="item-info">
            <header>
                <h4>${product.title}</h4>
            </header>
            <p class="item-text">${product.description}</p>
            <h4 class="price">$${product.price}</h4>
        </div>
    </div>
    `
  );

  // it changes the product container's innerHTML by adding each product's html that we provided above
  productContainer.innerHTML = displayProduct.join("");
};

/* function to display category button-names and buttons*/
const displayCategoryButtons = () => {
    // get unique categories
    const categories = products.reduce(
        (acc, product) => {
            if(!acc.includes(product.category)){
                acc.push(product.category)
            }
            return acc;
        }, ['All']
    )

    // using SET
    // const categories = new Set(products.map((product) => product.category));

    // use UNIQUE categories to generate buttons
        // we use data because we are providing data to this button
    const categoryButtons = categories.map(
        (category) => `<button class="filter-btn" data-id = ${category}>${category.toUpperCase()}</button>`
    ).join('')

    btnContainer.innerHTML = categoryButtons

    // filtering logic for buttons
    const filterBtns = document.querySelectorAll(".filter-btn")
    // add event listener for each button
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            // get data id from filter button which is category
            const category = e.currentTarget.dataset.id;
            // filter by category
            const productCategory = products.filter((product) => product.category === category)
            // if all show all products otherwise show filtered products
            if(category ==="All"){
                displayproducts(products)
            }else {
                displayproducts(productCategory)
            }
        })
    })



} 

// display all items when page loads

// window is biggest object in the document and this DOMContentLoaded event is 
// just triggered when the page loads. After page loads it will run functions inside of it.

window.addEventListener('DOMContentLoaded', () => {
    displayproducts(products);
    displayCategoryButtons();
});









