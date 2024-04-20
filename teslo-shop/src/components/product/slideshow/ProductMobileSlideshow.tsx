"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "@/components";

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
        {images.length === 0 && (
          <SwiperSlide>
            <ProductImage
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        )}
        {images.map((img) => (
          <SwiperSlide key={img}>
            <ProductImage
              alt={img}
              src={img}
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
