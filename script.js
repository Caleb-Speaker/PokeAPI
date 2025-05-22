async function fetchPokemon() {
  const input = document.getElementById('pokemonInput').value.trim().toLowerCase();
  const infoDiv = document.getElementById('pokemonInfo');
  const errorDiv = document.getElementById('error');
  infoDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (!input) {
    errorDiv.textContent = 'Please enter a Pokémon name or ID.';
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }

    const data = await response.json();
    const name = data.name;
    const image = data.sprites.front_default;
    const types = data.types.map(t => t.type.name).join(', ');

    infoDiv.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src="${image}" alt="${name}">
      <p><strong>Type:</strong> ${types}</p>
    `;
  } catch (error) {
    errorDiv.textContent = 'Pokémon not found. Please check the name or ID.';
  }
}