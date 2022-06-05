import * as React from "react";
import type { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import { ReactElement } from "react";
import Layout from "../components/Layout";
import { checkCookies, getCookie } from "cookies-next";
import { NextPageWithLayout } from "./_app";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setToken } from "../redux/features/authSlice";

const Home: NextPageWithLayout = () => {
  const token = useAppSelector((state) => state.authState.token);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const tokenInCookie = getCookie("token");

    if (!token) {
      dispatch(setToken(tokenInCookie));
    }
  }, []);

  return (
    <div className="w-full h-full p-4 m-8 overflow-y-auto">
      <div className="flex items-center w-full justify-center p-40 border-4 border-dotted">
        <h1 className="text-3xl font-Inter font-bold underline">
          Hello world!
        </h1>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export async function getServerSideProps({ req, res }: NextPageContext) {
  const tokenInCookie = checkCookies("token", { req, res });
  if (!tokenInCookie) {
    res?.writeHead(303, { Location: "/login" });
    res?.end();
  }

  return { props: {} };
}
