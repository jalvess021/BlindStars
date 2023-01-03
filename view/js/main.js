const containerStars = document.querySelector(".container-stars");
const divPlane = document.querySelector(".div-plane");
const Plane = document.getElementById("plane");
const divRocket = document.querySelector(".div-rocket");
const msgBox = document.querySelector(".message-box");
const play = document.getElementById("play");
const shot = document.getElementById("shot");

// Função para iniciar o game
play.addEventListener("click", () => {
        gameStart();
       // startRockets();
        //clearRockets();
        //onFire();
        changePlane();

       oiss()
});


function oiss() {
        const r = document.getElementById("rocketteste");
        const f = document.getElementById("fireteste");

        const rr = r.offsetLeft;
        const ff = f.offsetLeft;

        const rrr = r.offsetTop
        const fff = f.offsetTop
        
                console.log(rr+ " " +ff)
                console.log(rrr+ " "+fff)
        
}

// Função para iniciar o game
function gameStart() {
        msgBox.style.opacity = "0";
        setTimeout(() => {
                msgBox.style.display = "none";   
                Plane.classList.remove("plane-move");
        }, 650);
}
                        
// Função para iniciar o lançamento dos foguetes
function startRockets() {
        var velocity = "";
        setInterval(() => {
                setInterval(() => {
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
        }, 250);
}

        // Função para gerar foguetes de forma aleatória
       function randomPlaceRockets(difficulty) {  
                
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

       //Funcao para excluir os foguetes que ultrapassaram o campo de visão
       function clearRockets() { 
                        setInterval(() => {
                                let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                                Rockets.forEach(eachRockets => {
                                        positionRockets = eachRockets.offsetLeft; //Verifica a posição em relação a esquerda
                                        if (positionRockets <= -48) {
                                                eachRockets.parentNode.removeChild(eachRockets);
                                        }
                                });
                        }, 20);
       }  

       //Função para disparar
       function onFire() {
                document.addEventListener("mousedown", function(e){
                        const onMouse = e.buttons; 
                        if (onMouse == 1) {
                                let currentTop = Plane.offsetTop;
                                const newFire = document.createElement("div");
                                newFire.classList.add("fire");
                                topFire = currentTop + 30;
                                newFire.style.top = topFire+"px";
                                divPlane.appendChild(newFire); //Adiciona o elemento criado no html
                                shot.currentTime = 0.008;
                                shot.play();
                                
                        }
                 });
       }
       

    //Funcao para movimentar a nave
   function changePlane() {

        let sleepTop = false;
        let sleepBottom = false;

        document.addEventListener("keydown", function(e) {
                let key = e.key;
                let currentTop = Plane.offsetTop;
                        
                const changeTop = (key == "w" || key == "ArrowUp");
                if (changeTop) {
                        if (currentTop >= 199) {

                                currentTop = currentTop - 100;
                                Plane.style.top = +currentTop+"px";
                                console.log(currentTop)
                                sleepTop = true;
                                setTimeout(() => {
                                       sleepTop = false; 
                                }, 1000);
                        }
                }
                
                const changeBottom = (key == "s" || key == "ArrowDown");
                if (changeBottom) {
                        console.log("sas");
                        if (currentTop >= 99 && currentTop <= 399) {
                                currentTop = currentTop + 100;
                                Plane.style.top = +currentTop+"px";
                                sleepBottom = true;
                                setTimeout(() => {
                                       sleepBottom = false; 
                                }, 1000);
                        }
                }
                /*          
                switch (key) {
                        case "w":
                                
                                break;
                        case "s":
                                console.log(currentTop)
                                if (currentTop >= 99 && currentTop <= 399) {
                                        currentTop = currentTop + 100;
                                        Plane.style.top = +currentTop+"px";
                                        
                                }
                                break;
                }   */
    })
        setInterval(() => {
                while (sleepTop || sleepBottom) {
                        return false;     
                } 
        }, 20);
        
   } 
  
   function destroyRocket() {
        setInterval(() => {
                let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                let Fires = document.querySelectorAll(".fire");
                Rockets.forEach(eachRockets => {
                        Fires.forEach(eachFires => {

                                //Verifica a posição em relação a esquerda
                                positionRocketsLeft = eachRockets.offsetLeft; 
                                positionFiresLeft = eachFires.offsetLeft;

                                //Verifica a posição e relação ao topo
                                positionFiresTop = eachFires.offsetTop;
                                positionRocketsTop = eachRockets.offsetTop
                                
                        });
                });
        }, 0);
        
   }

//Corrigir o bug de mudar o Top ao pressionar a tecla
// foguete 81, 181, 281, 381 de top