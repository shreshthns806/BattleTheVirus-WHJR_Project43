//Create Variables
    var virus, player, soap, mask, handShake, virusGroup, soapGroup, maskGroup, handShakeGroup;
    var maskImg, handshakeImg, virusImg, soapImg;
    var invisibleGround;
    var backgroundImg;
    var spawnVirusRate = 60, virusVelocity = 4;
    var gameState = "toStart"

//Load background Image
    function preload(){
        backgroundImg = loadImage("images/background1.jpg");
        maskImg = loadImage("images/mask.png");
        soapImg = loadImage("images/soap.png");
        handshakeImg = loadImage("images/handshake.png");
        virusImg = loadImage("images/virus.png")
    }

function setup(){
    var canvas = createCanvas(500,400);
    invisibleGround = createSprite(100,330,800,40);
    invisibleGround.visible = false;
    player = createSprite(470,300,20,20)
    virusGroup = createGroup();
    soapGroup = createGroup();
    maskGroup = createGroup();
    handShakeGroup = createGroup();
}

function draw(){
    //Give Text settings
        fill(0);
        textSize(20);
    
    //background settings
        background(backgroundImg)
       
    //Display initial screen
        if(gameState == "toStart"){
            text("Jump over the virus using space",120,100);
            text("Collect handwashes to slow the virus",140,120);
            text("Collect masks to destroy all the viruses and handshakes on screen",0,140);
            textSize(17.5)
            text("If you collect a handshake, then the speed of virus will increase",5,160)
            textSize(20);
            text("Press Enter",190,270)
            //Change game State when ENTER is pressed
                if(keyCode == ENTER){
                    gameState = "started"
                }
        }
    
    if(gameState == "end"){
        console.log("GAME OVER")
        text("PRESS R TO RESTART",100,200)
        if(keyCode === 82){
            gameState = "toStart";
        }
        
    }
        
    if(gameState === "started"){
        spawnVirus();
        spawnSoap();
        spawnMask();
        spawnHandShake();
        drawSprites();
        player.collide(invisibleGround);
        player.velocityY = player.velocityY+0.8;   
        if (player.isTouching(virusGroup)){
            gameState = "end"
        }
        if(player.isTouching(maskGroup)){
            maskHit();
        }
        if(player.isTouching(soapGroup)){
            soapHit();
        }
        if (player.isTouching(handShakeGroup)){
            handShakeHit();
        }
    }
}

function keyPressed(){
    if(keyCode == 32 && gameState == "started" && player.y >= 300){    
        player.velocityY = -15;
    }
}

function spawnVirus(){
    if ((frameCount % spawnVirusRate == 0) && gameState == "started"){
        virus = createSprite(0,300,20,20);
        virus.velocityX = virusVelocity;
        virusGroup.add(virus);
        virus.addImage(virusImg);
        virus.scale = 0.2;
        virus.debug = true
        virus.setCollider ("circle",0,0,100)        
    }
}

function spawnSoap(){
    if((frameCount % 200 == 0) && gameState == "started"){
        soap = createSprite(0,200,20,20);
        soap.velocityX = 5;
        soapGroup.add(soap);
        soap.addImage(soapImg);
        soap.scale = 0.05;
        soap.setCollider("circle",0,0,220);
    }
}

function spawnMask(){
    if((frameCount % 700 == 0) && gameState == "started"){
        mask = createSprite(0,200,20,20);
        mask.shapeColor = "red";
        mask.velocityX = 8;
        maskGroup.add(mask);
        mask.addImage(maskImg);
        mask.scale = 0.05
        mask.setCollider("circle",0,0,490)
    }    
}

function spawnHandShake(){
    if ((frameCount % 300 == 0) && gameState == "started"){
        handShake = createSprite(0,200,20,20);
        handShake.velocityX = 2;
        handShakeGroup.add(handShake);
        handShake.addImage(handshakeImg);
        handShake.scale = 0.08;
        handShake.setCollider("circle",0,0,200)
    }
}

function soapHit(){
    if(spawnVirusRate >30 && gameState == "started")
        spawnVirusRate = spawnVirusRate + 2;
}

function maskHit(){
    virusGroup.destroyEach();
    handShakeGroup.destroyEach();
}

function handShakeHit(){
    virusVelocity += 1;
}