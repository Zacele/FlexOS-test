import { NextPage, NextPageContext } from "next";
import React from "react";
import { useLoginUserMutation } from "../redux/apis/authApi";
import { checkCookies } from "cookies-next";
import Router from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = React.useState<string>("testuser@flexos.com");
  const [password, setPassword] = React.useState<string>("password");
  // API Login Mutation
  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser({ email, password }).unwrap();
    if (result.data) {
      Router.push("/");
    }
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              value={email}
              placeholder="Your Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              value={password}
              placeholder="Your Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className="btn btn-outline btn-primary disabled:text-white disabled:cursor-not-allowed"
              disabled={email === "" || password === ""}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }: NextPageContext) {
  const tokenInCookie = checkCookies("token", { req, res });
  if (tokenInCookie) {
    res?.writeHead(303, { Location: "/" });
    res?.end();
  }

  return { props: {} };
}

export default Login;
