const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const conteudoGeral = document.getElementById('content')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <button onClick="loadPokemonPage(${pokemon.number})">
                <li class="pokemon ${pokemon.type}">
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
            </button>
        `).join('')

        let conteudoAtual = document.getElementById('content')
        if(conteudoGeral !== conteudoAtual){
            conteudoAtual.innerHTML = conteudoGeral
        }
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonPage(id) {
    pokeApi.searchPokemon(id)
    .then((pokemon) => {
        const newHTML = `
        <div class="conteudo ${pokemon.type}">
            <div class="buttonVoltar">
                <button onClick="loadPokemonItens(${offset}, ${limit})" type="button">
                    &larr;
                </button>
            </div>

            <div class="informations">
                <h1>${pokemon.name}</h1>
                <span class="number">#${pokemon.number}</span>
                
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>

            <img src="${pokemon.photo}" alt="${pokemon.name}">

            <div class="details">
                <h2>About</h2>
                <ol class="detail-name">
                    <li>Height</li>
                    <li>Weight</li>
                    <li>Abilities</li>
                </ol>
                <ol class="detail-content">
                    <li>${pokemon.height} m</li>
                    <li>${pokemon.weight} kg</li>
                    ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
                </ol>
            </div>
        </div>    
    `
    conteudoGeral.innerHTML = newHTML;
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})