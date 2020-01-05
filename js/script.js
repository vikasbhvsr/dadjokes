const uri = 'https://icanhazdadjoke.com';

let header = new Headers();
header.append('Accept', 'application/json');
let request = new Request(uri, {
    method: 'GET',
    headers: header,
    mode: 'cors'
});

fetch(request)
.then(res=>res.json())
.then(data => {
    const emojis = ['😂', '🤣','😹','🙈','😆'];
    const randomEmoji = emojis[Math.floor(Math.random()*emojis.length)];
    const dadJoke = document.querySelector('.dad-joke');
    const dadJokeHTML = `
    <h2 id=${data.id}>${data.joke} ${randomEmoji}</h2>
    `;
    dadJoke.insertAdjacentHTML('afterbegin', dadJokeHTML);
})
.catch(err=>console.error(err));