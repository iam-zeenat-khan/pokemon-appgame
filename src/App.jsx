import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch Pokémon Data
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        // Fetch individual Pokémon data for more detailed info (like images)
        const fetchPokemons = data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
        
        Promise.all(fetchPokemons).then((results) => {
          setPokemonList(results);
        });
      });
  }, []);
  
  // Handle Search Input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter Pokémon based on the search term
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
