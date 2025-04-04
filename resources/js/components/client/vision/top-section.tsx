const TopSection = () => {
    return (
        <section className="hero min-h-[230px]">
            <div className="container">
                <div className="flex justify-center items-center flex-col gap-6 mt-12 lg:mt-0">
                    <div
                        className="flex justify-between items-center lg:items-start flex-col lg:flex-row gap-12 order-2 lg:order-1 ">
                        <h2 className="text-4xl">vision</h2>
                        <p className="text-center lg:text-right lg:ml-auto lg:ml-14 2xl:ml-16 px-4 lg:px-0 lg:pl-23 font-ysabeau text-xl">
                            To create a world-className cultural festival that celebrates the rich diversity
                            of Scarborough, fostering connections through music, art, and traditions from around the globe. Guided by Parampara Canada's mission of preserving and promoting heritage, we aim to inspire unity, nurture creativity, and build a vibrant, inclusive community where all
                            cultures are celebrated and shared.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img src="./images/vision/people.png" alt="people"
                            className="w-[350px] md:w-[550px] lg:w-[750px] 2xl:w-[850px] block mx-auto" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopSection;