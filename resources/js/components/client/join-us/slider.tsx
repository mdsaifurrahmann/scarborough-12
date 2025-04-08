import { Link } from '@inertiajs/react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = () => {
    return (
        <section className="my-4 overflow-hidden">
            <div className="mx-auto" id="joinus">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={8}
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
                        },
                    }}
                >
                    <SwiperSlide className="!w-[272px]">
                        <h3 className="text-center text-2xl">artist</h3>
                        <div className="card-bg border-primary flex h-[700px] flex-col items-center justify-between gap-4 rounded-lg border p-4">
                            <div className="mt-6">
                                <img src="./images/join-us/artist.svg" alt="artist" className="w-full" loading="lazy" />
                            </div>
                            <div className="mb-6">
                                <p className="font-ysabeau text-xl">
                                    Showcase your talent at Scarborough Folk Fest! Share your music, art, and cultural expressions with a diverse
                                    audience. Be part of a global celebration of creativity and tradition.
                                </p>
                            </div>
                            <div className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="block w-full rounded-lg border border-white px-6 py-2 text-center bg-white hover:bg-transparent"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="!w-[272px]">
                        <h3 className="text-center text-2xl">volunteer</h3>
                        <div className="card-bg border-primary flex h-[700px] flex-col items-center justify-between gap-4 rounded-lg border p-4">
                            <div className="mt-6">
                                <img src="./images/join-us/volunteer.svg" alt="volunteer" className="w-full" loading="lazy" />
                            </div>
                            <div className="mb-6">
                                <p className="font-ysabeau text-xl">
                                    Be part of the festival magic! Join as a volunteer to help create an unforgettable cultural experience. Connect
                                    with artists, organizers, and the community while making a difference.
                                </p>
                            </div>
                            <div className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="block w-full rounded-lg border border-white px-6 py-2 text-center bg-white hover:bg-transparent"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="!w-[272px]">
                        <h3 className="text-center text-2xl">vendor</h3>
                        <div className="card-bg border-primary flex h-[700px] flex-col items-center justify-between gap-4 rounded-lg border p-4">
                            <div className="mt-6">
                                <img src="./images/join-us/v.svg" alt="vendor" className="w-full" loading="lazy" />
                            </div>
                            <div className="mb-6">
                                <p className="font-ysabeau text-xl">
                                    Bring your unique products to a global audience! Apply as a vendor to share your crafts, food, or merchandise.
                                    Engage with festival-goers and expand your reach in a vibrant setting.
                                </p>
                            </div>
                            <div className="w-full">
                                <Link
                                    href={route('apply-vendor')}
                                    className="block w-full rounded-lg border border-white px-6 py-2 text-center bg-white hover:bg-transparent"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="!w-[272px]">
                        <h3 className="text-center text-2xl">sponsor</h3>
                        <div className="card-bg border-primary flex h-[700px] flex-col items-center justify-between gap-4 rounded-lg border p-4">
                            <div className="mt-6">
                                <img src="./images/join-us/sponsor.svg" alt="sponsor" className="w-full" loading="lazy" />
                            </div>
                            <div className="mb-6">
                                <p className="font-ysabeau text-xl">
                                    Support a world-className cultural event! Partner with us to celebrate diversity and foster community connections.
                                    Gain visibility while making a meaningful impact on cultural enrichment.
                                </p>
                            </div>
                            <div className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="block w-full rounded-lg border border-white px-6 py-2 text-center bg-white hover:bg-transparent"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default Slider;
