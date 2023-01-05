const containerStars = document.querySelector(".container-stars");
const divPlane = document.querySelector(".div-plane");
const Plane = document.getElementById("plane");
const divRocket = document.querySelector(".div-rocket");
const msgBox = document.querySelector(".message-box");
const play = document.getElementById("play");
const shot = document.getElementById("shot");

var Loose = false;

// Função para iniciar o game
play.addEventListener("click", () => {
        
        //Muda a posição inicial do foguete
        
        let planePosition = ["99px", "199px", "299px", "399px"]; //20%, 40%, 60%, 80%
        let planePositionRandom = planePosition[Math.floor(Math.random() * 4)]; 
        Plane.style.top = planePositionRandom;  
        closeBoxPlay();
        startRockets(); 
        clearRockets();
        onFire();
        destroyRocket()
        changePlane();   
        looseGame();
        oiss();
});

function restartGame() {
        startRockets(); 
        clearRockets();
        onFire();
        destroyRocket()
        changePlane();   
        looseGame();
}


                
        
 


function oiss() {
        const r = document.getElementById("rocketteste");
        const f = document.getElementById("fireteste");

        const rr = r.offsetLeft;
        const ff = f.offsetLeft;

        const rrr = r.offsetTop
        const fff = f.offsetTop
        
                console.log(rr+ "= foguete lado && tiro lado =" +ff)
                console.log(rrr+ "= foguete topo && tiro topo = "+fff)
        
}

// Função para iniciar o game
function closeBoxPlay() {
        msgBox.style.opacity = "0";
        setTimeout(() => {
                msgBox.style.display = "none";   
                Plane.classList.remove("plane-move");
        }, 650);
}
                        
