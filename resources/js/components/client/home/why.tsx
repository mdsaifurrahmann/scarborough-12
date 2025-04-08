const Why = () => {
    return (
        <section className="why relative my-12 min-h-[900px] overflow-hidden md:min-h-[1000px] xl:min-h-[1100px]">
            <div className="z-10 container">
                <h2 className="section-title">why Scarborough?</h2>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center md:relative">
                        <div className="border-primary mx-auto h-[90%] w-[90%] overflow-hidden rounded-xl border-3 lg:h-[568px] lg:w-[590px]">
                            <img src="./images/home/map.jpg" alt="map" loading="lazy" className="h-full w-full object-cover" />
                        </div>
                        <div className="bg-primary relative bottom-[4rem] min-h-[327px] w-[285px] rounded-xl p-8 shadow-md md:absolute md:right-[5rem] md:-bottom-[5.5rem] lg:right-[2rem] lg:text-right xl:-right-[5.5rem] xl:-bottom-[13rem]">
                            <div className="overflow-hidden break-words">
                                <p className="font-ysabeau relative z-10 text-xl">
                                    Scarborough is a vibrant hub of cultural diversity, natural beauty, and community spirit. With stunning parks,
                                    dynamic neighborhoods, and a rich blend of traditions, it offers the perfect backdrop to celebrate art, music, and
                                    togetherness at the Scarborough Folk Festival.
                                </p>
                            </div>

                            <img
                                src="./images/home/root-02.svg"
                                alt="root-02"
                                loading="lazy"
                                className="translate absolute -right-[0.5rem] -bottom-[6rem] -z-10 scale-[1.35] lg:-right-[4.5rem] lg:-bottom-[9rem] lg:scale-[2]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <img
                src="./images/home/wave-3.svg"
                alt="wave-3"
                className="absolute -z-10 hidden w-full lg:bottom-[40rem] lg:block xl:bottom-[24rem]"
                loading="lazy"
            />
        </section>
    );
};

export default Why;
