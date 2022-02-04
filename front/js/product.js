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

async function populateStorage() {
    let response = await fetch(`http://localhost:3000/api/products/${urlId}`);
    if (response.ok) {
        let data = await response.json();

        const btnAddCart = document.querySelector('#addToCart');
        btnAddCart.addEventListener("click", () => {


            // data recuperer de l'utilisateur pour le localStorage

            let cartProduct = {
                nameProduct: data.name,
                idProduct: urlId,
                quantityProduct: document.querySelector('#quantity').value,
                colorProduct: posColor.value
            };

            // si l'utilisateur ne rentre pas de couleur ou de quantité
            if (cartProduct.quantityProduct <= 0 || cartProduct.colorProduct == "") {

                alert('Veuillez entrez une quantité et une couleur')
            } else {

                // data envoyer dans le localstorage
                function addProductStorage() {
                    let carts = JSON.parse(localStorage.getItem('Carts')) || [];
                    carts.push(cartProduct);
                    localStorage.setItem('Carts', JSON.stringify(carts));

                    let cart;

                    for (cart of carts) {

                    }
                    let cartId = cart.idProduct;
                    let cartColor = cart.colorProduct;
                    console.log(cart)
                    console.log(cart.idProduct)
                    console.log(cart.indexOf(cartId) !== -1)

                    // Vérifie si la valeur existe dans le tableau
                    // if(colors.indexOf("Green") !== -1){
                    

                    if (cart.idProduct == cart.idProduct && cart.colorProduct == cart.colorProduct) {
                        // ajout d'un nouveau produit







                        console.log('envoi')
                    } else {
                        //     //addition des quantités
                        // localStorage.removeItem('Carts', carts.quantityProduct)

                        console.log('good')
                    }
                }

                addProductStorage();

            }

        });


    } else {
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}

populateStorage();







