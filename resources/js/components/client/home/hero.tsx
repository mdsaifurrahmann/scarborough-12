import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Hero = () => {
    return (
        <section className="hero relative min-h-[230px] lg:min-h-[650px]">
            <div className="relative container">
                <div className="bg-primary absolute top-[80px] z-10 hidden max-w-[200px] rounded-lg px-5 py-px break-words lg:-left-[40px] lg:block xl:-left-[80px]">
                    <span className="block text-[24px]">#sff2024 highlights</span>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    slidesPerView={1}
                    loop={true}
                    effect="fade"
                    speed={1500}
                    fadeEffect={{
                        crossFade: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        clickable: true,
                    }}
                >
                    {/* <div className="swiper-wrapper"> */}
                    <SwiperSlide>
                        <img src="./images/home/slide-03.jpg" loading="lazy" alt="Slider 01" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-01.jpg" loading="lazy" alt="Slider 02" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-02.jpg" loading="lazy" alt="Slider 03" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-04.jpg" loading="lazy" alt="Slider 03" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-05.jpg" loading="lazy" alt="Slider 03" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-06.jpg" loading="lazy" alt="Slider 03" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-07.jpg" loading="lazy" alt="Slider 03" />
                    </SwiperSlide>
                    {/* </div> */}
                </Swiper>
                <div className="swiper-pagination !-bottom-[3rem]"></div>
                <div className="swiper-navigation-container">
                    <div className="swiper-navigation button-prev relative -left-[6rem] cursor-pointer">
                        <ArrowLeft size={30} />
                    </div>
                    <div className="swiper-navigation button-next relative -right-[6rem] cursor-pointer">
                        <ArrowRight size={30} />
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-[5px] z-10 w-full overflow-x-hidden lg:bottom-[40px] lg:overflow-x-auto">
                <img src="./images/home/home-slider-wave.svg" alt="wave" loading="lazy" className="w-full scale-[1.1] transform lg:scale-[1]" />
            </div>
        </section>
    );
};

export default Hero;
