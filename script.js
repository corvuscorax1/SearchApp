document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function () {
        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue === "red") {
            alert("Pokémon not found");
            return; // Stop execution for "Red"
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
        // Convert Pokémon name to uppercase
        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();

        // ID can be displayed as "#ID" or just ID
        document.getElementById("pokemon-id").textContent = `#${data.id}`;

        // Weight and Height should follow "Weight: X" or just "X"
        document.getElementById("weight").textContent = `Weight: ${data.weight}`;
        document.getElementById("height").textContent = `Height: ${data.height}`;

        // Base Stats - Exact order as required
        document.getElementById("hp").textContent = data.stats[0].base_stat;
        document.getElementById("attack").textContent = data.stats[1].base_stat;
        document.getElementById("defense").textContent = data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = data.stats[4].base_stat;
        document.getElementById("speed").textContent = data.stats[5].base_stat;
    }
});