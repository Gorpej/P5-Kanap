let cartSelectItem = document.querySelector('#cart__items');
let totalQuantity = document.querySelector('#totalQuantity');
let totalPrice = document.querySelector('#totalPrice');
let cart = JSON.parse(localStorage.getItem('Cart') || []);
let quantityTotal = [];
let priceTotal = [];
// let modifQuantity = document.getElementsByClassName('.itemQuantity');
// let deleteItem = document.getElementsByClassName('deleteItem');
// let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

addInsertCart();
addQuantity(quantityTotal);
addPrice(priceTotal);

console.log(quantityTotal);
console.log(priceTotal);

// récupére le detail du panier du localStorage un par un.
function addInsertCart() {
  for (let i = 0; i < cart.length; i++) {
    quantityTotal.push(cart[i].quantity)
    apiCall(i); 
    
  }
}

// Appel de l'API avec insertion des donnees du localStorage et de l'API
async function apiCall(i) {
  let response = await fetch(`http://localhost:3000/api/products/${cart[i].id}/`);
  if (response.ok) {
    let data = await response.json();

    // multiplication de la quantité récuperée dans le localstorage par le prix récuperé dans l'API

    let resultPrice = cart[i].quantity * data.price;
    priceTotal.push(resultPrice);

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
    console.error('Un probléme est survenu, retour du serveur: ', response.status)
  }
}

function addQuantity(array) {
  const initialValue = 0;
  const sumWithInitial = array.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
  console.log(sumWithInitial)
  totalQuantity.innerHTML += `${sumWithInitial}`;
}

function addPrice(array) {
  const initialValue = 0;
  const sumWithInitial = array.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
  console.log(sumWithInitial);
  totalPrice.innerHTML += `${sumWithInitial}`;
}


// function modQuantity() {
//   if (modifQuantity.value >= 1 || modifQuantity.value < 100) {
// localStorage.setItem('Cart', JSON.stringify(cart));
//   }
// }

// let test = modifQuantity.closest('value');
// console.log(test);
// console.log(modifQuantity);

// modQuantity();