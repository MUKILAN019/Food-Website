let arr1=[];
//generting random data
function randomImages(){
    const storeRandomImg=document.getElementById("randimg")
    axios
    .get(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    )
    .then((res)=>{
        const randomFood=res.data.meals;
        randomFood.forEach((meal) => {
        const randomFoods = document.createElement('div');
        randomFoods.setAttribute('id', 'rand');
        randomFoods.setAttribute('class', 'rand');
        const title = document.createElement('h2');
        const img = document.createElement('img');
        title.innerText=meal.strMeal;
        img.setAttribute('src', meal.strMealThumb);
        randomFoods.append(img);
        randomFoods.append(title);
        storeRandomImg.append(randomFoods)
       });
         });
}
randomImages()


let arr=[];
var button=document.getElementById("alingDiv");
var UserInput=document.getElementById("searchbar")
// create a function and fetch the api using axios
function getBlog(){
    const containerHandler= document.getElementById("blog");
    axios
    .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${UserInput.value}`
    )
    .then((res)=>{
        const listOfFood = res.data.meals;

        listOfFood.forEach((meal) => {
        const getFood = document.createElement('div');
        getFood.setAttribute('id', 'meal');
        getFood.setAttribute('class', 'meal');
        const category=document.createElement("h1")
        const title = document.createElement('h2');
        const img = document.createElement('img');
        category.innerText=UserInput.value
        title.innerText = meal.strMeal;
        img.setAttribute('src', meal.strMealThumb);
        getFood.append(img);
        getFood.append(title);
        arr.push(getFood);
    });
    arr.forEach((element)=>{
        containerHandler.append(element)

    });
});
}
let lengthOfarr = [];
let wrongLength = [];
button.addEventListener("click", function () {
    lengthOfarr.push(UserInput.value);
    getBlog();

    // if (UserInput.value === "sea food" ||UserInput.value === "Sea Food"|| UserInput.value === "SEA FOOD" || UserInput.value === "seafood" || UserInput.value === "SEAFOOD") {
    //     if (lengthOfarr.length === 1) {
    //         getBlog();
    //     }
    // } else {
    //     const containerHandler = document.getElementById("blog");

    //     // Clear the wrongLength array before adding a new element
    //     wrongLength = [];

    //     const noResult = document.createElement("h2");
    //     noResult.innerText = "No result is found.....";
    //     wrongLength.push(noResult);

    //     if (wrongLength.length === 1) {
    //         containerHandler.innerHTML = ''; // Clear existing content
    //         containerHandler.append(noResult);
    //     }
    // }
});

