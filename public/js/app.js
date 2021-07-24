const form = document.querySelector('form');
const searchTerm = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTermValue = searchTerm.value;
    message1.textContent = 'loading....';
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + searchTermValue).then((res)=> {
    res.json().then((data) => {
        if (data) {
            message1.textContent = data;
        } else {
            message1.textContent = data.location;
            message2.textContent = data.address;

        }
    })
})
})