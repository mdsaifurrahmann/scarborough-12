import { Ellipsis } from "lucide-react";

const TopSection = () => {
    return (
        <section className="hero min-h-[230px]">
            <div className="container">
                <div className="flex justify-center items-center flex-col gap-6 mt-12 lg:mt-0">
                    <div className="flex justify-between items-center lg:items-start flex-col lg:flex-row gap-12">
                        <h2 className="text-4xl min-w-fit">join us</h2>
                        <p className="text-center lg:text-right lg:ml-20 px-2 lg:px-0 font-ysabeau text-xl">To create a world-className cultural festival
                            celebrating Scarborough’s rich diversity and fostering connections through
                            music, we will accept applications for artists, vendors, and sponsors for Scarborough Folk Fest
                            2025 soon. <span className="bg-primary inline-block rounded-sm py-px">Application will be start on
                                april 1st
                                2025</span>
                        </p>
                    </div>
                    <div className="mt-10">
                        <Ellipsis />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopSection;