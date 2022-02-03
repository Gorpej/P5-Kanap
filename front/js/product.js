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

        const btnAddCart = document.querySelector('#addToCart');
        btnAddCart.addEventListener("click", () => {
           
          // data envoyer dans le localstorage */
            // data recuperer de l'utilisateur pour le localStorage
            let cartProduct = {
                nameProduct: data.name,
                idProduct: urlId,
                quantityProduct: document.querySelector('#quantity').value,
                colorProduct: posColor.addEventListener.value
            };
            // console.log(cartProduct);
            /* if (cartProduct.quantityProduct < 0 || cartProduct.colorProduct == null) {
                alert('Veuillez entrez une quantité ou une couleur')
            } else { 
            */
            function addProductStorage() {
                return localStorage.setItem("Item", JSON.stringify(cartProduct));
            }
            addProductStorage();
            /*  
             let productsInLocalStorage = JSON.parse(localStorage.getItem('Item'));
             console.log(productsInLocalStorage);
 
             productsInLocalStorage = [];
             productsInLocalStorage.push(cartProduct); 
             localStorage.setItem("Item",JSON.stringify(productsInLocalStorage));
             console.log(productsInLocalStorage);
             // } */
        });


    } else {
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}

storageCart();







