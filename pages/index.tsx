import * as React from "react";
import type { NextPageContext } from "next";
import { ReactElement } from "react";
import Layout from "../components/Layout";
import { checkCookies, getCookie } from "cookies-next";
import { NextPageWithLayout } from "./_app";
import { useAppSelector, useAppDispatch } from "../hooks";
import type { AppDispatch } from '../redux/store'
import { logout, setToken } from "../redux/features/authSlice";
import { useGetMeQuery } from "../redux/apis/userApi";
import Router from "next/router";
import Image from "next/image";
import DayCard from '../components/DayCard'
import {
  daysInCurrentWeek, daysInNextWeek,
  daysInLastWeek
} from "../helpers";
import { format } from 'date-fns'
import Navbar from "../components/Navbar";

const NavigationButton: React.FC<{ children: React.ReactNode, onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }> = ({ children, onClick, disabled }) => {
  return (
    <button className="w-[40px] h-[40px] flex justify-center items-center border border-[#D1D5DB] rounded disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-gray-100" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

const Home: NextPageWithLayout = () => {
  const [skipFetchData, setSkipFetchData] = React.useState(true);
  const [currentWeek, setCurrentWeek] = React.useState<string[]>(daysInCurrentWeek())
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState<number>(0)
  const token = useAppSelector((state) => state.authState.token);
  const { isError: isFetchingUserError } = useGetMeQuery(null, { skip: skipFetchData });
  const dispatch: AppDispatch = useAppDispatch();

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

  React.useEffect(() => {
    if (currentWeekIndex === -1) {
      setCurrentWeek(daysInLastWeek())
    }
    if (currentWeekIndex === 1) {
      setCurrentWeek(daysInNextWeek())
    }
    if (currentWeekIndex === 0) {
      setCurrentWeek(daysInCurrentWeek())
    }
  }, [currentWeekIndex])

  const onNavigationWeek = (value: number) => {
    setCurrentWeekIndex(currentWeekIndex + value)
  }

  const displayTextHeader = React.useCallback(() => {
    return `${format(new Date(currentWeek[0]), 'LLL')} ${format(new Date(currentWeek[0]), 'dd')} - ${format(new Date(currentWeek[0]), 'LLL') === format(new Date(currentWeek[6]), 'LLL') ? '' : format(new Date(currentWeek[6]), 'LLL')} ${format(new Date(currentWeek[6]), 'dd')}`
  }, [currentWeek])

  return (
    <React.Fragment>

      <Navbar />
      <div className="w-screen h-screen mx-auto overflow-y-auto">
        <div className="container h-full mx-auto ">
          <div className="flex w-full justify-between align-middle mt-10 pb-4 mb-[22px] shadow-[0px_1px_0px_#E5E7EB] h-[72px]">
            <h3 className="text-2xl font-semibold leading-9 font-Inter">
              {displayTextHeader()}
            </h3>
            <div className="flex w-[8%] justify-between">
              <NavigationButton disabled={currentWeekIndex === -1} onClick={() => onNavigationWeek(-1)}>
                <Image src="/svg/arrow-left.svg" height={16} width={10} />
              </NavigationButton>
              <NavigationButton disabled={currentWeekIndex === 1} onClick={() => onNavigationWeek(1)}>
                <Image src="/svg/arrow-right.svg" height={16} width={10} />
              </NavigationButton>
            </div>
          </div>

          {currentWeek.map(day => {
            return <DayCard currentDay={day} key={day} />
          })}

        </div>
      </div >
    </React.Fragment>
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
