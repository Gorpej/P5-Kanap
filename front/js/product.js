// Url searchparams pour selectionner l'id de chaque canapé
let urlId = new URL(location.href).searchParams.get('id');

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

async function populateStorage() {
    let response = await fetch(`http://localhost:3000/api/products/${urlId}`);
    if (response.ok) {
        let data = await response.json();

        const btnAddCart = document.querySelector('#addToCart');
        btnAddCart.addEventListener("click", () => {


            // data recuperer de l'utilisateur pour le localStorage

            let cartProduct = {
                name: data.name,
                id: urlId,
                quantity: parseInt(document.querySelector('#quantity').value),
                color: posColor.value
            };


            // si l'utilisateur ne rentre pas de couleur ou de quantité
            if (cartProduct.quantity <= 0 || cartProduct.color == "") {

                alert('Veuillez entrez une quantité et une couleur')
            } else {

                addProductStorage(cartProduct);
            }
        });


    } else {
        // en cas d'erreur liée à un probleme avec le serveur
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}

populateStorage();


    // Envoyer les données recuperer dans le tableau Panier dans le localstorage avec conditions, si le produit est déja dans le panier changer la quantité
    function addProductStorage(cartProduct) {

         // creation d'un tableau panier pour y stocker les produits
         let cart = JSON.parse(localStorage.getItem('Cart')) || [];
         console.log(cart);

        for (let i = 0; i < cart.length; i++) {

            if (cartProduct.id === cart[i].id && cartProduct.color === cart[i].color) {

                console.log("le produit existe deja ");
                cart[i].quantity += cartProduct.quantity;
                // console.log(cart);
                localStorage.setItem('Cart', JSON.stringify(cart));
                return;
            }
        }


        console.log("le produit n'existe PAS, j'ajoute dans le locale storage");
        cart.push(cartProduct);
        localStorage.setItem('Cart', JSON.stringify(cart));



    }




