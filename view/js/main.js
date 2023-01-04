const containerStars = document.querySelector(".container-stars");
const divPlane = document.querySelector(".div-plane");
const Plane = document.getElementById("plane");
const divRocket = document.querySelector(".div-rocket");
const msgBox = document.querySelector(".message-box");
const play = document.getElementById("play");
const shot = document.getElementById("shot");

// Função para iniciar o game
play.addEventListener("click", () => {
        
        //Muda a posição inicial do foguete
        let planePosition = ["99px", "199px", "299px", "399px"]; //20%, 40%, 60%, 80%
        let planePositionRandom = planePosition[Math.floor(Math.random() * 4)]; 
        Plane.style.top = planePositionRandom;

        gameStart();
       // startRockets();
        //clearRockets();
        //onFire();
        //destroyRocket();
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
        
                console.log(rr+ "= foguete lado && tiro lado =" +ff)
                console.log(rrr+ "= foguete topo && tiro topo = "+fff)
        
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
        let sleepMove = false; //Guarda a informação do delay para movimentar a nave novamente
        document.addEventListener("keydown", function(e) {
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
                                }, 100); //Delay de 200ms para realizar nova movimentacao
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
                                }, 100); //Delay de 200ms para realizar nova movimentacao
                        }
                }
        })
   } 
  
   //Função para destruir os foguetes com o disparo
   function destroyRocket() {
       
                let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                let Fires = document.querySelectorAll(".fire");
                
                Fires.forEach(eachFires => {
                        Rockets.forEach(eachRockets => {
                                //Verifica a posição em relação a esquerda
                                positionRocketsLeft = eachRockets.offsetLeft; 
                                positionFiresLeft = eachFires.offsetLeft;

                                limit = (positionRocketsLeft - positionFiresLeft) //Ponto de contato com o tiro e o foguete (Limite 10)

                                
                                console.log("ssdsd" +limit)
                                //Verifica a posição e relação ao topo
                                positionFiresTop = eachFires.offsetTop;
                                positionRocketsTop = eachRockets.offsetTop;
                                
                                if (positionFiresTop == 229 && positionRocketsTop == 181 && limit <= 10) {
                                        eachRockets.parentNode.removeChild(eachRockets);
                                        eachFires.parentNode.removeChild(eachFires);
                                }
                        });
                });     
      
        
   }
//Corrigir o bug de mudar o Top ao pressionar a tecla
// foguete 81, 181, 281, 381 de top