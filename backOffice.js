// const { func } = require("prop-types");

const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODE0OTY3NDUsImV4cCI6MTY4MjcwNjM0NX0.2GntzF_dTHvDwvFGbPJMbX9PbX19sNEZyX8e_4YFXxw`;

const form = document.getElementById('user-form');
const submitProduct = document.getElementById('submit-btn');


// -------insert form inputs inside variables-------------
const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imgUrlInput = document.getElementById('img-url');
const priceInput = document.getElementById('price');


// -------------POST data =>new item form------------
form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const product = {
        name: nameInput.value,
        description: descInput.value,
        brand: brandInput.value,
        imageUrl: imgUrlInput.value,
        price: priceInput.value
    }
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(product),
            headers:{
                "Authorization": apiKey,
                "Content-type": `application/json; charset=UTF-8`
            }
        });
        window.location.href = 'backOffice.html?status=additem-ok';
    }
    catch (error) {
        console.log(error);
    }

});


// --------------GET data---------------

async function getData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": apiKey
            }
            })
            
        const data = await response.json();
        
        console.log(data); 
        
        return data;    

    } catch (error) {
        console.log(error)      
    }
}
getData()

async function dataIntoTable() {
    let productsData = await getData();

    let tableBody = document.getElementById('table-products');
    tableBody.innerHTML = '';

    productsData.map(product => {
        let {_id, name, description, brand, imageUrl, price, updatedAt} = product;

        // console.log(typeof _id)
        const row = `
        <tr>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${brand}</td>
            <td>€ ${price}</td>
            <td>${updatedAt}</td>
           
            <td>
            <button class="btn btn-primary" onclick="editProduct('${_id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteProduct('${name}','${_id}')">Delete</button>
            </td>
        </tr>       
        `
        tableBody.innerHTML += row;
    });
}
dataIntoTable();

// --------------MODIFY data---------------
function editProduct(productId) {
    window.location.href = `editProduct.html?id=${productId}`
}
// GO TO NEW PRODUCT HTML

// --------------DELETE data---------------
async function deleteProduct(productName, productId) {
    // console.log(typeof productName)
    if (confirm(`Delete ${productName}?`)) {
      try {
        await fetch(apiUrl + productId, { 
            method: 'DELETE',
            headers: {
                "Authorization": apiKey,
            }
        } );
            window.location.href = 'backOffice.html?status=delete-ok'

      } catch (error) {
        console.log('Error: ', error);
      }
    }
    
  }



  