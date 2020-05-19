const weatherForm = document.querySelector('form');
const search = document.querySelector('form input');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then(res => {
        res.json().then(data => {
            if(data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forcast;
            }
        })
    })
})