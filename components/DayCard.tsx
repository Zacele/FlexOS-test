import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPen } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { format, isToday } from 'date-fns'
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

type DataCardProps = {
  currentDay: string
}

const DayCard: React.FC<DataCardProps> = ({ currentDay }) => {
  const carouselRef = React.useRef(null)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
  };

  return (
    <div className="w-full border rounded-lg border-[1px_solid_#CCCDFF] mb-6">
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
        <div className="flex items-center justify-between mr-2">
          <FontAwesomeIcon className={`mr-12 ${!isToday(new Date(currentDay)) ? "ml-[50%]" : ''} text-gray-500`} icon={faPen} />{" "}
          {isToday(new Date(currentDay))
            &&
            <div className="h-full p-1 text-indigo-700 transition-colors duration-150 border border-[#4F46E5] rounded focus:shadow-outline bg-[#F5F3FF] font-Inter flex hover:cursor-pointer items-center justify-center">
              <div className="bg-[#4F46E5] border p-2 flex items-center justify-center rounded h-full w-[54px]">
                <FontAwesomeIcon className='text-white' icon={faKey} />
              </div>
              <p className="mx-5 text-xl font-semibold font-Inter">Check In</p>
            </div>
          }
        </div>
      </div>

      <div className='mx-6 mt-6 bg-white'>
        <div className='flex items-center justify-between'>
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
            <div className='w-[95%] flex border border-[#E5E7EB] p-2 rounded-lg'>
              <Image width={120} height={90} src={'/images/Webinar.jpeg'} className='rounded' />
              <div className='flex flex-col ml-4'>
                <p className='font-Inter text-sm text-[#4F46E5] mb-2 pt-1'>17:00 - 18:30</p>
                <p className='text-base text-black font-Inter'>Improv Workshop: Spark your creativity</p>
              </div>
            </div>
            <div className='w-[95%] flex border border-[#E5E7EB] p-2 rounded-lg'>
              <Image width={120} height={90} src={'/images/Webinar.jpeg'} className='rounded' />
              <div className='flex flex-col ml-4'>
                <p className='font-Inter text-sm text-[#4F46E5] mb-2 pt-1'>17:00 - 18:30</p>
                <p className='text-base text-black font-Inter'>Improv Workshop: Spark your creativity</p>
              </div>
            </div>
            <div className='w-[95%] flex border border-[#E5E7EB] p-2 rounded-lg'>
              <Image width={120} height={90} src={'/images/Webinar.jpeg'} className='rounded' />
              <div className='flex flex-col ml-4'>
                <p className='font-Inter text-sm text-[#4F46E5] mb-2 pt-1'>17:00 - 18:30</p>
                <p className='text-base text-black font-Inter'>Improv Workshop: Spark your creativity</p>
              </div>
            </div>
            <div className='w-[95%] flex border border-[#E5E7EB] p-2 rounded-lg'>
              <Image width={120} height={90} src={'/images/Webinar.jpeg'} className='rounded' />
              <div className='flex flex-col ml-4'>
                <p className='font-Inter text-sm text-[#4F46E5] mb-2 pt-1'>17:00 - 18:30</p>
                <p className='text-base text-black font-Inter'>Improv Workshop: Spark your creativity</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
