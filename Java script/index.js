/// <reference types= "../Jquery/@types/jquery" />


// ? >>>>>>>>>>>>>>>> Global Variables >>>>>>>>>>>>>>>>>

let meals = document.getElementById('meals')

let meals1 = document.getElementById('meals1')

let isValid = false;
let formData = document.querySelector('input')


let searchByName = document.getElementById('searchByName')
let searchByFirstLitter = document.getElementById('searchByFirstLitter')
let toSearch = document.getElementById('toSearch')
let loading = document.querySelector('.loading')
let loading1 = document.querySelector('.loading1')
let loading2 = document.querySelector('.loading2')

// * >>>>>>>>>>>>>>>> Events >>>>>>>>>>>>>>>>>


$(function(){
    $('.loading .loader').fadeOut(1000, function(){
        $('.loading').slideUp(1000, function(){
            $('body').css('overflow','auto')
            $('.loading').remove()
        })
    })
});

$('.native-link').slideUp(0);

$('#openSide').on('click', function(){
    $('.side-links').animate({width:'toggle',paddingInline:'toggle'},700)

    $('.native-link').slideToggle(700)

    if ($('.listMark').hasClass('fa-bars')) {
        $('.listMark').removeClass('fa-bars')
        $('.listMark').addClass('fa-xmark')
    }
    else{
        $('.listMark').addClass('fa-bars')
        $('.listMark').removeClass('fa-xmark')
    }
});

document.querySelectorAll('.native-link').forEach(function(link){
    link.addEventListener('click', function (e) {
        $('.side-links').animate({width:'toggle',paddingInline:'toggle'},700)
        if ($('.listMark').hasClass('fa-bars')) {
            $('.listMark').removeClass('fa-bars')
            $('.listMark').addClass('fa-xmark')
        }
        else{
            $('.listMark').addClass('fa-bars')
            $('.listMark').removeClass('fa-xmark')
        }

        let myLink = e.target.getAttribute('data-inside')
        if (myLink == 'Search'){
            search();
            $('.native-link').slideUp(700)
        }
        else if (myLink == 'Categories'){
            getCategories();
            toSearch.classList.add('d-none')
            loading2.classList.add('d-none');
            $('.native-link').slideUp(700)
        }
        else if (myLink == 'Area'){
            getArea();
            toSearch.classList.add('d-none')
            loading2.classList.add('d-none');
            $('.native-link').slideUp(700)
        }
        else if(myLink == 'Ingredients'){
            getIngredient();
            toSearch.classList.add('d-none')
            loading2.classList.add('d-none');
            $('.native-link').slideUp(700)
        }
        else{
            contact();
            toSearch.classList.add('d-none')
            loading2.classList.add('d-none');
            $('.native-link').slideUp(700)
        }
    })
})


// ! >>>>>>>>>>>>>>>> Functions >>>>>>>>>>>>>>>>>

        //  >>>> Fetch data <<<<<

async function getMeals(){
    loading1.classList.remove('d-none')

    let api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')

    let responce = await api.json();

    let data = responce.meals;
    
    return data;

}

