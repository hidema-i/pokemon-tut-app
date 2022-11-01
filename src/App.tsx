import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  //pokemonを配列で保持
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //axiosで取得したデータを一度だけとる
  useEffect(() => {
    //非同期処理
    const getpokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit-20&offset-20"
      );
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
      });
    };
    getpokemon();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> Pokemon</header>
        <PokemonCollection pokemons={pokemons} />
      </div>
    </div>
  );
};

export default App;
