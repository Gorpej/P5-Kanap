let cartSelectItem = document.querySelector('#cart__items');
let selectTotalQuantity = document.querySelector('#totalQuantity');
let selectTotalPrice = document.querySelector('#totalPrice');
let cart = JSON.parse(localStorage.getItem('Cart') || []);
let mQuantity = document.getElementsByClassName('itemQuantity');
let quantityTotal = 0;
let priceTotal = 0;

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

//fonction qui sert a modifier la quantitée dans le panier
function modQuantity() {
  for (let input of mQuantity) {
    input.addEventListener('change', event => {
      let articleId = event.target.closest("article").dataset.id;
      let articleColor = event.target.closest("article").dataset.color;
      let modifyQuantity = parseInt(input.value);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === articleId && cart[i].color === articleColor) {
          cart[i].quantity = modifyQuantity;
          localStorage.setItem('Cart', JSON.stringify(cart));
          return;
        }
      }
    })
  }
}
// fonction qui sert à supprimer un produit du panier 
function deleteItem() {
  let deleteItems = document.querySelectorAll('.deleteItem');

  for (let deleteIt of deleteItems) {
    deleteIt.addEventListener('click', event => {
      let articleId = event.target.closest("article").dataset.id;
      let articleColor = event.target.closest("article").dataset.color;

      let newCart = cart.filter(el => el.id != articleId || el.color != articleColor);
      cart = newCart;

      localStorage.setItem('Cart', JSON.stringify(cart));
      event.target.closest("article").remove();

    })
  }
}

//----------------------------------------------------------Formulaire----------------------------------------------------------------//

// fonction qui permet de verifier à l'aide du regex que l'utilisateur entre bien un prenom mail valide
function checkFirstName() {
  let nameRegExp = new RegExp("^[A-Za-z \é\è\ê\-]+$");
  if (nameRegExp.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Votre prénom est incorrect";
    return false;
  }
}

// fonction qui permet de verifier à l'aide du regex que l'utilisateur entre bien un nom valide
function checklastName() {
  let lastNameRegExp = new RegExp("^[A-Za-z \é\è\ê\-]+$");
  if (lastNameRegExp.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Votre nom est incorrect";
    return false;
  }
}

// fonction qui permet de verifier à l'aide du regex que l'utilisateur entre bien une adresse valide
function checkAddress() {
  let addressRegExp = new RegExp("^[A-Za-z0-9 \é\è\ê\-]+$");
  if (addressRegExp.test(address.value)) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide";
    return false;
  }
}

// fonction qui permet de verifier à l'aide du regex que l'utilisateur entre bien un nom de ville valide
function checkCity() {
  let cityRegExp = new RegExp("^[A-Za-z \é\è\ê\-]+$");
  if (cityRegExp.test(city.value)) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Veuillez entrer une ville valide";
    return false;
  }
}

// fonction qui permet de verifier à l'aide du regex que l'utilisateur entre bien une adresse mail valide
function checkEmail() {
  let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$", "g");
  if (emailRegExp.test(email.value)) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
    return false;
  }
}

let firstName = document.querySelector('#firstName');
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

// Ecoute ce que l'utilisateur entre dans le champ prénom
firstName.addEventListener("change", () => {
  checkFirstName(this);
});

let lastName = document.querySelector('#lastName');
let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');

// Ecoute ce que l'utilisateur entre dans le champ nom
lastName.addEventListener("change", () => {
  checklastName(this);
});

let address = document.querySelector('#address');
let addressErrorMsg = document.querySelector('#addressErrorMsg');

// Ecoute ce que l'utilisateur entre dans le champ adresse
address.addEventListener("change", () => {
  checkAddress(this);
});

let city = document.querySelector('#city');
let cityErrorMsg = document.querySelector('#cityErrorMsg');

// Ecoute ce que l'utilisateur entre dans le champ ville
city.addEventListener("change", () => {
  checkCity(this);
});

let email = document.querySelector('#email');
let emailErrorMsg = document.querySelector('#emailErrorMsg');

// Ecoute ce que l'utilisateur entre dans le champ email
email.addEventListener("change", () => {
  checkEmail(this);
});

// Verifie que tout les champs sont valide lorsque l'utilisateur clique sur le bouton commande
let order = document.querySelector('#order');
order.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkFirstName(firstName) && checklastName(lastName) && checkAddress(address) && checkCity(city) && checkEmail(email)) {
    // creer un objet contact avec les information recuperer a l'aide du formulaire
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    };
    // creer un tableau products et parcourir le locastorage pour extraire l'id.
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].id);
    }
    // Execution de la fonction api POST avec comme paramètres contact et products
    apiPost({
      contact,
      products
    });
  } else {
    // pas valide
  }

});
 // Envoi les données contact et products à l'aide de la methode POST
async function apiPost(contact, products) {
  let res = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(contact, products),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    let datas = await res.json();
    // envoie de l'oderId vers la page confirmation 
    document.location.href = ("confirmation.html?orderId=" + datas.orderId);

  } else {
    console.error('Un probléme est survenu, retour du serveur: ', res.status)
  }

}



