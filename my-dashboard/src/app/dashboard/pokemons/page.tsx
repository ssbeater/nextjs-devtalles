import { Metadata } from "next";
import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  // throw new Error("This should not happen");
  // throw notFound();

  return pokemons;
};

export const metadata: Metadata = {
  title: "Pokemons",
  description: "List of pokemons",
};

export default async function PokemonPage() {
  const pokemons = await getPokemons(156);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl my-2">
        Pokemons List <small className="text-blue-500">static</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
