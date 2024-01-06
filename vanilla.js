const toggleButton = document.getElementsByClassName("toggle-button")[0];//[0] is used to access the first element in the HTMLCollection returned by getElementsByClassName
const navbar = document.getElementById("container2");//parent div

toggleButton.addEventListener("click", () => {//when a toggleButton is clicked the action will happens
    navbar.classList.toggle("active");// is using the classList property of the navbar element to toggle the presence of the class "active" on that element
});

let arr1 = [];//empty array to store data

// Generating random data
let dailogOpen = 0;//to check the flow of javascript is running properly(no any specific reasont to have this)
let popupContent;// creating object name to store content
const storeRandomImg = document.getElementById("randimg");
const dialogbox = document.querySelector("#dialogId");

function randomImages() {//function to generate images and content 
  axios//HTTP requests from a web browser
    .get("https://www.themealdb.com/api/json/v1/1/random.php")//API to generate random Api  
    .then((res) => {              //.then() method is used to attach callbacks to a promise
      const randomFood = res.data.meals; //that within the data property, there is another property named meals
      randomFood.forEach((meal) => { 
        const randomFoods = document.createElement("div");
        randomFoods.setAttribute("id", "rand");// giving attribute id="rand" for div
        randomFoods.setAttribute("class", "rand");//giving attribute class="rand" for div
        const title = document.createElement("h2");
        const img = document.createElement("img");
        title.innerText = meal.strMeal;//getting name value from object meal
        img.setAttribute("src", meal.strMealThumb); // getting each image value from from meal object 
        randomFoods.append(img);//storing data to randomFood object(image)
        randomFoods.append(title);//storing data to randomFood object(title)
        storeRandomImg.append(randomFoods);//storing randomfood data in storeRandomImg to div


        //for pop up , Creating dynamic content inserted through JavaScript 
        popupContent = `<h1 id="name">${meal.strMeal}</h1> 
                      <h2 class="theme">Instructions:</h2>
                      <p class="para">${meal.strInstructions}</p>
                      <h2 class="theme">Ingredients:</h2>`;

        // for loop getting each data
        for (let i = 1; i < 21; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];

          if (ingredient && ingredient.trim() !== "") { // if the ingredient is not empty
            // storing data inside popupContent , also represinting in what why the content want to display.
            popupContent += `<p class="para">${i}~${
              measure ? `${measure} ` : ""
            }${ingredient}</p>`;
          }
        }
      });
    });
}
// storeRandomImg.addEventListener("click", function () {});
const popup = document.getElementById("dialogId");
let ModalText = document.getElementById("innerText");
storeRandomImg.addEventListener("click", function () {//when image div is clicked
  ModalText.innerHTML = `${popupContent}`;
  dialogbox.showModal();//showing dialogbox 
  console.log("Open");
});
let buttonBtn = document.querySelector("#btn");//button inside dialog box

buttonBtn.addEventListener("click", function (e) {//when button is clicked
  e.preventDefault();//prevent the default behavior of an event
  console.log("inside fn", dailogOpen);
  dialogbox.close();//closing dialog box
  console.log("clicked", dailogOpen);
});

randomImages();//calling randomImages();




let arr = [];//creating empty array
var button = document.getElementById("alingDiv");
var UserInput = document.getElementById("searchbar");
const category = document.getElementById("innertext");
category.innerText = UserInput.value;
let containerHandler = document.getElementById("blog");
// create a function and fetch the api using axios
function getBlog() {
  containerHandler.innerHTML = '';// empting content inside a containerHandler to reuse it fresh
  arr = [];//empting content inside a array to reuse it fresh
  axios//HTTP requests from a web browser
    .get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${UserInput.value}`//API to generate User required Api 
    )
    .then((res) => { //.then() method is used to attach callbacks to a promise
      const listOfFood = res.data.meals;
      listOfFood.forEach((meal) => {
        const getFood = document.createElement("div");
        getFood.setAttribute("class", "meal");
        const title = document.createElement("h2");
        const img = document.createElement("img");
        
        category.innerText = UserInput.value;
        title.innerText = meal.strMeal;
        img.setAttribute("src", meal.strMealThumb);
        getFood.append(img);
        getFood.append(title);
        arr.push(getFood);
      });
      arr.forEach((element) => {
        containerHandler.append(element);
      });
    })
    .catch((error) => {//.catch() method is used to handle errors. If there's an issue with the HTTP request 
        if (error.response && error.response.status === 404) {
          // Handle 404 Not Found error
          console.log("Data not found");
        } else {
          // Handle other errors
          const category = document.getElementById("innertext");
          category.innerText = UserInput.value;
          const title=document.createElement("h1");
          title.setAttribute("id","noresult");
          title.innerText="No result is found...";//if any other error occurs, this get displayed in window
          containerHandler.append(title);
        }
      })
}
button.addEventListener("click", function(){
    getBlog();//callinh function , when user clicking search button.
})

