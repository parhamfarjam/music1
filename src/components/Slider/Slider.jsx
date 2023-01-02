import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

import './slider.css'
import { NavLink } from 'react-router-dom';

export default function Slider() {
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{clickable : true
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <NavLink to='/dashboard/songs'>
          <img src="https://i.scdn.co/image/ab6761610000e5ebc51d27bbd5a43ab60e6a75b1" />
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
        <NavLink to='/dashboard/songs'>
          <img src="https://www.ganja2music.com/Image/Post/07.91/Naser-Zeynali.jpg" />
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
        <NavLink to='/dashboard/songs'>
          <img src="https://i.scdn.co/image/ab6761610000e5ebbe5e780934c988c5bd6c7236" />
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
        <NavLink to='/dashboard/songs'>
          <img src="https://yt3.googleusercontent.com/ytc/AMLnZu-AZdwrtHP-UiGYB7ZjbgcvcJSCBf3ew5e83T1z=s900-c-k-c0x00ffffff-no-rj" />
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
        <NavLink to='/dashboard/songs'>
          <img src="https://i.scdn.co/image/ab67616d0000b273ec605292587c620460333d47" />
          </NavLink>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
