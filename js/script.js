const searchField = document.querySelector('#search-joke');
let jokes = document.querySelector('.jokes');

// const searchButton = document.querySelector('[type="submit"]')

searchField.addEventListener('keyup', (event) => {
    event.preventDefault();
    jokes.innerHTML = '';
    searchDadJokes();
});


function getRandomEmojis() {
    const emojis = ['😂','😝', '🤣','😹','🙈','😆','🙄','🤪'];
    return randomEmoji = emojis[Math.floor(Math.random()*emojis.length)];
}


function searchDadJokes() {
    const uri = `https://icanhazdadjoke.com/search?term=${searchField.value}`;
    const loading = document.querySelector('#loading');
    let header = new Headers();
    header.append('Accept', 'application/json');
    let request = new Request(uri, {
        method: 'GET',
        headers: header,
        mode: 'cors'
    });
    loading.removeAttribute('hidden');
    fetch(request)
    .then(res=>res.json())
    .then(data => {
        data.results.forEach(result => {
            const dadJoke = document.querySelector('.jokes');
            const {id, joke} = result;
            let jokeHTML = `
                <div class="joke">
                    <h2 id=${id}>${joke} ${getRandomEmojis()}</h2>
                </div>
            `;
            dadJoke.insertAdjacentHTML('afterbegin', jokeHTML);
        });
        loading.setAttribute('hidden', '');
    })
    .catch(err=>console.error(err));
}

function fetchDadJokes() {
    const uri = 'https://icanhazdadjoke.com';
    const loading = document.querySelector('#loading');
    
    let header = new Headers();
    header.append('Accept', 'application/json');
    let request = new Request(uri, {
        method: 'GET',
        headers: header,
        mode: 'cors'
    });
    loading.removeAttribute('hidden');
    fetch(request)
    .then(res=>res.json())
    .then(data => {
        loading.setAttribute('hidden', '');
        const {id, joke} = data;
        const dadJoke = document.querySelector('.jokes');
        const dadJokeHTML = `
        <div class="joke">
        <h2 id=${id}>${joke} ${getRandomEmojis()}</h2>
        </div>
        `;
        dadJoke.insertAdjacentHTML('afterbegin', dadJokeHTML);
    })
    .catch(err=>console.error(err));
}
fetchDadJokes();