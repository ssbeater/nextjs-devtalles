// "use client"

import { getCookie, hasCookie, setCookie } from "cookies-next";

/* 
cookie: cart
{
  "uuid-123-1": 4,
  "uuid-123-2": 1,
  "uuid-123-3": 2,
}
*/

export function getCookieCart(): { [id: string]: number } {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
}

export function addProductToCart(id: string) {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
}

export function deleteProductFromCart(id: string) {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie("cart", JSON.stringify(cookieCart));
}

export function removeSingleItemFromCart(id: string) {
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie("cart", JSON.stringify(cookieCart));
}
