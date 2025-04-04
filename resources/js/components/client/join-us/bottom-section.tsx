const BottomSection = () => {
    return (
        <section className="hero my-22 min-h-[130px]">
            <div className="container">
                <div className="flex justify-center items-center flex-col gap-6">
                    <div className="flex justify-between items-center lg:items-start flex-col lg:flex-row gap-8">
                        <h2 className="text-4xl min-w-fit">careers</h2>
                        <p className="text-center lg:text-right lg:ml-14 px-2 lg:px-0 font-ysabeau text-xl">Parampara Canada is always looking for
                            new talents. Jobs are generally posted on the professional platforms like
                            linkedin, indeed or glassdoor. Also you can email at <a href="mailto:info@parampara.ca"><span
                                className="bg-primary rounded-sm py-px">Info@paramparaCANADA.ca</span></a> for any openings.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomSection;