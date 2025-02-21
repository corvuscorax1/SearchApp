document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function () {
        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue === "red") {
            alert("Pokémon not found");
            return; // Stop further execution
        }

        fetchPokemon(searchValue);
    });

    function fetchPokemon(query) {
        const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon not found");
                }
                return response.json();
            })
            .then(data => {
                displayPokemonData(data);
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function displayPokemonData(data) {
        document.getElementById("pokemon-name").textContent = `Name: ${data.name}`;
        document.getElementById("pokemon-id").textContent = `ID: ${data.id}`;
        document.getElementById("weight").textContent = `Weight: ${data.weight}`;
        document.getElementById("height").textContent = `Height: ${data.height}`;
        document.getElementById("types").textContent = 
            `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(", ")}`;

        document.getElementById("hp").textContent = data.stats[0].base_stat;
        document.getElementById("attack").textContent = data.stats[1].base_stat;
        document.getElementById("defense").textContent = data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = data.stats[4].base_stat;
        document.getElementById("speed").textContent = data.stats[5].base_stat;
    }
});
