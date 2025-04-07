import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./styles.module.css";
import { Autoplay } from "swiper";
// import banerImg from "assets/baner.png";

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
        className={styles.swiper}
      >
        <SwiperSlide>
          <div className={styles.slide}>
            <img
              src={"assets/baner.png"}
              alt="Banner Image"
              className={styles.slideImg}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <img
              src={"assets/baner.png"}
              alt="Banner Image"
              className={styles.slideImg}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
