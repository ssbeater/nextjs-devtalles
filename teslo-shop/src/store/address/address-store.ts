import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Address } from "@/interfaces";

interface State {
  address: Address;
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress(address) {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
