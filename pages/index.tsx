import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default Home;
