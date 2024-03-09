"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  decrementCount,
  incrementCount,
  initCounter,
} from "@/store/counter/counterSlice";

interface CartCounterProps {
  value: number;
}
interface CounterResponse {
  method: string;
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch("/api/counter").then((res) => res.json());
  return data;
};

export function CartCounter({ value = 0 }: CartCounterProps) {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(initCounter(value));
  // }, [dispatch, value])
  useEffect(() => {
    getApiCounter().then(({ count }) => {
      dispatch(initCounter(count));
    });
  }, [dispatch]);

  return (
    <>
      <span className="text-9xl">{count}</span>
      <div className="flex">
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(decrementCount())}
        >
          -1
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(incrementCount())}
        >
          +1
        </button>
      </div>
    </>
  );
}
