const containerStars = document.querySelector(".container-stars");
const divPlane = document.querySelector(".div-plane");
const Plane = document.getElementById("plane");
const divRocket = document.querySelector(".div-rocket");
const msgBox = document.querySelector(".message-box");
const play = document.getElementById("play");

play.addEventListener("click", () => {
        gameStart();
        clearRockets();
        onFire();
        changePlane();
});

      

                        
// Função para iniciar o game
function gameStart() {
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
        
        msgBox.style.opacity = "0";
        setTimeout(() => {
                msgBox.style.display = "none";   
                Plane.classList.remove("plane-move");
        }, 650);
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
                        { right: '-5.5rem' },
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
                                        for (let i = 0; i < Rockets.length; i++) { //Encontrando cada ocorrência de foguete
                                                const eachRockets = Rockets[i];
                                                positionRockets = eachRockets.offsetLeft; //Verifica a posição em relação a esquerda
                                        if (positionRockets <= -48) {
                                                eachRockets.parentNode.removeChild(eachRockets);
                                        }
                                        }
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
                                
                        }
                 });
       }
       

    //Funcao para movimentar a nave
   function changePlane() {
        document.addEventListener("keydown", function(e) {
                let key = e.key;
                let currentTop = Plane.offsetTop;
                                   
                switch (key) {
                        case "w":
                                console.log(currentTop)
                                if (currentTop >= 199) {
                                        currentTop = currentTop - 100;
                                        Plane.style.top = +currentTop+"px";
                                }
                                break;
                        case "s":
                                if (currentTop <= 400) {
                                        currentTop = currentTop + 100;
                                        Plane.style.top = +currentTop+"px";
                                }
                                break;
                }   
    })
   } 

   
    
    
