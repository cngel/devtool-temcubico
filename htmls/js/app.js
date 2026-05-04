const bola = document.querySelector(".bola");
let x = 0;
let y = 0; 

function criarBola(qnt){
    for(let i=0; i<qnt;i++){
        let bolas = document.createElement("div");
        bolas.classList.add("bola");
        document.body.appendChild(bolas);
    }
}

criarBola(2);

const mexer = setInterval(function(){
    const b = [...document.querySelectorAll(".bola")];
    b.map((ele,inde)=>{
     x=Math.floor(Math.random()*700);
     y=Math.floor(Math.random()*50);
     ele.setAttribute("style",`margin-left:${x}px;margin-top:${y}px;`)
     ele.classList.add("transition");
   
    }) 
    
 },1000);
