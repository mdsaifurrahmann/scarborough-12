const Roots = () => {
    return (
        <section
            className="root 6xl:min-h-[1000px] min-h-[700px] bg-no-repeat lg:min-h-[800px]"
            style={{ backgroundImage: 'url("./images/home/root.svg")' }}
        >
            <div className="container">
                <h2 className="4xl:w-1/5 section-title root-title mx-auto w-4/6 md:w-3/6 lg:w-2/6 2xl:w-2/6">connecting roots</h2>
                <div className="card mx-auto w-2/6">
                    <p className="font-ysabeau text-[22px] leading-[1.2]">
                        Scarborough Folk Fest unites cultures through the timeless power of folk music. Blending traditions from around the world, it
                        creates a shared rhythm that connects communities, generations, and histories—celebrating the roots that bind us all.
                    </p>
                </div>
                <div className="4xl:w-6/10 4xl:mx-auto mt-[6rem] flex w-full flex-col items-center justify-center md:mt-[10rem] xl:mt-[17rem]">
                    <span className="inline-block">initiative of</span>

                    <a href="http://www.paramparacanada.ca" target="_blank">
                        <img
                            src="./images/parampara.png"
                            alt="parampara"
                            loading="lazy"
                            className="relative -top-[2.5rem] ml-[1.5rem] w-[150px] md:-top-[3.5rem] md:ml-[3rem] md:w-[200px]"
                        />
                    </a>

                    <p className="font-ysabeau px-4 text-center text-xl leading-[1.2] 2xl:px-20">
                        As the visionary force behind Scarborough Folk Fest, Parampara Canada is dedicated to preserving and celebrating cultural
                        heritage through music and the arts. Rooted in tradition yet embracing diversity, it creates a platform where global folk
                        traditions unite, fostering connection, community, and a shared appreciation htmlFor our rich, collective history.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Roots;
