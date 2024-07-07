import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPokemon } from "../../api/api";
import Toast from "../individual/Toast";

const Search = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    if (!pokemonName.trim()) {
      setShow(true)
      setIsLoading(false);
      return;
    } else {
      setShow(false)
    }
    try {
      const data = await searchPokemon(pokemonName);
      setIsLoading(false);
      console.log("Data fetched:", data);
      if (data) {
        navigate("/list", { state: { searchedPokemon: data } });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching Pokémon. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-8 mt-20 ">
      {show
        ? <Toast className={"bg-red-300"} message={"Pls Enter the pokemon name"} />
        : ""
      }
      <h1 className="text-3xl text-center font-bold mb-4 text-orange-600">
        Search Pokemon
      </h1>
      <div className="flex items-center md:flex-row flex-col gap-1 justify-between shadow-md rounded-md  w-[500px] m-auto">
        <input
          type="text"
          className="p-3 outline-none text-lg rounded-md  w-[400px]"
          placeholder="Search pokemon..."
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white p-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed "
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
    </div>
  );
};

export default Search;
