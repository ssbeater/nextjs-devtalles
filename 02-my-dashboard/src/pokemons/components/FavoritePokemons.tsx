"use client";

import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";

export function FavoritePokemons() {
  const favPokemons = useAppSelector((state) => Object.values(state.pokemons.favorites));
  // const [pokemons, setPokemons] = useState(favPokemons);

  // useEffect(() => {
  //   setPokemons(favPokemons)
  // }, [favPokemons]);

  if (favPokemons.length === 0) return <NoFavorites />;

  return <PokemonGrid pokemons={favPokemons} />;
}

export function NoFavorites() {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>There are not favorites</span>
    </div>
  );
}
