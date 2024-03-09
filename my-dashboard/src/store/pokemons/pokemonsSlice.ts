import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SimplePokemon } from "@/pokemons";

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon };
}

const initialState: PokemonsState = {
  favorites: {},
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFavorites(
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>
    ) {
      state.favorites = action.payload;
    },
    toogleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const { id } = action.payload;

      if (!!state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = action.payload;
      }

      // ! Must not be here
      localStorage.setItem(
        "favorites-pokemons",
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const { setFavorites, toogleFavorite } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
