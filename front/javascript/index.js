// presentation des produits sur la page d'aceuil

const itemsSection = document.getElementById("items");
const url = "http://localhost:3000/api/products"

fetch(url)
  .then(response => response.json())
  .then(prouctsDatas => prouctsDatas.map(function(element){
   itemsSection.innerHTML += `
   

   <a href="./product.html?id=${element._id}">
   <article>
     <img src="${element.imageUrl}" alt=${element.altTxt}>
     <h3 class="productName">${element.name}</h3>
     <p class="productDescription">
     ${element.description.slice(0,50)}...
      </p>
   </article>
 </a> 


   `
}));
