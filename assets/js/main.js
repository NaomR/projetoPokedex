const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonsItens(offset, limit) {
  PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`
      )
      .join("");
    pokemonList.innerHTML += newHTML;
  });
}

loadPokemonsItens(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonsItens(offset, newLimit);
    loadMoreBtn.parentElement.removeChild(loadMoreBtn)
  } else {
    loadPokemonsItens(offset, limit);
  }
});
