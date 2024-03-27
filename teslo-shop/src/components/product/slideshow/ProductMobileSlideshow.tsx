"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./ProductSlideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export function ProductMobileSlideshow({ images, title, className }: Props) {
  return (
    <div className={className}>
      <Swiper
        style={{ width: "100vw", height: "500px" }}
        pagination
        autoplay={{ delay: 3500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              alt={img}
              src={`/products/${img}`}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
