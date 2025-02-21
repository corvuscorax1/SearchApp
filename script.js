const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#F0B0E0",
};

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
    
        // ID format as "#ID"
        document.getElementById("pokemon-id").textContent = `#${data.id}`;
    
        // Weight and Height formatted
        document.getElementById("weight").textContent = `Weight: ${data.weight}`;
        document.getElementById("height").textContent = `Height: ${data.height}`;
    
        // Base Stats - Exact order
        document.getElementById("hp").textContent = data.stats[0].base_stat;
        document.getElementById("attack").textContent = data.stats[1].base_stat;
        document.getElementById("defense").textContent = data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = data.stats[4].base_stat;
        document.getElementById("speed").textContent = data.stats[5].base_stat;
    
        // Clear previous type data
        const typesContainer = document.getElementById("types");
        typesContainer.innerHTML = ""; 
    
        // Loop through types and create elements
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement("span");
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            typeElement.style.backgroundColor = typeColors[typeInfo.type.name] || "#ccc"; // Default to gray if not found
            typesContainer.appendChild(typeElement);
        });
    
        // Display Pokémon sprite
        displayPokemonSprite(data.sprites.front_default);
    }
    
    function displayPokemonSprite(spriteUrl) {
        const spriteImg = document.getElementById("sprite");
        
        // Update the sprite source and make it visible
        spriteImg.src = spriteUrl;
        spriteImg.style.display = "block"; 
    }
});