"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from ".";
import { setFavorites } from "./pokemons/pokemonsSlice";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites-pokemons") ?? "{}");
    store.dispatch(setFavorites(favorites ?? "{}"));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
