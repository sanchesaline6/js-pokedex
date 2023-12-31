const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.order;
    
    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    const [type] = types;
    
    pokemon.types = types;
    pokemon.type = type;

    const abilities = pokeDetail.abilities.map(abilitieSlot => abilitieSlot.ability.name)
    const [ability] = abilities;

    pokemon.abilities = abilities;
    pokemon.ability = ability;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight

    const moves = pokeDetail.moves.map(moveSlot => moveSlot.move.name)
    const [move] = moves;

    pokemon.moves = moves;
    pokemon.move = move;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const base_url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(base_url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch(error => console.error(error))
}

pokeApi.getPokemonById = (id) => {
    const base_url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(base_url)
    .then(response => response.json())
    .then(pokemon => convertPokeApiDetailToPokemon(pokemon))
}