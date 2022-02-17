let cartSelectItem = document.querySelector('#cart__items');
let selectTotalQuantity = document.querySelector('#totalQuantity');
let selectTotalPrice = document.querySelector('#totalPrice');
let cart = JSON.parse(localStorage.getItem('Cart') || []);
let mQuantity = document.getElementsByClassName('itemQuantity');

let quantityTotal = 0;
let priceTotal = 0;
let cartItem;

// let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

addInsertCart();

// récupére le detail du panier du localStorage un par un.
async function addInsertCart() {
  for (let i = 0; i < cart.length; i++) {
    quantityTotal += cart[i].quantity;
    await apiCall(i);

    modQuantity();
    deleteItem();
  }
}

// Appel de l'API avec insertion des donnees du localStorage et de l'API
async function apiCall(i) {
  let response = await fetch(`http://localhost:3000/api/products/${cart[i].id}/`);
  if (response.ok) {
    let data = await response.json();

    cartSelectItem.innerHTML +=
      `<article class="cart__item" data-id="${data._id}" data-color="${cart[i].color}">
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
                 <p>Qté : </p>
                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
               </div>
               <div class="cart__item__content__settings__delete">
                 <p class="deleteItem">Supprimer</p>
               </div>
             </div>
           </div>
       </article>`;

    // multiplication de la quantité récuperée dans le localstorage par le prix récuperé dans l'API

    let resultPrice = cart[i].quantity * data.price;
    priceTotal += resultPrice;
    selectTotalPrice.innerHTML = priceTotal;
    selectTotalQuantity.innerHTML = quantityTotal;


  } else {
    console.error('Un probléme est survenu, retour du serveur: ', response.status)
  }
}


function modQuantity() {

  for (let i = 0; i < cart.length; i++) {

    for (let input of mQuantity) {

      input.addEventListener('change', event => {
        let articleId = event.target.closest("article").dataset.id;
        let articleColor = event.target.closest("article").dataset.color;
        let modifyQuantity = parseInt(input.value);
        if (cart[i].id === articleId && cart[i].color === articleColor) {
          cart[i].quantity = modifyQuantity;
          localStorage.setItem('Cart', JSON.stringify(cart));
        }
      })
    }
  }
}


function deleteItem() {
  let deleteItems = document.querySelectorAll('.deleteItem');

  for (let deleteIt of deleteItems) {
    deleteIt.addEventListener('click', event => {
      let articleId = event.target.closest("article").dataset.id;
      let articleColor = event.target.closest("article").dataset.color;
      let newCart = cart.filter(el => el.id != articleId || el.color != articleColor);

      localStorage.setItem('Cart', JSON.stringify(newCart));
      if (cart.length === 0) {
        localStorage.removeItem('cart', cart)
      }
    })
  }
}


