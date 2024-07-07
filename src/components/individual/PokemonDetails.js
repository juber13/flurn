import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../../api/api";
import Toast from "./Toast";
import PokemonName from "./PokemonName";
import PokemonDesc from "./PokemonDesc";
import PokemonStats from "./PokemonStats";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchPokemonDetails(id);
        setPokemonDetails(response);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((bookmark) => bookmark !== id)
      : [...bookmarks, id];
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked); // Update isBookmarked state here
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="p-8 rounded-lg relative bg-orange-200 text-center md:max-w-4xl w-full mx-auto mt-8">
      {showToast && (
        <Toast
          message={
            isBookmarked
              ? "Added to favorites ❤️"
              : "Removed from favorites"
          }
          className={
            isBookmarked
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }
        />
      )}
      {pokemonDetails && (
        <>
          <PokemonName
            pokemonDetails={pokemonDetails}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <PokemonDesc pokemonDetails={pokemonDetails} />
            <PokemonStats pokemonDetails={pokemonDetails} />
          </div>
        </>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default PokemonDetails;
