import React, { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../../api/api";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrLinkPrevious } from "react-icons/gr";

const MyFav = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const pokemonDetailsPromises = bookmarks.map((id) =>
        fetchPokemonDetails(id)
      );
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setFavoritePokemons(pokemonDetails);
    };

    fetchFavoritePokemons();
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favoritePokemons.filter((pokemon) => pokemon.id !== id);
    setFavoritePokemons(updatedFavorites);
    const updatedBookmarks = updatedFavorites.map((pokemon) => pokemon.id);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">Bookmarked!</h2>
        {favoritePokemons.length === 0 ? (
          <p className="text-center text-gray-600 text-2xl font-bold mb-4">
            Nothing to show now
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-orange-200 p-4">
            {favoritePokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <p className="text-center font-semibold uppercase">
                  {pokemon.name}
                </p>
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto mb-2"
                />

                <ul className="flex flex-wrap justify-center items-center gap-2">
                  {pokemon.types.map((type, index) => (
                    <li
                      key={index}
                      className="text-white bg-black px-2 py-1 rounded-md text-xs bg-orange-500"
                    >
                      {type.type.name}
                    </li>
                  ))}
                </ul>
                <button
                  className="block mx-auto mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600"
                  onClick={() => removeFavorite(pokemon.id)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Link className="m-8 flex items-center gap-4 bg-orange-600 p-2 rounded-md shadow-md text-white" to="/">
          <GrLinkPrevious />
          Go to Home Page
        </Link>
      </div>
    </>
  );
};

export default MyFav;
