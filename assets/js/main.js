const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonInfo = document.getElementById('pokemon-info')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="pokemonModal('${pokemon.number}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

$('.modal').on('hidden.bs.modal', function (e) {
  $(this).empty();
});

function loadPokemonModalInfo(pokemon) {
    return `

    <div class="pokedex pokemon ${pokemon.type}">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="detail">
            <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <ul class="statsModal">
                Base Stats
                ${pokemon.stats.map((stat) =>
                    `<li class="statpokemon">${stat.stat.name} ${stat.base_stat}</li>`).join('')
                }
            </ul>
        </div> 

        <div class="btn-stats">
            <button type="button" class="btn-default" data-dismiss="modal">Fechar</button>
        </div>
    </div>
`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function pokemonModal(pokemon_number) {
    console.log("Poke number " + pokemon_number)

    request_pokemon_info(pokemon_number).then((pokemon) => {
        const newHtml = loadPokemonModalInfo(pokemon);
        console.log(pokemon);
        $("#JanelaModal").append(newHtml);
    });

    $("#JanelaModal").modal();
}