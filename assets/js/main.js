
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonContent = document.getElementById('pokemonContent');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon){
    return `
        <a href="./pokemon_about.html" onclick="savePokemonId(${pokemon.number})">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `
}

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = [] ) => {
       const newHtml = pokemons.map(convertPokemonToLi).join('')
       pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit);
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;

    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else {
        loadPokemonItems(offset, limit)
    }
})


function savePokemonId(number){
    localStorage.setItem('pokemonId', number);
}


    
