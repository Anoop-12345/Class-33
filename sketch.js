//Physics Engine declaration
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//Variable Declaration
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

//Gamestate declaration
var gameState = "onSling";

function preload() {
    //Load Background image   
    backgroundImg = loadImage("sprites/bg.png");
}

function setup(){
    //Create Canvas,Engine and world
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    //Create a ground,platform,boxes,logs,pigs and slingshot using templates
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    //Add Background image
    background(backgroundImg);
    //Update modifications in engine
    Engine.update(engine);
    //strokeWeight(4);
    //Dsiplay all the objects in game
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

//Create a function in which the bird will move according to the mouse movement
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

//Create a function in which when mouse released the bird will be free to fly
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}
//Create a function in which when "SPACE KEY" is pressed trajectory will stop and Bird will be back to slingshot
function keyPressed(){
    if(keyCode === 32){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
    }
}