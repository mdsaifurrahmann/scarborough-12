import { Ellipsis } from 'lucide-react';

const TopSection = () => {
    return (
        <section className="hero min-h-[230px]">
            <div className="container">
                <div className="mt-12 flex flex-col items-center justify-center gap-6 lg:mt-0">
                    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
                        <h2 className="min-w-fit text-4xl">join us</h2>
                        <div className="font-ysabeau px-2 text-center text-xl lg:ml-20 lg:px-0 lg:text-right">
                            <p>
                                Be part of a world-class cultural festival celebrating Scarborough’s rich diversity through music, art, and
                                community!{' '}
                            </p>

                            <p>
                                We are currently accepting{' '}
                                <span className="bg-primary rounded-sm py-px">
                                    applications for Vendors, Volunteer, Artists, and Sponsors for Scarborough Folk Fest 2025.
                                </span>
                            </p>

                            <p>Don’t miss your chance to get involved — stay tuned for updates!</p>
                        </div>
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
