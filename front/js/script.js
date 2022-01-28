const linkItem = document.querySelector('#items');


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

    for (item of data) {
      linkItem.innerHTML +=
        `<a href="./product.html?id=${item._id}">
            <article>
              <img src="${item.imageUrl}" alt="${item.altTxt}">
              <h3 class="productName">${item.name}</h3>
              <p class="productDescription">${item.description}</p>
            </article>
          </a>`;
      console.log(item);
    }
  }
}

showItems();