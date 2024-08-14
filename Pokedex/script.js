document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const pokemonNameInput = document.getElementById('pokemon-name');
    const pokemonNameDisplay = document.getElementById('pokemon-name-display');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonHeight = document.getElementById('pokemon-height');
    const pokemonWeight = document.getElementById('pokemon-weight');
    const pokemonType = document.getElementById('pokemon-type');
    const pokemonInfo = document.getElementById('pokemon-info');

    searchButton.addEventListener('click', () => {
        const pokemonName = pokemonNameInput.value.toLowerCase();

        if (pokemonName) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    pokemonNameDisplay.textContent = `Name: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
                    pokemonHeight.textContent = `Height: ${data.height / 10} m`;
                    pokemonWeight.textContent = `Weight: ${data.weight / 10} kg`;
                    pokemonImage.src = data.sprites.front_default;

                    // Get Pokémon types
                    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
                    pokemonType.textContent = `Type(s): ${types}`;

                    // Show Pokémon info
                    pokemonInfo.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    pokemonNameDisplay.textContent = 'Pokémon not found.';
                    pokemonHeight.textContent = '';
                    pokemonWeight.textContent = '';
                    pokemonType.textContent = '';
                    pokemonImage.src = '';
                    pokemonInfo.style.display = 'block';
                });
        } else {
            pokemonNameDisplay.textContent = 'Please enter a Pokémon name.';
            pokemonHeight.textContent = '';
            pokemonWeight.textContent = '';
            pokemonType.textContent = '';
            pokemonImage.src = '';
            pokemonInfo.style.display = 'block';
        }
    });
});
