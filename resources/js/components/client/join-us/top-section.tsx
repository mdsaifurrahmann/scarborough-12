import { Ellipsis } from 'lucide-react';

const TopSection = () => {
    return (
        <section className="hero min-h-[230px]">
            <div className="container">
                <div className="mt-12 flex flex-col items-center justify-center gap-6 lg:mt-0">
                    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
                        <h2 className="min-w-fit text-4xl">join us</h2>
                        <p className="font-ysabeau px-2 text-center text-xl lg:ml-20 lg:px-0 lg:text-right">
                            To create a world-className cultural festival celebrating Scarborough’s rich diversity and fostering connections through
                            music, we will accept applications for artists, vendors, and sponsors for Scarborough Folk Fest 2025 soon.{' '}
                            <span className="bg-primary inline-block rounded-sm py-px">Application will be start on april 1st 2025</span>
                        </p>
                    </div>
                    <div className="mt-10">
                        <Ellipsis />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSection;
