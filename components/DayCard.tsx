import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPen } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { format, isToday } from 'date-fns'
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import useAxios from 'axios-hooks'
import axios from 'axios'
import { getCookie } from "cookies-next";
import { Event } from "../types/eventTypes";

type DataCardProps = {
  currentDay: string,
}

const DayCard: React.FC<DataCardProps> = ({ currentDay }) => {
  axios.interceptors.request.use(
    async (config) => {
      const tokenInCookie = getCookie("token");

      if (tokenInCookie) {
        config.headers = {
          authorization: `Bearer ${tokenInCookie}`
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const carouselRef = React.useRef<Carousel>(null)

  const [{ data: eventsData, loading, error }, refetch] = useAxios(
    `${process.env.API_URL}events?date=${currentDay}`
  )

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
  };

  return (
    <div className={`w-full border rounded-lg border-[1px_solid_#CCCDFF] mb-6 ${eventsData?.data.length > 0 ? 'pb-6' : ''}`}>
      <div className={`${isToday(new Date(currentDay)) ? 'bg-[#F5F3FF]' : 'bg-[#F3F4F6]'} ${isToday(new Date(currentDay)) ? 'shadow-[0px_1px_0px_#CCCDFF]' : 'shadow-none'} w-full p-3 flex justify-between`}>
        <div className="flex">
          <div className="flex flex-col px-2 mt-1 text-center">
            <p className="font-Inter leading-3 text-2xs text-[#4F46E5] uppercase">
              {format(new Date(currentDay), 'LLL')}
            </p>
            <p className="font-Inter leading-8 font-semibold text-4xl text-[#4F46E5] mt-2">
              {format(new Date(currentDay), 'dd')}
            </p>
          </div>
          <div className="flex flex-col ml-2">
            <p className="font-Inter font-semibold text-xl text-[#1F2937]">
              Office: Airport Office
            </p>
            <p className="font-Inter leading-8 text-sm text-[#6B7280] mt-1">
              Today
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mr-2 collapse">
          <label htmlFor='skip-modal'>
            <FontAwesomeIcon className={`mr-12 ${!isToday(new Date(currentDay)) ? "ml-[50%]" : ''} text-gray-500 hover:cursor-pointer`} icon={faPen} />{" "}
          </label>
          <input type="checkbox" id='skip-modal' className="hidden modal-toggle" />
          <label htmlFor='skip-modal' className="cursor-pointer modal">
            <label className="relative modal-box" htmlFor='skip-modal'>
              <h3 className="text-lg font-bold">Disabled!</h3>
              <p className="py-4">Disabled for now. Discussed with Modestas in email.</p>
            </label>
          </label>
          {isToday(new Date(currentDay))
            &&
            <label htmlFor='skip-modal' className='h-full p-1 text-indigo-700 transition-colors duration-150 border border-[#4F46E5] rounded focus:shadow-outline bg-[#F5F3FF] font-Inter  hover:cursor-pointer'>
              <div className="flex items-center justify-center h-full">
                <div className="bg-[#4F46E5] border p-2 flex items-center justify-center rounded h-full w-[54px]">
                  <FontAwesomeIcon className='text-white' icon={faKey} />
                </div>
                <p className="mx-5 text-xl font-semibold font-Inter">Check In</p>
              </div>
            </label>
          }
        </div>
      </div>

      {
        eventsData?.data.length > 0 &&
        <React.Fragment>
          <div className='mx-6 mt-6 bg-white'>
            <div className='flex items-center justify-between'>
              <p className='font-Inter'>Events</p>
              {eventsData?.data.length > 1 &&
                <div className="flex w-[10%] justify-between">
                  <button className="btn btn-ghost" aria-label="Last week" title="Last week" onClick={() => {
                    carouselRef.current?.previous(2);
                  }}>
                    <Image src="/svg/arrow-left.svg" height={16} width={10} />
                  </button>
                  <button className="btn btn-ghost" aria-label="Next week" title="Nextb week" onClick={() => {
                    carouselRef.current?.next(2)
                  }}>
                    <Image src="/svg/arrow-right.svg" height={16} width={10} />
                  </button>
                </div>
              }
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
              {eventsData?.data.map((event: Event) => (
                <React.Fragment key={event.id}>
                  <div className='w-[90%] ml-[4%] flex border border-[#E5E7EB] p-2 rounded-lg'>
                    <Image width={120} height={90} src={event.image[0].preview_thumbnail} className='rounded' />
                    <div className='flex flex-col ml-4'>
                      <p className='font-Inter text-sm text-[#4F46E5] mb-2 pt-1'>{event.starts} - {event.ends}</p>
                      <p className='text-base text-black font-Inter'>{event.name}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </Carousel>
          </div>
        </React.Fragment>
      }
    </div >

  );
};

export default DayCard;
