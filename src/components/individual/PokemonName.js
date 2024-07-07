import React from "react";

const PokemonName = ({ pokemonDetails, toggleBookmark, isBookmarked }) => {
  return (
    <div className="relative">
      <div
        className="absolute left-2 top-2  cursor-pointer border p-2 border-red-400 rounded-md text-xs bg-white"
        onClick={toggleBookmark}
      >
        {!isBookmarked ? "Add To Favourite" : "remove To Favourite"}
      </div>

      <div className="flex flex-col items-center">
        <div className="absolute right-2 top-2  rounded-lg w-12 text-black bg-white ">
          # {pokemonDetails.order}
        </div>
        <h1 className="text-3xl font-semibold my-8 text-orange-600 ">
          <span className="border-2 px-3 text-sm bg-white border-white p-2 ">{pokemonDetails.name}</span>
        </h1>
        <div className="flex flex-col md:flex-row md:gap-20 items-center">
          <div className="image-div">
            <img
              src={pokemonDetails.sprites.other.dream_world.front_default}
              alt={pokemonDetails.name}
              className="mx-auto h-40 w-40 image-border"
            />
          </div>

          <div className="image-div">
            <img
              src={pokemonDetails.sprites.other.showdown.front_shiny}
              alt={pokemonDetails.name}
              className="mx-auto h-28 w-40 "
            />
          </div>
          <div className="image-div">
            <img
              src={pokemonDetails.sprites.other.home.front_shiny}
              alt={pokemonDetails.name}
              className="mx-auto h-40 w-40  image-border"
            />
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 mt-4">
          {pokemonDetails.types.map((type, index) => (
            <li
              key={index}
              className="text-white bg-orange-400 px-2 py-1 rounded-md"
            >
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonName;
