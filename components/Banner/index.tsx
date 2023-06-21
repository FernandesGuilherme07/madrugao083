import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles.module.css';
import { Autoplay } from 'swiper';

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
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideImg}>
                    <img src={"/temp/banner1.png"} alt="Catagolo de promoção" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideImg}>
                    <img src={"/temp/banner2.png"} alt="Catagolo de promoção" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}