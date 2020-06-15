let count = 0;
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');
btns.forEach(function(btn){
    btn.addEventListener('click', function(event){
        const className = event.currentTarget.classList;
        if(className.contains('decrease')){
            count--;
        }
        else{
            if(className.contains('increase')){
            count++;
            }
            else{
                count = 0;
            }
        }
        if(count > 0){
            value.style.color = 'green';
        }
        else{
            if(count < 0){
                value.style.color = 'red';
            }
            else{
                value.style.color = '#222';
            }
        }
        value.textContent = count;
    })
})