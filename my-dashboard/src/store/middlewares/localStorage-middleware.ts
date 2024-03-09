import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {
    const result = next(action);
    const { pokemons } = state.getState();
    localStorage.setItem("favorites-pokemons", JSON.stringify(pokemons));
    return result;
  };
};
