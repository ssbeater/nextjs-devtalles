import Link from "next/link";

import { Title } from "@/components";

export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <label htmlFor="names">Names</label>
            <input
              id="names"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="lastnames">Last names</label>
            <input
              id="lastnames"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="address-2">Address 2 (optional)</label>
            <input
              id="address-2"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="postal-code">Postal code</label>
            <input
              id="postal-code"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="country">Contry</label>
            <select id="country" className="p-2 border rounded-md bg-gray-200">
              <option value="">[ Seleccione ]</option>
              <option value="COL">Colombia</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex w-full sm:w-1/2 justify-center "
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
