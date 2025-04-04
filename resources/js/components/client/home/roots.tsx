const Roots = () => {
    return (
        <section className="root bg-no-repeat min-h-[700px] lg:min-h-[800px] 6xl:min-h-[1000px]" style={{ backgroundImage: 'url("./images/home/root.svg")' }}>
            <div className="container">
                <h2 className="w-4/6 md:w-3/6 lg:w-2/6 2xl:w-2/6 4xl:w-1/5 mx-auto section-title root-title">
                    connecting roots
                </h2>
                <div className="w-2/6 mx-auto card">
                    <p className="leading-[1.2] font-ysabeau text-[22px]">
                        Scarborough Folk Fest unites cultures through the timeless power of folk music. Blending traditions
                        from around the
                        world, it creates a shared rhythm that connects communities, generations, and histories—celebrating
                        the roots that bind
                        us all.
                    </p>
                </div>
                <div
                    className="flex justify-center items-center flex-col w-full 4xl:w-6/10 4xl:mx-auto mt-[6rem] md:mt-[10rem] xl:mt-[17rem]">
                    <span className="inline-block">initiative of</span>

                    <a href="http://www.paramparacanada.ca" target="_blank">
                        <img src="./images/parampara.png" alt="parampara" loading="lazy"
                            className="w-[150px] md:w-[200px] ml-[1.5rem] md:ml-[3rem] -top-[2.5rem] md:-top-[3.5rem] relative" />
                    </a>

                    <p className="leading-[1.2] font-ysabeau text-xl text-center px-4 2xl:px-20">As the visionary force behind
                        Scarborough Folk Fest, Parampara Canada is dedicated to preserving and celebrating
                        cultural heritage through music and the arts. Rooted in tradition yet embracing diversity, it
                        creates a platform where
                        global folk traditions unite, fostering connection, community, and a shared appreciation htmlFor our
                        rich, collective
                        history.</p>
                </div>
            </div>
        </section>
    );
}

export default Roots;