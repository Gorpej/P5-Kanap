// let linkItem = document.querySelector('#items');


// Requete API
async function showItems(){
 const request = await fetch("http://localhost:3000/api/products/", 
  {
    method: 'GET'
  });
  if (!request.ok) {
    alert('un probleme est survenu');
  } else {
    let data = await request.json();
    console.log(data);
    
    for (const item of data){
      document.querySelector('#items').innerHTML =
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

// Requéte API

/* let items;

const fetchItems = async () => {
  items = await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json());
};

const showItems = async () => {
  await fetchItems();
  linkItem.innerHTML = (items
      .map(item => (
        `<a href="./product.html?id=${item._id}">
          <article>
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            <h3 class="productName">${item.name}</h3>
            <p class="productDescription">${item.description}</p>
          </article>
        </a>`
      )).join('')
  );
};

showItems(); */


