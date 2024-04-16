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
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress(address) {
        set({
          address: {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
            phone: address.phone,
          },
        });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
