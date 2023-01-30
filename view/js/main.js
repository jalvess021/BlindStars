const containerStars = document.querySelector(".container-stars");
const initBox = document.querySelector(".init-box");
const restartBox = document.querySelector(".restart-box");
const timeArea = document.querySelector(".time-area");
const killsArea = document.querySelector(".info-kills");
const scoreArea = document.querySelector(".score");
const divPlane = document.querySelector(".div-plane");
const Plane = document.getElementById("plane");
const divRocket = document.querySelector(".div-rocket");
const play = document.getElementById("play");
const restart = document.getElementById("restart");
const quit = document.getElementById("quit");
const kills = document.getElementById("kills");
const sec = document.getElementById("sec");
const min = document.getElementById("min");
const hour = document.getElementById("hour");
const killText = document.getElementById("killText");
const timeText = document.getElementById("timeText");
const spanScore = document.getElementById("span-score");

//Pré configuração de som-
const shotSound = document.getElementById("shotSound");
        shotSound.volume = 0.1;
const killSound = document.getElementById("killSound");
        killSound.volume = 0.15;
const looseSound = document.getElementById("looseSound");
        looseSound.volume = 0.2;

        var Loose = false; //verifica se perdeu

        var totalKills;
        var totalTime;
        var score = []; //Grava o score (kills, time)

        //Ocultar algumas áreas quando o jogo nao estiver rolando
        function removeDisplay() {
                killsArea.style.display = "none";
                scoreArea.style.display = "none";
                timeArea.style.display = "none"; 
        } removeDisplay();
        //Função para aparecer areas ocultas quando o jogo estiver rolando
        function setDisplay() {
                scoreArea.style.display = "flex";
                killsArea.style.display = "flex";
                timeArea.style.display = "";
        }

        var altura = window.screen.height;
        var largura = window.screen.width;
        if (altura >= 500 && largura >= 768) {
                play.addEventListener("click", ()=>{startGame()}); //Iniciar o game
                restart.addEventListener("click", ()=>{restartGame()}); //Reiniciar o game
                quit.addEventListener("click", ()=>{location.reload();}); //Sair
        }else{
                play.style.opacity = "0.2";
                confirm("Para proporcionar a melhor performance para o usuário, um dispositivo com medida IGUAL ou SUPERIOR à 768x500, é requerido para jogar o BLIND STAR GAME.\n\nTo provide the best performance for the user, a device measuring EQUAL or GREATER than 768x500 is required to play the BLIND STAR GAME.")
        }


// Função para iniciar o game
function startGame() {
        randomPlanePosition();
        closeBoxPlay();
        startRockets(); 
        clearArea();
        onFire();
        destroyRocket()
        changePlane();   
        looseGame();
        counterTime();
        setDisplay();
}
// Função para reiniciar o game
function restartGame() {
        Loose = false;
        //reseta o contador
        hour.innerHTML = "00";
        min.innerHTML = "00"
        sec.innerHTML = "00";
        //Reseta o contador de kills
        kills.innerHTML = "0";
        restartBox.style.opacity = "0";
        setTimeout(() => {
                restartBox.style.display = "none";   
        }, 650);
        recreatePlane("on");
        setDisplay();
        startRockets(); 
        clearArea();
        destroyRocket();
        looseGame();
        counterTime();
}
// Função para iniciar o game
function closeBoxPlay() {
        initBox.style.opacity = "0";
        setTimeout(() => {
                initBox.style.display = "none";   
                Plane.classList.remove("plane-move");
        }, 650);
}

