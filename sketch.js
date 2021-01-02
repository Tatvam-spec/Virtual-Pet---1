//Create variables here
var dog, happyDog, dogImg;
var foodS, foodStock, database;


function preload()
{
  //load images here
  dogImg = loadImage("sprites/dog1.png")
  happyDog = loadImage("sprites/dog2.png")

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  dog = createSprie(250, 250, 50, 50);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);  

  drawSprites();
  //add styles here
  textSize(20);
  text("Food remaining:", foodStock, 200, 200);
  fill("white");
  stroke(2);


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
}


//Function to read values from Database
function readStock(data){
  foodS = data.val();
}


//Function to write values from Database
function writeStock(x){
  if(x <= 0){
    x = 0;
  } else{
    x = x - 1;
  }
database.ref('/').update({
  Food:x
})
}

