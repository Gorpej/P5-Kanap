let orderId = document.getElementById('orderId');

function getOrderId(){
//récuperation de l'orderId dans l'url à l'aide de searchParams
let urlOrderId = new URL(location.href).searchParams.get('orderId');
orderId.innerHTML = urlOrderId;

// vider le local storage une fois la commande validé
 localStorage.clear();
}

getOrderId();