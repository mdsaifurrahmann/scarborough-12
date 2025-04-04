const Why = () => {
    return (

        <section className="min-h-[900px] md:min-h-[1000px] xl:min-h-[1100px] overflow-hidden relative my-12 why">
            <div className="container z-10">
                <h2 className="section-title">why Scarborough?</h2>
                <div className="flex justify-center items-center">
                    <div className="md:relative flex justify-center items-center flex-col">
                        <div
                            className="h-[90%] w-[90%] mx-auto lg:h-[568px] lg:w-[590px] border-3 border-primary rounded-xl overflow-hidden">
                            <img src="./images/home/map.jpg" alt="map" loading="lazy"
                                className="w-full h-full object-cover" />
                        </div>
                        <div
                            className="relative bottom-[4rem] md:absolute w-[285px] min-h-[327px] bg-primary lg:text-right p-8 rounded-xl  md:right-[5rem] lg:right-[2rem] md:-bottom-[5.5rem]  xl:-right-[5.5rem] xl:-bottom-[13rem] shadow-md">
                            <div className="break-words overflow-hidden">
                                <p className="relative z-10 font-ysabeau text-xl">Scarborough is a vibrant hub of cultural diversity, natural beauty, and community spirit. With stunning parks, dynamic neighborhoods, and a rich blend of traditions, it offers the perfect backdrop to celebrate art, music, and togetherness at the Scarborough Folk Festival.</p>
                            </div>

                            <img src="./images/home/root-02.svg" alt="root-02" loading="lazy"
                                className="absolute translate scale-[1.35] -z-10 -bottom-[6rem] -right-[0.5rem] lg:scale-[2] lg:-bottom-[9rem] lg:-right-[4.5rem]" />
                        </div>

                    </div>
                </div>
            </div>
            <img src="./images/home/wave-3.svg" alt="wave-3"
                className="hidden lg:block w-full absolute -z-10 lg:bottom-[40rem] xl:bottom-[24rem]" loading="lazy" />
        </section>

    );
}

export default Why;