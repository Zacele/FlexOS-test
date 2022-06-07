import { NextPage, NextPageContext } from "next";
import React from "react";
import { useLoginUserMutation } from "../redux/apis/authApi";
import { checkCookies } from "cookies-next";
import Router from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  // API Login Mutation
  const [loginUser, { isLoading: isUpdating, error }] = useLoginUserMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser({ email, password }).unwrap();
    if (result.data) {
      Router.push("/");
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-bg1">

      <div className="w-full max-w-md px-16 py-10 m-auto bg-white border rounded-lg border-primaryBorder shadow-default">
        {error &&
          <div className="shadow-lg alert alert-error">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error?.data?.message || 'Something went wrong'}</span>
            </div>
          </div>
        }
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
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

          <div className="flex items-center justify-center mt-6">
            <button
              className="btn btn-outline btn-primary disabled:text-white disabled:cursor-not-allowed"
              disabled={email === "" || password === "" || isUpdating}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div >
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
