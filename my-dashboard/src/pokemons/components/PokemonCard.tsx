"use client";

import Link from "next/link";
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "@/store";
import { toogleFavorite } from "@/store/pokemons/pokemonsSlice";

import { SimplePokemon } from "../interfaces/simple-pokemon";

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { id, name } = pokemon;
  const isFavorite = useAppSelector((state) => !!state.pokemons.favorites[id]);
  const dispatch = useAppDispatch();

  function onToogleFAV() {
    dispatch(toogleFavorite(pokemon));
  }

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className=" flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            height={0}
            width={0}
            sizes="100vh"
            className="w-auto h-28"
            priority={false}
            alt={name}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>
          <div className="mt-5">
            <Link
              href={`/dashboard/pokemons/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              More info
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div
            onClick={onToogleFAV}
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          >
            <div className="text-red-600">
              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? "Its favorite" : "Add to favorites"}
              </p>
              <p className="text-xs text-gray-500">Click to change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
