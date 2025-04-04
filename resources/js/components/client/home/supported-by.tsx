const SupportedBy = () => {
    return (
        <section className="5xl:min-h-[700px] relative mt-34 min-h-[400px] md:mt-40 md:min-h-[450px]">
            <div className="relative">
                <img
                    src="./images/home/support-wave.svg"
                    alt="wave"
                    loading="lazy"
                    className="5xl:-top-[12rem] 6xl:-top-[16rem] absolute -top-[6rem] -z-10 hidden w-full xl:-top-[7.6rem] xl:block"
                />
                <img
                    src="./images/home/support-wave-2.svg"
                    alt="wave"
                    loading="lazy"
                    className="absolute -top-[2rem] -z-10 block w-full transform md:-top-[7.5rem] xl:hidden"
                />
                <h2 className="section-title container mx-auto">supported by</h2>
            </div>

            <div className="container">
                <div className="6xl:mt-20 mt-14 flex flex-col items-center justify-center gap-12">
                    <img src="./images/home/sponsors-01.png" alt="sponsors" className="block w-full mix-blend-multiply" loading="lazy" />
                    <div className="flex w-full items-center justify-around md:w-8/12">
                        <div className="flex flex-col items-center justify-center gap-px">
                            <h5 className="text-[12px] md:text-[14px]">event partner</h5>
                            <img src="./images/home/e-partner.png" alt="event partner" className="w-[80px] md:w-[150px]" loading="lazy" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-px">
                            <h5 className="text-[12px] md:text-[14px]">creative partner</h5>
                            <img src="./images/home/c-partnet.png" alt="creative partner" className="w-[80px] md:w-[150px]" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportedBy;
