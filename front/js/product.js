// Url searchparams pour selectionner l'id de chaque canapé

let urlId = new URL(location.href).searchParams.get('id');

let itemImg = document.querySelector('.item__img');
let title = document.querySelector('#title');
let price  = document.querySelector('#price');
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
        for (data.color of data.colors){
        posColor.innerHTML += `<option value="${data.color}">${data.color}</option>`;
        }
    } else {
        console.error('Un probléme est survenu, retour du serveur: ', response.status)
    }
}
showProduct();

// Panier localStorage



        
