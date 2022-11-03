
let totalQ = document.querySelector(".totalNumber");
let currentQ = document.querySelector(".currentNumber");
let noQ = document.querySelector(".noQ");
let bar = document.querySelector(".bar");
let question = document.querySelector(".question");
let answerPart = document.querySelector(".answerPart");
let button = document.getElementById("button")
let right = document.querySelector(".right");
let wrong = document.querySelector(".wrong");



let noRight = 0;

let currentIndex = 1;



function getConnect(){
    // get the data from json file
    const req = new XMLHttpRequest();
    req.open('GET', "Q&A.json");
    req.send();
    req.onreadystatechange =  function() {
        if(req.readyState === 4 && req.status === 200){
            let obj = JSON.parse(req.responseText);
                // set the question
                setQuestion(obj);
                // check the answer
                checkAnswer(answerPart.childNodes , obj);
                // remove the current question
                    button.onclick =  () => {
                        if(currentIndex < obj.length ){
                            removeQuestion(answerPart,obj);
                            setQuestion(obj);
                            checkAnswer(answerPart.childNodes , obj);
                        }
                        else
                            getTheResult(obj);
                    }    
        }
    }
}

getConnect();

function setQuestion(obj){
   
    // add the total number of questions 
    var text = document.createTextNode(`${obj.length}`);
    totalQ.appendChild(text);
    bar.style.setProperty("width",`calc( ${currentIndex  / obj.length}% * 100) `);
   
    // add the number of the current question
    text = document.createTextNode(`${currentIndex}`);
    currentQ.appendChild(text);
    text = document.createTextNode(`${currentIndex}) `);
    noQ.appendChild(text);
    // hide the next button
        button.style.display = "none";
    // set the question
    text = document.createTextNode(`${obj[currentIndex -1].title}?`);
    question.appendChild(text);
    // set the answerPart
    for(let i = 0; i < 4; i++){
        let p = document.createElement("p");
        text = document.createTextNode(`${obj[currentIndex -1][`answer_${i+1}`]}`);
        p.appendChild(text);
        answerPart.appendChild(p);
    }
}

function checkAnswer(answerPart,obj){

    let firsTime = false;
    let right_answer = obj[currentIndex -1]["right_answer"];
    console.log(right_answer);
    answerPart.forEach(
         v => {
            v.onclick = function(){
                if(firsTime){
                    return;
                }
                
                if(v.innerText === right_answer ){
                    v.className = "right";
                    ++noRight;
                }
                else 
                    v.className = "wrong";
                firsTime = true;
  
            // to show the right answer
               if(firsTime){
                console.log("here");
                getRightAnswer(answerPart,right_answer);
                }
            // display the next button 
                button.style.display = "block";
            }
        }
    )
}


function removeQuestion() {
    let p = document.querySelectorAll("p");
    for(let i = 0; i < p.length; i++){
        if(p[i].classList.contains("right"))
            p[i].classList.remove("right");
        if(p[i].classList.contains("wrong"))
            p[i].classList.remove("wrong");
    }
    
    answerPart.innerHTML= "";
    noQ.innerHTML = "";
    question.innerHTML = "";
    currentQ.innerHTML = "";
    totalQ.innerHTML = "";

    currentIndex++;
}

function getRightAnswer(answerPart,right_answer){
        answerPart.forEach(
            v => {
                if(right_answer === v.innerText){
                    v.className = "right";
                }
            })
}


function getTheResult(obj){
    let quizForm = document.querySelector(".quizPart");

    while(quizForm.lastElementChild)
        quizForm.removeChild(quizForm.lastElementChild);
  
    let div = document.createElement("div");
    div.style.padding = "20px";
    div.style.textAlign = "center";
    let text = document.createTextNode(`Your score ${noRight} out of ${obj.length}`);
    div.appendChild(text);

    button.style.display = "none";
    console.log(quizForm);
    quizForm.appendChild(div);
    
}

