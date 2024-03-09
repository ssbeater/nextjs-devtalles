import { Metadata } from "next";
import { FavoritePokemons } from "@/pokemons/components/FavoritePokemons";

export const metadata: Metadata = {
  title: "Pokemons",
  description: "List of pokemons",
};

export default async function PokemonPage() {

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl my-2">
        Favorite Pokemons <small className="text-blue-500">Global State</small>
      </span>
      <FavoritePokemons />
    </div>
  );
}