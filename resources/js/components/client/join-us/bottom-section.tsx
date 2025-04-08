const BottomSection = () => {
    return (
        <section className="hero my-22 min-h-[130px]">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
                        <h2 className="min-w-fit text-4xl">careers</h2>
                        <p className="font-ysabeau px-2 text-center text-xl lg:ml-14 lg:px-0 lg:text-right">
                            Parampara Canada is always looking for new talents. Jobs are generally posted on the professional platforms like linkedin,
                            indeed or glassdoor. Also you can email at{' '}
                            <a href="mailto:info@parampara.ca">
                                <span className="bg-primary rounded-sm py-px">Info@paramparaCANADA.ca</span>
                            </a>{' '}
                            for any openings.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BottomSection;