//Muda a posição inicial do foguete
function randomPlanePosition() {
        let planePosition = ["99px", "199px", "299px", "399px"]; //20%, 40%, 60%, 80%
        let planePositionRandom = planePosition[Math.floor(Math.random() * 4)]; 
        Plane.style.top = planePositionRandom;  
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
                                        shotSound.currentTime = 0.001;
                                        shotSound.play();   
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
                        const changeTop = (key == "w" || key == "W" || key == "ArrowUp"); 
                        if (changeTop) {
                                if ((currentTop == 199 || currentTop == 299 || currentTop == 399) && !sleepMove) {
                                        sleepMove = true;   
                                        currentTop = currentTop - 100;
                                        const newTop = (Plane.style.top = +currentTop+"px");
                                        setTimeout(() => {
                                        sleepMove = false; 
                                        }, 100); //Delay de 100ms para realizar nova movimentacao
                                }
                        }
                        //realiza a movimentação para baixo
                        const changeBottom = (key == "s" || key == "S" || key == "ArrowDown"); 
                        if (changeBottom ) {
                                if ((currentTop == 99 || currentTop == 199 || currentTop == 299) && !sleepMove) {
                                        sleepMove = true;   
                                        currentTop = currentTop + 100;
                                        const newBottom = (Plane.style.top = +currentTop+"px");
                                        setTimeout(() => {
                                        sleepMove = false;
                                        }, 100); //Delay de 100ms para realizar nova movimentacao
                                }
                        }
                }
        })
   } 

    

    //Funcao para excluir os foguetes e os disparos que ultrapassaram o campo de visão
    function clearArea() { 
        var  verifyClear = setInterval(() => {
                if (!Loose) {
                        let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                        Rockets.forEach(eachRockets => {
                                positionRockets = eachRockets.offsetLeft; //Verifica a posição em relação a esquerda
                                if (positionRockets <= -48) {
                                        eachRockets.parentNode.removeChild(eachRockets);
                                }
                        });
                        let Fires = document.querySelectorAll(".fire");
                        Fires.forEach(eachFires =>{
                        positionFiresLeft = eachFires.offsetLeft;
                                if (positionFiresLeft >= 577) {
                                        eachFires.parentNode.removeChild(eachFires);
                                }
                        })
                }else if (Loose){
                        clearInterval(verifyClear);
                }
        }, 20);
} 
  
        //Contar o número de kills
        function counterKills() {
                killSound.play();
                let numKills = parseInt(kills.textContent);
                totalKills = numKills + 1;
                kills.innerHTML = totalKills;
                kills.classList.add("change-kill")
                setTimeout(() => {
                kills.classList.remove("change-kill")  
                }, 300);
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
                                                        counterKills();
                                                } 
                                        } 

                                        //Destroi no mid-top
                                        if (positionShotTop == 229 && positionRocketsTop == 181 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                        counterKills();
                                                }
                                        } 

                                        //Destroi no mid-low
                                        if (positionShotTop == 329 && positionRocketsTop == 281 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                        counterKills();
                                                }
                                        } 

                                        //Destroi no low
                                        if (positionShotTop == 429 && positionRocketsTop == 381 && ableDestroy) {
                                                limit = (positionRocketsLeft - positionShotLeft);
                                                if (limit <= 10) {      
                                                        eachRockets.parentNode.removeChild(eachRockets);
                                                        shot.parentNode.removeChild(shot);
                                                        counterKills();
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
                                        looseSound.play();
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                recreatePlane("off");    
                                        }, 200);
                                        Loose = true;
                                }

                                //Verificacao no mid-top
                                if (currentPlaneTop == 199 && limitLeft && currentRocketTop == 181 && !Loose) {
                                        looseSound.play();
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                recreatePlane("off");   
                                        }, 200);
                                        Loose = true;
                                }

                                //Verificacao no mid-low
                                if (currentPlaneTop == 299 && limitLeft && currentRocketTop == 281 && !Loose) {
                                        looseSound.play();
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                recreatePlane("off"); 
                                        }, 200);
                                        Loose = true;
                                }
                                //Verificacao no low
                                if (currentPlaneTop == 399 && limitLeft && currentRocketTop == 381 && !Loose) {
                                        looseSound.play();
                                        Plane.src = "view/img/explosao.gif";
                                        setTimeout(() => {
                                                recreatePlane("off"); 
                                        }, 200);
                                        Loose = true;
                                }
                        })
                        if (Loose) {
                                clearInterval(verifyLoose);
                                removeDisplay();
                                setTimeout(() => {
                                        restartBox.style.opacity = "1";
                                }, 500);
                                
                                setTimeout(() => {
                                        let Rockets = document.querySelectorAll(".rocket"); //Seleciona todos os foguetes
                                        Rockets.forEach(eachRockets => {
                                                eachRockets.parentNode.removeChild(eachRockets);//Remove todos os foguetes
                                        });
                                        restartBox.style.display = "flex";  
                                }, 1000);

                                setTimeout(() => {
                                        function changeScore() {

                                                let contentKill = killText.textContent;
                                                let contentTime = timeText.textContent;

                                                let newScore = {
                                                        kills: totalKills,
                                                        time: totalTime
                                                }
                                                score = newScore;

                                                //Last score
                                                if (score.kills == ("" || null || 0 || undefined)) {
                                                        score.kills = "0";
                                                }
                                                killText.innerHTML = score.kills;
                                                timeText.innerHTML = score.time;
                                                spanScore.innerHTML = score.kills+"<small>Kills</small> <small>in</small> "+score.time;
                                        }
                                        changeScore();
                                }, 10); //Timeout para da o tempo de carregar o last score
                        }
                }, 20);
        }
}       

function counterTime() {
        var timeOn = setInterval(() => {
                numberSec = parseInt(sec.textContent);
                numberMin = parseInt(min.textContent);
                numberHour = parseInt(hour.textContent);
                
                let secNew = numberSec + 1;
                        if (numberSec >= 9) {
                                sec.innerHTML = secNew;
                        }else{
                                sec.innerHTML = "0"+ secNew;
                        }

                let minNew = numberMin + 1;
                        if (numberSec >= 59) {
                                sec.innerHTML = "00";
                                if (numberMin >= 9) {
                                        min.innerHTML = minNew;
                                }else{
                                        min.innerHTML = "0"+ minNew;
                                }
                        }

                let hourNew = numberHour + 1;
                        if (numberMin >= 59) {
                                min.innerHTML = "00";
                                if (numberhour >= 9) {
                                        hour.innerHTML = hourNew;
                                }else{
                                        hour.innerHTML = "0"+ hourNew;
                                }
                        }
        }, 1000);
        var verifyLooseTime = setInterval(() => {
                if (Loose) {
                        clearInterval(timeOn); 
                        totalTime = hour.textContent+":"+min.textContent+":"+sec.textContent;
                        clearInterval(verifyLooseTime);
                }
        }, 0);
}

//Recriando a nave destruida
function recreatePlane(toggle) {
        if (toggle == "on") {
                Plane.src = "view/img/plane.png";
                Plane.style.display = "block";
        }else if(toggle == "off"){
                Plane.style.display = "none";
        }
}