function displayMeals(mealsData){
    let mealsBox = ``;
    for (let i = 0; i < mealsData.length; i++) {

        mealsBox += `
            <div onclick = "showDetails(${mealsData[i].idMeal})" class="col-md-3">
                <div class="myImg rounded-2">
                    <img  src="${mealsData[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                    <div class="layer">
                        <h3 class="text-black">${mealsData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = mealsBox;
}

async function start(){
    let startMeals = await getMeals();
    displayMeals(startMeals)
    loading1.classList.add('d-none')
}

start();

            // Details meals on start

async function showDetails(id){
    loading1.classList.remove('d-none')
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    let responce = await api.json();
    
    details(responce.meals[0])
    loading1.classList.add('d-none')
}

function details(data){

    let mealDetails = `
    <div class="col-md-4">
        <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="" />
        <h3 class="mt-2">${data.strMeal}</h3>
    </div>
    <div class="col-md-8">
        <h1>Instructions</h1>
        <p>${data.strInstructions}</p>
        <h3 class="areaName">Area : <span>${data.strArea}</span></h3>
        <h3 class="sideName">Category : <span>${data.strCategory}</span></h3>
        <h3 class="mb-4">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure1 + data.strIngredient1}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure2 + data.strIngredient2}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure3 + data.strIngredient3}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure4 + data.strIngredient4}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure5 + data.strIngredient5}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure6 + data.strIngredient6}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure7 + data.strIngredient7}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure8 + data.strIngredient8}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure9 + data.strIngredient9}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure10 + data.strIngredient10}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure11 + data.strIngredient11}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure12 + data.strIngredient12}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure13 + data.strIngredient13}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure14 + data.strIngredient14}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure15 + data.strIngredient15}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure16 + data.strIngredient16}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure17 + data.strIngredient17}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure18 + data.strIngredient18}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure19 + data.strIngredient19}</li>
            <li class="text-bg-light rounded-2 m-2 text-primary">${data.strMeasure20 + data.strIngredient20}</li>
        </ul>
        <h3 class="mb-4">Tags :</h3>
        <span class="mb-3 text-bg-light text-primary p-2 rounded-2  d-block strTags">${data.strTags}</span>
        <a href="${data.strSource}" target="_blank"><button  class="btn btn-danger me-2 mb-5">Source</button></a>
        <a href="${data.strYoutube}" target="_blank"><button class="btn btn-danger mb-5">Youtube</button></a>
    </div>
    `
    document.getElementById('meals').innerHTML =  mealDetails;
}




            // Categories

async function getCategories(){
    loading1.classList.remove('d-none');

    let api = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')

    let responce = await api.json();

    let data = responce.categories;
    
    displayCategories(data)

    loading1.classList.add('d-none')
}   

function displayCategories(categoriesData){
    let categoriesBox = ``;

    for (let i = 0; i < categoriesData.length; i++) {
        // console.log();
        categoriesBox += `
            <div onclick = "catDetails('${categoriesData[i].strCategory}')" class="col-md-3">
                <div class="myImgCat rounded-2">
                    <img  src="${categoriesData[i].strCategoryThumb}" class="w-100 rounded-2" alt="catMeal">
                    <div class="layerCat">
                        <h3 class="text-black text-center">${categoriesData[i].strCategory}</h3>
                        <p class="text-black text-center">${categoriesData[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = categoriesBox;
}

async function catDetails(category){
    loading1.classList.remove('d-none');
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

    let responce = await api.json();
    
    categoryItems(responce.meals)
    loading1.classList.add('d-none')
}

function categoryItems(mealsData){
    let mealsBox = ``;
    for (let i = 0; i < mealsData.length; i++) {

        mealsBox += `
            <div onclick = "showDetails(${mealsData[i].idMeal})" class="col-md-3">
                <div class="myImg rounded-2">
                    <img  src="${mealsData[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                    <div class="layer">
                        <h3 class="text-black">${mealsData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = mealsBox;
}



            // Area

async function getArea(){
    loading1.classList.remove('d-none')
    let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')

    let responce = await api.json();

    let data = responce.meals;
    
    displayArea(data)
    loading1.classList.add('d-none')
}

function displayArea(areaData){
    let areaBox = ``;

    for (let i = 0; i < areaData.length; i++) {
        areaBox += `
            <div onclick= "showArea('${areaData[i].strArea}')"  id="myHouse" class="col-md-3 text-center">
                <i  role="button" class="fa-solid fa-house-laptop myHouse" style="color: #ffffff;"></i>
                <h3>${areaData[i].strArea}</h3>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = areaBox;
}

async function showArea(country){
    loading1.classList.remove('d-none')
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)

    let responce = await api.json();

    let data = responce.meals;
    areaItems(data)
    loading1.classList.add('d-none')
}


function areaItems(mealsData){
    let mealsBox = ``;
    for (let i = 0; i < mealsData.length; i++) {
        mealsBox += `
            <div onclick = "showDetails(${mealsData[i].idMeal})" class="col-md-3">
                <div class="myImg rounded-2">
                    <img  src="${mealsData[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                    <div class="layer">
                        <h3 class="text-black">${mealsData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = mealsBox;
}



            // Ingredient

async function getIngredient(){
    loading1.classList.remove('d-none')
    let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')

    let responce = await api.json();

    let data = responce.meals;
    
    displayIngredient(data)
    loading1.classList.add('d-none')
}

function displayIngredient(ingredientData){
    let ingredientBox = ``;

    for (let i = 0; i < 20; i++) {
        ingredientBox += `
            <div onclick ="showingredient('${ingredientData[i].strIngredient}')" role = "button" id="ingredient" class="col-md-3">
                <i class="fa-solid fa-drumstick-bite" style="color: #ffffff;"></i>
                <h3>${ingredientData[i].strIngredient}</h3>
                <p>${ingredientData[i].strDescription}</p>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = ingredientBox;
}

async function showingredient(ingredient){
    loading1.classList.remove('d-none')
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)

    let responce = await api.json();

    let data = responce.meals;

    ingredientItems(data)
    loading1.classList.add('d-none')
}

function ingredientItems(mealsData){
    let mealsBox = ``;
    for (let i = 0; i < mealsData.length; i++) {
        mealsBox += `
            <div onclick = "showDetails(${mealsData[i].idMeal})" class="col-md-3">
                <div class="myImg rounded-2">
                    <img  src="${mealsData[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                    <div class="layer">
                        <h3 class="text-black">${mealsData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('meals').innerHTML = mealsBox;
}




            // Search

function search(){

    meals.innerHTML =`
        <div class="col-md-6">
            <input oninput="searchName()" class="form-control" type="search" id="searchByName" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchByFirst()" class="form-control" type="search" id="searchByFirstLitter" maxlength="1" placeholder="Search By First Letter">
        </div>
    `
}

async function searchName(){
    loading2.classList.remove('d-none');

    toSearch.classList.remove('d-none')

    let shName = document.getElementById('searchByName').value.toLowerCase()

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${shName}`)

    let responce = await api.json();

    let data = responce.meals;


    let mealsBox = ``;
    for (let i = 0; i < data.length; i++) {
        if (data[i].strMeal.toLowerCase().includes(shName)) {
            mealsBox += `
                <div onclick = "showDetails(${data[i].idMeal})" class="col-md-3">
                    <div class="myImg rounded-2">
                        <img  src="${data[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                        <div class="layer">
                            <h3 class="text-black">${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('meals1').innerHTML = mealsBox;
            loading2.classList.add('d-none');
        }
    }
}

async function searchByFirst(){
    loading2.classList.remove('d-none');

    toSearch.classList.remove('d-none')

    let shLitter = document.getElementById('searchByFirstLitter').value.toLowerCase()

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${shLitter}`)

    let responce = await api.json();

    let data = responce.meals;
    
    let mealsBox = ``;
    for (let i = 0; i < data.length; i++) {
        if (data[i].strMeal.toLowerCase().startsWith(shLitter)) {
            mealsBox += `
                <div onclick = "showDetails(${data[i].idMeal})" class="col-md-3">
                    <div class="myImg rounded-2">
                        <img  src="${data[i].strMealThumb}" class="w-100 rounded-2" alt="meal">
                        <div class="layer">
                            <h3 class="text-black">${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('meals1').innerHTML = mealsBox;
            loading2.classList.add('d-none');
        }
        
    }

}



            // Contact Us


function contact(){
    let contactUs = `
        <div class="formParent">
            <div class="w-50">
                <form oninput = "check()">
                    <input  oninput = "nameValidation()" id="yourName" class="form-control mb-3 " type="text" placeholder="Enter Your Name">

                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="nameInValid" class="bg-white rounded-2 text-danger d-none ">
                        <li>Name Is Required</li>
                            <li>Minmum Length 2 and Maxmum 20</li>
                        </ul>
                    </div>
                    </div>

                    <input oninput = "emailValidation()" id="yourEmail" class="form-control mb-3" type="email" placeholder="Enter Your Email">

                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="emailInValid" class="bg-white rounded-2 text-danger d-none">
                        <li>Email Is Required</li>
                        <li>InValid Email Formate</li>
                        </ul>
                    </div>
                    </div>

                    <input oninput = "phoneValidation()" id="yourPhone" class="form-control mb-3" type="number" placeholder="Enter Your Phone">

                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="phoneInValid" class="bg-white rounded-2 text-danger d-none">
                        <li>Phone Is Required</li>
                        <li>InValid phone Formate</li>
                        </ul>
                    </div>
                    </div>

                    <input oninput = "ageValidation()" id="yourAge" class="form-control mb-3" type="number" placeholder="Enter Your Age">

                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="ageInValid" class="bg-white rounded-2 text-danger d-none">
                        <li>Age Is Required</li>
                        <li>Minimum 10 Maxmum 80</li>
                        </ul>
                    </div>
                    </div>

                    <div class="pass1">
                    <input oninput = "passwordValidation()" id="yourPass" class="form-control mb-3" type="password" placeholder="Enter Your Password">
                    <div id="checkBox" class="checkBox1 ms-2 d-none" >
                        <input id="myCheckBox" type="checkbox">
                    </div>
                    </div>
                    
                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="passwordInValid" class="bg-white rounded-2 text-danger d-none">
                        <li>Password Is Required</li>
                        <li>Minimum eight characters, at least one letter and one number</li>
                        </ul>
                    </div>
                    </div>


                    <div class="pass2">
                    <input oninput = "passwordValidation2()" id="rePassword" class="form-control mb-3" type="password" placeholder="Repassword">
                    <div id="checkBox2" class="checkBox2 ms-2 d-none" >
                        <input id="myCheckBox2" type="checkbox">
                    </div>
                    </div>

                    <div class="row mt-2">
                    <div class="col-md-12">
                        <ul id="passwordInValid2" class="bg-white rounded-2 text-danger text-center d-none">
                        <li class="list-unstyled">Enter Valid Repassword</li>
                        </ul>
                    </div>
                    </div>

                    
                </form>
                <button id="submitBTN" disabled class="w-100 " >Submit</button>
            </div>
        </div>
    `
    document.getElementById('meals').innerHTML = contactUs;
}

function check() {
    if (nameValidation() && emailValidation() &&
     phoneValidation() && ageValidation() && passwordValidation() && passwordValidation2()) {
        submitBTN.removeAttribute('disabled')
        submitBTN.classList.add('btn','btn-danger')
    }
}





//  >>>>>>>>>>>>>>>> Validation >>>>>>>>>>>>>>>>>


function nameValidation(){
    let nameInValid = document.getElementById('nameInValid')
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexStyle.test(yourName.value)){
        yourName.classList.add('is-valid')
        yourName.classList.remove('is-invalid')
        nameInValid.classList.add('d-none')
        return true;
    }
    else{
        yourName.classList.add('is-invalid')
        yourName.classList.remove('is-valid')
        nameInValid.classList.remove('d-none')
        return false
    }
}

function emailValidation(){
    let emailInValid = document.getElementById('emailInValid')
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexStyle.test(yourEmail.value)) {
        yourEmail.classList.add('is-valid')
        yourEmail.classList.remove('is-invalid')
        emailInValid.classList.add('d-none')
        return true;
    }
    else{
        yourEmail.classList.add('is-invalid')
        yourEmail.classList.remove('is-valid')
        emailInValid.classList.remove('d-none')
        return false
    }
}

function phoneValidation(){
    let phoneInValid = document.getElementById('phoneInValid')
    const regexStyle = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

    if (regexStyle.test(yourPhone.value)) {
        yourPhone.classList.add('is-valid')
        yourPhone.classList.remove('is-invalid')
        phoneInValid.classList.add('d-none')
        return true;
    }
    else{
        yourPhone.classList.add('is-invalid')
        yourPhone.classList.remove('is-valid')
        phoneInValid.classList.remove('d-none')
        return false
    }
}

function ageValidation(){
    let ageInValid = document.getElementById('ageInValid')
    const regexStyle = /^([1-7][0-9]|80)$/;

    if (regexStyle.test(yourAge.value)) {
        yourAge.classList.add('is-valid')
        yourAge.classList.remove('is-invalid')
        ageInValid.classList.add('d-none')
        return true;
    }
    else{
        yourAge.classList.remove('is-valid')
        yourAge.classList.add('is-invalid')
        ageInValid.classList.remove('d-none')
        return false
    }
}

function passwordValidation(){
    let passwordInValid = document.getElementById('passwordInValid')

    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexStyle.test(yourPass.value)) {
        passwordInValid.classList.add('d-none')
        return true;
    }
    else{
        passwordInValid.classList.remove('d-none')
        return false
    }
}

function passwordValidation2(){
    let passwordInValid2 = document.getElementById('passwordInValid2')
    if (rePassword.value == yourPass.value ) {
        passwordInValid2.classList.add('d-none')
        return true;
    }
    else{
        passwordInValid2.classList.remove('d-none')
        return false
    }
}

