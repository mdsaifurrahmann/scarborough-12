const SupportedBy = () => { 
    return (
                        <section className="mt-34 md:mt-40 relative min-h-[400px] md:min-h-[450px] 5xl:min-h-[700px]">
        <div className="relative">
            <img src="./images/home/support-wave.svg" alt="wave" loading="lazy"
                className="hidden xl:block w-full -z-10 absolute -top-[6rem] xl:-top-[7.6rem] 5xl:-top-[12rem] 6xl:-top-[16rem]"/>
            <img src="./images/home/support-wave-2.svg" alt="wave" loading="lazy"
                className="block xl:hidden w-full -z-10 absolute -top-[2rem] md:-top-[7.5rem] transform"/>
            <h2 className="mx-auto section-title container">
                supported by
            </h2>
        </div>

        <div className="container">
            <div className="flex flex-col justify-center items-center gap-12 mt-14 6xl:mt-20">
                <img src="./images/home/sponsors-01.png" alt="sponsors" className="w-full block mix-blend-multiply"
                    loading="lazy"/>
                <div className="flex justify-around items-center w-full md:w-8/12">
                    <div className="flex flex-col justify-center items-center gap-px">
                        <h5 className="text-[12px] md:text-[14px]">event partner</h5>
                        <img src="./images/home/e-partner.png" alt="event partner" className="w-[80px] md:w-[150px]"
                            loading="lazy"/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-px">
                        <h5 className="text-[12px] md:text-[14px]">creative partner</h5>
                        <img src="./images/home/c-partnet.png" alt="creative partner"
                            className="w-[80px] md:w-[150px]" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
            </section>
    );
}

export default SupportedBy;