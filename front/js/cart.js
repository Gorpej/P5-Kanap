const cartSelectItem = document.querySelector('#cart__items');
let cart = JSON.parse(localStorage.getItem('Cart') || []);
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');
// const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

let quantityTotal = [];
let priceTotal = [];

function addInsertCart() {
  for (let i = 0; i < cart.length; i++) {
    quantityTotal.push(cart[i].quantity)
    price.push(data.price);
    apiCall(i);
  }
 
  addQuantity(quantityTotal);
  addPrice(priceTotal);
}

addInsertCart();

async function apiCall(i) {
  let response = await fetch(`http://localhost:3000/api/products/${cart[i].id}/`);
  if (response.ok) {
    let data = await response.json()
    
   
    cartSelectItem.innerHTML +=
      `<article class="cart__item" data-id="${data.id}" data-color="${cart[i].color}">
           <div class="cart__item__img">
             <img src="${data.imageUrl}" alt="${data.altTxt}"></img>
           </div>
           <div class="cart__item__content">
             <div class="cart__item__content__description">
               <h2>${cart[i].name}</h2>
               <p>${cart[i].color}</p>
               <p>${data.price} €</p>
             </div>
             <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                 <p>Qté : ${cart[i].quantity}</p>
                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
               </div>
               <div class="cart__item__content__settings__delete">
                 <p class="deleteItem">Supprimer</p>
               </div>
             </div>
           </div>
       </article>`;




  } else {
    console.log("erreur serveur");
  }
}

// function addQuantity()

// totalPrice.innerHTML +=  "25";

function addQuantity(arr) {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let result = arr.reduce(reducer, 0);
  console.log(result)
  let showQuantity = totalQuantity.innerHTML += `${result}`;
}

function addPrice(arr) {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let result = arr.reduce(reducer, 0);
  console.log(result)
  let showPrice = totalPrice.innerHTML += `${result}`;
}
