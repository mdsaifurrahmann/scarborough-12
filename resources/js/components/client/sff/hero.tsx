import { useEffect, useState } from 'react';

interface TimeLeft {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    eventStarted: boolean;
}

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        eventStarted: false,
    });

    useEffect(() => {
        // July 26, 2025 (month is 0-indexed in JS Date)
        const targetDate = new Date(2025, 6, 26);
        const updateCountdown = (): void => {
            const now = new Date();

            if (now >= targetDate) {
                setTimeLeft((prev) => ({ ...prev, eventStarted: true }));
                return;
            }

            const tempDate = new Date(now);
            let months = 0;

            // Calculate full months remaining
            while (true) {
                const nextDate = new Date(tempDate);
                nextDate.setMonth(tempDate.getMonth() + 1);
                if (nextDate > targetDate) break;
                months++;
                tempDate.setMonth(tempDate.getMonth() + 1);
            }

            // Calculate remaining days
            const days = Math.floor((targetDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

            // Calculate remaining time after months and days
            const remainingTime = targetDate.getTime() - tempDate.getTime() - days * 1000 * 60 * 60 * 24;
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setTimeLeft({
                months,
                days,
                hours,
                minutes,
                seconds,
                eventStarted: false,
            });
        };

        // Initial call and interval setup
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative -z-10 bg-orange-500 lg:-mt-[196px]">
            <img
                src="./images/fss-banner.png"
                alt="banner"
                className="pointer-events-none relative -z-10 h-[881px] w-full object-cover lg:h-[1268px] xl:h-auto"
                loading="lazy"
            />
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-end lg:justify-center">
                <div className="container my-12 lg:mt-16 xl:mt-44 2xl:mt-16">
                    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                        <div className="">
                            <h1 className="text-primary text-center text-7xl lg:text-[5.2rem]">SFF2025</h1>
                            <h4 className="text-primary text-center text-3xl lg:ml-auto lg:w-fit lg:text-[32px]">July 26 & 27</h4>
                        </div>
                        <p className="text-offwhite text-center text-[20px] leading-[1.2] opacity-80 lg:text-right">
                            <span className="block">WHERE MUSIC UNITES</span>
                            <span className="block">CULTURES FLOURISH</span>
                            <span className="block"> AND MEMORIES ARE BORN</span>
                        </p>
                    </div>
                    <div className="count-down mt-12 lg:mt-44">
                        <p className="bg-primary mx-auto w-10/12 rounded-lg px-7 py-1.5 text-center text-xl lg:w-fit lg:px-10 lg:text-[26px]">
                            {timeLeft.eventStarted ? (
                                'Event has started!'
                            ) : (
                                <>
                                    {timeLeft.months} Month{timeLeft.months !== 1 ? 's' : ''} | {timeLeft.days} DAYS{' '}
                                    <span className="hidden lg:inline-block">|</span>
                                    <br className="lg:hidden" />
                                    {' ' + timeLeft.hours} HOURS | {timeLeft.minutes} MIN | {timeLeft.seconds} SEC
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <img src="./images/ssf-wave.svg" alt="wave" className="absolute bottom-24 hidden w-full lg:block xl:hidden" loading="lazy" />
        </section>
    );
};

export default Hero;
