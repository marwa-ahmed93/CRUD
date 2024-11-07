
var userNameAlert = document.getElementById("userNameAlert") ;
var ProductInput = document.getElementById("ProductInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
// var mainButton = document.getElementById("mainButn") ;
var toggleButton = document.getElementById("toggleButton");


var productContainer;
currentIndex = -1;

if(localStorage.getItem("myProduct") == null){
    var productContainer=  [];
}
else{
    productContainer =  JSON.parse(localStorage.getItem("myProduct")) ;
    displayProduct()
}
function addProduct() {

    if(validateProductName() == true){

        var product = {
            name: ProductInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value,
        }
        if (currentIndex != -1) {
            productContainer[currentIndex] = product;
            currentIndex = -1;
          }
      
    else{
        productContainer.push(product);
    
    }
        localStorage.setItem("myProduct",JSON.stringify(productContainer) );
        clearForm()
        displayProduct()
    }
  
   
}


function clearForm() {
    ProductInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";

}

function displayProduct() {
    var cartoona = "";
    var index = 0
    for (i = 0; i < productContainer.length; i++) { 
       
            cartoona += `
            <tr>
           <td>${i}</td>
           <td>${productContainer[i].name}</td>
           <td>${productContainer[i].price}</td>
           <td>${productContainer[i].category}</td>
           <td>${productContainer[i].description}</td>
       
           <td> <button onclick="changeFormForUpdate(${i})"  class="btn btn-outline-warning ">Update</button></td>
           <td> <button onclick="deleteProduct(${i});"class="btn btn-outline-danger ">Delete</button></td>
       </tr>
           `
        
   
 
    }
document.getElementById("tableBody").innerHTML = cartoona
}

function deleteProduct(productIndex){
    productContainer.splice(productIndex,1)
    localStorage.setItem("myProduct",JSON.stringify(productContainer) );

    displayProduct()
}

function searchProduct(searchTerm){
  var cartoona = `` ;
for(var i= 0 ; i<productContainer.length ; i++){
    if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true ||
    productContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true
){

        cartoona += `
        <tr>
       <td>${i}</td>
       <td>${productContainer[i].name}</td>
       <td>${productContainer[i].price}</td>
       <td>${productContainer[i].category}</td>
       <td>${productContainer[i].description}</td>
   
       <td> <button  class="btn btn-outline-warning ">Update</button></td>
       <td> <button onclick="deleteProduct(${i});"class="btn btn-outline-danger ">Delete</button></td>
   </tr>
       `

    }
    document.getElementById("tableBody").innerHTML = cartoona
}

}


function changeFormForUpdate(index){
    currentIndex = index;
    var product = productContainer[index] ; 
    ProductInput.value= product.name ;
    productPriceInput.value=product.price ;
    productCategoryInput.value=product.category;
    productDescriptionInput.value=product.description;

    toggleButton.innerHTML = "Update"
     
    toggleButton.addEventListener('click', () => {
        if (toggleButton.textContent === 'Update') {
            toggleButton.textContent = 'add product';
        } 
   
    });
     
}


function validateProductName(){

    let regex = /^[A-Z][a-z]{3,8}/ ;
    if (regex.test(ProductInput.value) == true) {
           
        ProductInput.classList.add("is-valid");
        ProductInput.classList.remove("is-invalid")
        userNameAlert.classList.replace("d-block","d-none");
        return true;

    }
    else{
        userNameAlert.classList.replace("d-none","d-block")
        ProductInput.classList.add("is-invalid")
        ProductInput.classList.remove("is-valid") ;
        return false ;


    }
}
ProductInput.addEventListener("keyup" ,validateProductName)