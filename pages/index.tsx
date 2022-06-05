import * as React from "react";
import type { NextPageContext } from "next";
import { ReactElement } from "react";
import Layout from "../components/Layout";
import { checkCookies, getCookie } from "cookies-next";
import { NextPageWithLayout } from "./_app";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout, setToken } from "../redux/features/authSlice";
import { useGetMeQuery } from "../redux/apis/userApi";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPen } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home: NextPageWithLayout = () => {
  const [skipFetchData, setSkipFetchData] = React.useState(true);
  const token = useAppSelector((state) => state.authState.token);
  const carouselRef = React.useRef(null)
  const { isError: isFetchingUserError } = useGetMeQuery(null, {
    skip: skipFetchData,
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const tokenInCookie = getCookie("token");

    if (!token) {
      dispatch(setToken(tokenInCookie));
      setSkipFetchData(false);
    }

    if (isFetchingUserError) {
      dispatch(logout);
      Router.push("/login");
    }
  }, []);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
  };

  return (
    <div className="container mx-auto">
      <div className="w-full h-full overflow-y-auto">
        <div className="flex w-full justify-between align-middle mt-10 pb-4 mb-3 shadow-[0px_1px_0px_#E5E7EB] h-[72px]">
          <h3 className="text-2xl font-semibold leading-9 font-Inter">
            January 18 - 24
          </h3>
          <div className="flex w-[10%] justify-between">
            <button className="btn btn-outline btn-accent">
              <Image src="/svg/arrow-left.svg" height={16} width={10} />
            </button>
            <button className="btn btn-outline btn-accent">
              <Image src="/svg/arrow-right.svg" height={16} width={10} />
            </button>
          </div>
        </div>

        {/* CARD COMPONENT */}
        <div className="w-full border rounded-lg border-[1px_solid_#CCCDFF]">
          <div className="bg-[#F5F3FF] w-full shadow-[0px_1px_0px_#CCCDFF] p-3 flex justify-between">
            <div className="flex">
              <div className="flex flex-col px-2 mt-1 text-center">
                <p className="font-Inter leading-3 text-2xs text-[#4F46E5] uppercase">
                  Jan
                </p>
                <p className="font-Inter leading-8 font-semibold text-4xl text-[#4F46E5]">
                  18
                </p>
              </div>
              <div className="flex flex-col ml-2">
                <p className="font-Inter font-semibold text-xl text-[#1F2937]">
                  🏢 Office: Airport Office
                </p>
                <p className="font-Inter leading-8 text-sm text-[#6B7280] mt-1">
                  Today
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mr-2">
              <FontAwesomeIcon className="mr-12 text-gray-500" icon={faPen} />{" "}
              <div className="h-full p-1 text-indigo-700 transition-colors duration-150 border border-[#4F46E5] rounded focus:shadow-outline bg-[#F5F3FF] font-Inter flex hover:cursor-pointer items-center justify-center">
                <div className="bg-[#4F46E5] border p-2 flex items-center justify-center rounded h-full w-[54px]">
                  <FontAwesomeIcon fill={"#ffffff"} className='text-white' icon={faKey} />
                </div>
                <p className="mx-5 text-xl font-semibold font-Inter">Check In</p>
              </div>
            </div>
          </div>

          <div className='mx-6 mt-6 bg-white'>
            <div className='flex justify-between'>
              <p className='font-Inter'>Events</p>
              <div className="flex w-[10%] justify-between">
                <button className="btn btn-ghost" onClick={() => {
                  carouselRef.current?.previous();
                }}>
                  <Image src="/svg/arrow-left.svg" height={16} width={10} />
                </button>
                <button className="btn btn-ghost" onClick={() => {
                  carouselRef.current?.next()
                }}>
                  <Image src="/svg/arrow-right.svg" height={16} width={10} />
                </button>
              </div>
            </div>
            <div className='mt-4'>
              <Carousel
                ref={carouselRef}
                responsive={responsive}
                swipeable={false}
                infinite={true}
                arrows={false}
                autoPlaySpeed={10000000}
                draggable={false}>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
              </Carousel>
            </div>
          </div>
        </div>
        {/* CARD COMPONENT */}
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
