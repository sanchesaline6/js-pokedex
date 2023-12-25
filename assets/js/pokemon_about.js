const pokemonContent = document.getElementById('pokemonContent');
let correctSpecies = '';

function loadPokemonDetails(){
    console.log('Page is loaded')
    const pokemonId = localStorage.getItem('pokemonId')
    
    pokeApi.getPokemonById(pokemonId)
    .then(response => {
        pokemonContent.innerHTML += showPokemonDetails(response)
    })   
    
}

function capitalize (word){
    return word.charAt(0).toUpperCase()+ word.slice(1)
}

function showPokemonDetails(pokemon){  
    
    return `    
    <main class="content ${pokemon.type}">
        <div class="detail-content">
            <section>
                <div class="detail-type">
                    <a href="./index.html"><i class="fa-solid fa-arrow-left fa-2xl" style="color: white;"></i></a>
                    <h1 class="name">${pokemon.name}</h1>
                    <span class="number">#${pokemon.number}</span>
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ul>
                    <img src=${pokemon.photo} alt=${pokemon.name}>
                </div>

                
            </section>
        </div>
        <table class="about">
            <thead class="table-title">
                <tr>
                    <th>About</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="key">Height</td>
                    <td class="value">${pokemon.height/10} cm</td>
                </tr>
                <tr>
                    <td class="key">Weight</td>
                    <td class="value">${pokemon.weight/10} kg</td>
                </tr>
                <tr>
                    <td class="key">Abilities</td>
                    <td class="value">${pokemon.abilities.map((ability) => capitalize(ability)).join(', ')}</td>
                </tr>
                <tr>
                    <td class="key">Moves</td>
                    <td class="value">${pokemon.moves.filter((item, index) => index <= 2).map(move => capitalize(move)).join(', ')}</td>
                </tr>
            </tbody>
        </table>
    </main> 
    `
}