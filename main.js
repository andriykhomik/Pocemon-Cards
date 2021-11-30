const pokeContainer = document.querySelector('#poke-container');
const pokemonCount = 300;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);
console.log (mainTypes);

const fetchPokemon = async ()=> {
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const  url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createCard(data);
}

fetchPokemon();

function createCard(card){

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = card.name[0].toUpperCase() + card.name.slice(1);
    const id = card.id.toString().padStart(3, '0');
    const pokemonType = card.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokemonType.indexOf(type) > -1);

    pokemonEl.style.backgroundColor = colors[type];

    pokemonEl.innerHTML = `
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.id}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>
        `

    //my hardcode, but it works:)
    /*pokemonEl.style.backgroundColor = colors.fairy;
        const imgContainerEl = document.createElement('div');
        imgContainerEl.classList.add('img-container');
            imgContainerEl.innerHTML = `<img src="" alt="">`;

        const infoEl = document.createElement('div');
        infoEl.classList.add('info');
            const numberEl = document.createElement('span');
            numberEl.classList.add('number');
            numberEl.innerText = '';

            const nameEl = document.createElement('h3');
            nameEl.classList.add('name');
            nameEl.innerText = card.name;

            const typeEl = document.createElement('small');
            typeEl.classList.add('type');
            typeEl.innerHTML = `Type: <span>${card.type}</span>`;

            infoEl.appendChild(numberEl);
            infoEl.appendChild(nameEl);
            infoEl.appendChild(typeEl);

        pokemonEl.appendChild(imgContainerEl);
        pokemonEl.appendChild(infoEl);*/

        pokeContainer.appendChild(pokemonEl);

}
