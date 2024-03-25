import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hello World</h1>
    </>
  );
}