// Função para iniciar o lançamento dos foguetes
function startRockets() {
        var velocity = "";

       var verifyStartRockets = setInterval(() => {
                        if (!Loose) {
                              var verifyVelocity =  setInterval(() => {
                                        if (velocity == "") {
                                                velocity = 2000;
                                        }
                                                newVelocity = velocity - 0.5; 
                                        if (newVelocity <= 500) {
                                                velocity = 500;
                                        } else{ 
                                                velocity = newVelocity;
                                        }
                                }, 2000);
                
                                randomPlaceRockets(velocity);
                        } else if (Loose) {
                                clearInterval(verifyVelocity);
                                clearInterval(verifyStartRockets);
                        }
        }, 250);
}

        // Função para gerar foguetes de forma aleatória
       function randomPlaceRockets(difficulty) {  
                if (!Loose) {
                        let rocketPosition = ["rocket-top", "rocket-mid-top", "rocket-mid-low", "rocket-low"];
                        let rocketPositionRandom = rocketPosition[Math.floor(Math.random() * 4)];        
                        
                        //Criando o elemento
                        const imgRocket = document.createElement("img");
                        imgRocket.classList.add("rocket", rocketPositionRandom);
                        imgRocket.src = "view/img/rocket.png";
                        
                        imgRocket.animate([ //configurando a animação
                                { right: '-3rem' },
                                { right: '100%' }
                        ], {
                                duration: difficulty, //padrao 1800
                                easing: 'linear'
                        });
                        
                        divRocket.appendChild(imgRocket); //Adiciona o elemento criado no html
                }  
       }

       //Funcao para excluir os foguetes que ultrapassaram o campo de visão
       function clearRockets() { 
                      var  verifyClear = setInterval(() => {
                                if (!Loose) {
                                        let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                                        Rockets.forEach(eachRockets => {
                                                positionRockets = eachRockets.offsetLeft; //Verifica a posição em relação a esquerda
                                                if (positionRockets <= -48) {
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                }
                                        });
                                }else if (Loose){
                                        clearInterval(verifyClear);
                                }
                        }, 20);
       }  

       //Função para disparar
       function onFire() {
                let sleepFire = false;
                document.addEventListener("mousedown", function(e){
                        if (!Loose && !sleepFire) {
                                const onMouse = e.buttons; 
                                let currentTop = Plane.offsetTop;
                                if (onMouse == 1 && (currentTop == 99 || currentTop == 199 || currentTop == 299 || currentTop == 399)) {
                                        sleepFire = true;
                                        const newFire = document.createElement("div");
                                        newFire.classList.add("fire");
                                        topFire = currentTop + 30;
                                        newFire.style.top = topFire+"px";
                                        divPlane.appendChild(newFire); //Adiciona o elemento criado no html
                                        shot.currentTime = 0.008;
                                        shot.play();   
                                        setTimeout(() => {
                                              sleepFire = false;  
                                        }, 150); 
                                }
                        }
                 });
       }
       

    //Funcao para movimentar a nave
   function changePlane() {
        let sleepMove = false; //Guarda a informação do delay para movimentar a nave novamente

        document.addEventListener("keydown", function(e) {
                if (!Loose) {
                        let key = e.key; //Captar o clique
                        let currentTop = Plane.offsetTop; // Verificar a posição em relação ao topo

                        //realiza a movimentação para cima
                        const changeTop = (key == "w" || key == "ArrowUp"); 
                        if (changeTop) {
                                if ((currentTop == 199 || currentTop == 299 || currentTop == 399) && !sleepMove) {
                                        sleepMove = true;   
                                        currentTop = currentTop - 100;
                                        const newTop = (Plane.style.top = +currentTop+"px"); 
                                        //console.log(newTop);
                                        setTimeout(() => {
                                        sleepMove = false; 
                                        }, 100); //Delay de 100ms para realizar nova movimentacao
                                }
                        }
                        //realiza a movimentação para baixo
                        const changeBottom = (key == "s" || key == "ArrowDown"); 
                        if (changeBottom ) {
                                if ((currentTop == 99 || currentTop == 199 || currentTop == 299) && !sleepMove) {

                                        sleepMove = true;   
                                        currentTop = currentTop + 100;
                                        const newBottom = (Plane.style.top = +currentTop+"px");
                                        //console.log(newBottom);
                                        setTimeout(() => {
                                        sleepMove = false;
                                        }, 100); //Delay de 100ms para realizar nova movimentacao
                                }
                        }
                }
        })
   } 
  
   //Função para destruir os foguetes com o disparo
   function destroyRocket() {
       var verifyLooseDestroy = setInterval(() => {
                if (!Loose) {
                        let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                        let Fires = document.querySelectorAll(".fire");

                        Fires.forEach((shot) => {
                                positionShotTop = shot.offsetTop;
                                positionShotLeft = shot.offsetLeft;
                                
                                Rockets.forEach((eachRockets) => {

                                        positionRocketsTop = eachRockets.offsetTop;
                                        positionRocketsLeft = eachRockets.offsetLeft; 

                                        ableDestroy = (positionRocketsLeft >= 80 && positionRocketsLeft <= 577 ); //Verifica a distancia minima de respaw para ser destruido
                                        //Destroi no mid-top
                                        if (positionShotTop == 129 && positionRocketsTop == 81 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                }
                                        } 

                                        //Destroi no mid-top
                                        if (positionShotTop == 229 && positionRocketsTop == 181 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                }
                                        } 

                                        //Destroi no mid-low
                                        if (positionShotTop == 329 && positionRocketsTop == 281 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                }
                                        } 

                                        //Destroi no low
                                        if (positionShotTop == 429 && positionRocketsTop == 381 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                }
                                        } 
                                });
                        })
                } else if (Loose){
                        clearInterval(verifyLooseDestroy);
                }
        }, 0);
   }

   function looseGame() {

        /*
        * limiteLeft 77px
        * Limite 54 pixels de diferença vertical
        */
        
        if (!Loose) {
               var verifyLoose =  setInterval(() => {

                        let currentPlaneTop = Plane.offsetTop;
                        let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
        
                        Rockets.forEach((eachRockets) => {
                                
                                let currentRocketTop =  eachRockets.offsetTop; 
                                let currentRocketLeft = eachRockets.offsetLeft;
        
                                let limitLeft = (currentRocketLeft <= 75); 
        
                                //Verificacao no top
                                if (currentPlaneTop == 99 && limitLeft && currentRocketTop == 81 && !Loose) {
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                Plane.parentNode.removeChild(Plane);   
                                        }, 200);
                                        Loose = true;
                                }

                                //Verificacao no mid-top
                                if (currentPlaneTop == 199 && limitLeft && currentRocketTop == 181 && !Loose) {
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                Plane.parentNode.removeChild(Plane);   
                                        }, 200);
                                        Loose = true;
                                }

                                //Verificacao no mid-low
                                if (currentPlaneTop == 299 && limitLeft && currentRocketTop == 281 && !Loose) {
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                Plane.parentNode.removeChild(Plane);   
                                        }, 200);
                                        Loose = true;
                                }
                                //Verificacao no low
                                if (currentPlaneTop == 399 && limitLeft && currentRocketTop == 381 && !Loose) {
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                Plane.parentNode.removeChild(Plane);   
                                        }, 200);
                                        Loose = true;
                                }
                        })
                        if (Loose) {
                                clearInterval(verifyLoose);
                        }
                }, 20);
                
                
        }
}       


//Bug ao destruir a nave 