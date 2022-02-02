// Url searchparams pour selectionner l'id de chaque canapé
let urlId = new URL(location.href).searchParams.get('id');
//

let itemImg = document.querySelector('.item__img');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let posColor = document.querySelector('#colors');

// Promesse API

async function showProduct() {
    let response = await fetch(`http://localhost:3000/api/products/${urlId}`);
    if (response.ok) {
        let data = await response.json();
        // console.log(data)
        itemImg.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        title.innerHTML = data.name;
        price.innerHTML = data.price;
        description.innerHTML = data.description;
        // parcourir array colors dans l api
        for (data.color of data.colors) {
            posColor.innerHTML += `<option value="${data.color}">${data.color}</option>`;

        }

    } else {
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}
showProduct();

//------------------------------------------------Panier------------------------------------------------//

async function storageCart() {
    let response = await fetch(`http://localhost:3000/api/products/${urlId}`);
    if (response.ok) {
        let data = await response.json();
        // data recuperer de l'utilisateur pour le localStorage
        let cartProduct = {
            nameProduct: data.name,
            idProduct: urlId,
            quantityProduct: document.querySelector('#quantity').value,
            colorProduct: posColor.value,
        }
        // console.log(cartProduct);

        // data envoyer dans le locastorage
        let pushProduct = [
            localStorage.setItem('id', cartProduct.idProduct),
            localStorage.setItem('name', cartProduct.nameProduct),
            localStorage.setItem('quantity', cartProduct.quantityProduct),
            localStorage.setItem('color', cartProduct.colorProduct),
        ]

        const btnAddCart = document.querySelector('#addToCart');
        localstorage.addEventListenerlistener('Click', btnAddCart);

    } else {
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}

storageCart();

/* 
async function saveCart() {
    if (quantityProduct == 0 || colorProduct == null) {
        alert('Veuillez entrez une quantité ou une couleur')
    } else {
        // bouton ajouter au panier
 */





