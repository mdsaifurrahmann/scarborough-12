import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';

import 'swiper/css';
import { Link } from '@inertiajs/react';

const JoinUs = () => {
    return (
        <section className="mt-32 min-h-[32rem] overflow-hidden">
            <h3 className="section-title pb-20">Join Us</h3>
            <div className="relative">
                <div className="">
                    <img src="./images/line-graph.png" alt="" className="w-full" loading='lazy' />
                </div>
                <div className="join-us">
                    <div className="mt-4 lg:mt-0 mb-20 mx-auto overflow-hidden">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={60}
                            centeredSlides={true}
                            cssMode={true}
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    centeredSlides: false,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {/* <div className="swiper-wrapper"> */}
                            <SwiperSlide>
                                <h3 className="title">SPONSOR</h3>
                                <Link href={route('join-us')}>
                                    <div className="card">
                                        <p className="leading-[1.2] font-ysabeau text-xl">
                                            Support the festival and make an impact! Become a sponsor
                                            and help bring Scarborough's cultural celebration to life.
                                        </p>
                                        <div className="flex justify-end">
                                            <span className="w-8 ml-auto">
                                                <ChevronRight size={30} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <h3 className="title">Artist</h3>
                                <Link href={route('join-us')}>
                                    <div className="card">
                                        <p className="leading-[1.2] font-ysabeau text-xl">
                                            Showcase your talent on a vibrant stage. Apply now to
                                            perform and share your art with the community!
                                        </p>
                                        <div className="flex justify-end">
                                            <span className="w-8 ml-auto">
                                                <ChevronRight size={30} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <h3 className="title">Vendor</h3>
                                <Link href={route('apply-vendor')}>
                                    <div className="card">
                                        <p className="leading-[1.2] font-ysabeau text-xl">
                                            Bring your unique goods to the heart of the festival. Join
                                            us as a vendor and connect with a diverse audience!
                                        </p>
                                        <div className="flex justify-end">
                                            <span className="w-8 ml-auto">
                                                <ChevronRight size={30} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <h3 className="title">Volunteer</h3>
                                <Link href={route('join-us')}>
                                    <div className="card">
                                        <p className="leading-[1.2] font-ysabeau text-xl">
                                            Be a part of the action! Volunteer with us and help create
                                            unforgettable festival experiences.
                                        </p>
                                        <div className="flex justify-end">
                                            <span className="w-8 ml-auto">
                                                <ChevronRight size={30} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            {/* </div> */}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default JoinUs;