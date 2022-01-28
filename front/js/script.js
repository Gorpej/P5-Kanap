const linkItem = document.querySelector('#items');

const showItems = async function () {
  let response = await fetch("http://localhost:3000/api/products/")
      if (response.ok) {
       let data = await response.json()
        console.log(data)
        for (product of data) {
          linkItem.innerHTML +=
            `<a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`;
        }
      } else{
        console0eror('retour du serveur ; ', response.status)
      }
    }
      
showItems();

/* 
// Requete API
async function showItems() {
  const request = await fetch("http://localhost:3000/api/products/",
    {
      method: 'GET'
    });
  if (!request.ok) {
    console.log('Un probleme est survenu');
    
  } else {
    let data = await request.json();

    for (product of data) {
      linkItem.innerHTML +=
        `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    }
  }
}

showItems(); */