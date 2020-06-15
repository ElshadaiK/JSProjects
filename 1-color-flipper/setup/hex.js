const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');


btn.addEventListener('click', function(){
    let myColor = "#";
    for (let index = 0; index < 6; index++) {
        const randomNumber = getRandomNumber();
        myColor += hex[randomNumber];
    }
    console.log(myColor);
    document.body.style.backgroundColor = myColor;
    color.textContent = myColor;
})
function getRandomNumber(){
    return Math.floor(Math.random() * hex.length)
}