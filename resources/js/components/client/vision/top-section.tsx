const TopSection = () => {
    return (
        <section className="hero min-h-[230px]">
            <div className="container">
                <div className="mt-12 flex flex-col items-center justify-center gap-6 lg:mt-0">
                    <div className="order-2 flex flex-col items-center justify-between gap-12 lg:order-1 lg:flex-row lg:items-start">
                        <h2 className="text-4xl">vision</h2>
                        <p className="font-ysabeau px-4 text-center text-xl lg:ml-14 lg:ml-auto lg:px-0 lg:pl-23 lg:text-right 2xl:ml-16">
                            To create a world-class cultural festival that celebrates the rich diversity of Scarborough, fostering connections through music, art, and traditions from around the globe. Guided by Parampara Canada's mission to preserve and promote heritage, we aim to inspire unity, nurture creativity, and build a vibrant, inclusive community where all cultures are celebrated and shared.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img
                            src="./images/vision/people.png"
                            alt="people"
                            className="mx-auto block w-[350px] md:w-[550px] lg:w-[750px] 2xl:w-[850px]"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSection;
