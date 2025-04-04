
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
const Hero = () => { 
    return (
            <section className="hero min-h-[230px] lg:min-h-[650px] relative">
        <div className="container relative">
            <div
                className="absolute hidden lg:block bg-primary px-5 py-px z-10 rounded-lg max-w-[200px] break-words top-[80px] lg:-left-[40px] xl:-left-[80px]">
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
                            nextEl: ".button-next",
                            prevEl: ".button-prev",
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                        }}
                    >
                {/* <div className="swiper-wrapper"> */}
                    <SwiperSlide>
                        <img src="./images/home/slide-03.jpg" loading="lazy" alt="Slider 01"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-01.jpg" loading="lazy" alt="Slider 02"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-02.jpg" loading="lazy" alt="Slider 03"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-04.jpg" loading="lazy" alt="Slider 03"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-05.jpg" loading="lazy" alt="Slider 03"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-06.jpg" loading="lazy" alt="Slider 03"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/home/slide-07.jpg" loading="lazy" alt="Slider 03"/>
                    </SwiperSlide>
                {/* </div> */}

            </Swiper>
            <div className="swiper-pagination !-bottom-[3rem]"></div>
            <div className=" swiper-navigation-container">
                <div className="swiper-navigation button-prev relative -left-[6rem] cursor-pointer">
                    <ArrowLeft size={30}/>
                </div>
                <div className="swiper-navigation button-next relative -right-[6rem] cursor-pointer">
                    <ArrowRight size={30}/>
                </div>
            </div>
        </div>

        <div
            className="absolute w-full bottom-[5px] lg:bottom-[40px] z-10 overflow-x-hidden lg:overflow-x-auto pointer-events-none">
            <img src="./images/home/home-slider-wave.svg" alt="wave" loading="lazy"
                className="w-full transform scale-[1.1] lg:scale-[1]"/>
        </div>
    </section>
    );
}

export default Hero;