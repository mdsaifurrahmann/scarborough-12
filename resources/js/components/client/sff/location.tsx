

const Location = () => {
  
  return (
        <section className="container my-22">
        <h3 className="section-title !mb-12">LOCATION</h3>
        <div className="flex flex-col lg:flex-row gap-6 px-8 justify-center items-center">
            <div className="border-4 border-primary w-full lg:w-[565px] h-[365px] lg:h-[465px] rounded-xl overflow-hidden">
                <iframe className="w-full h-full" style={{
    border: "none",     // Replaces frameBorder="0"
    overflow: "hidden", // Replaces scrolling="no"
    margin: 0,          // Replaces marginHeight="0" and marginWidth="0"
  }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1020.5639848947374!2d-79.ailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>'25395905534248!3d43.75789999778729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d1c8a00a41e5%3A0x7bfe04e31df453e2!2sThomson%20Memorial%20Park!5e1!3m2!1sen!2sbd!4v1740250191824!5m2!1sen!2sbd">
                </iframe>
            </div>
            <div className="lg:w-[486px]">
                <div>
                    <p className="text-primary text-[2.5rem] leading-[1.2] w-2/4">
                        Thomson Memorial Park
                    </p>
                    <span
                        className="text-[13px] absolute w-[60%] lg:w-[15%] 4xl:w-[8%] 5xl:w-[6%] xl:block transform translate-x-28 -translate-y-10 leading-[1.2] hidden">located
                        at 1005 Brimley Rd, Scarborough, ON M1P 3E9</span>
                </div>
                <p className="mt-4 mb-6 text-[16px] leading-[1.2]">
                    a scenic and historic park ideal for enjoying the Scarborough Folk
                    Fest activities.
                </p>
                <p className="text-[16px] leading-[1.2]">
                    With lush green spaces, picnic areas, walking trails, and
                    playgrounds, the park offers a perfect backdrop for live music,
                    dance performances, and cultural showcases during the festival.
                </p>
                <a href="https://maps.app.goo.gl/LoDaszacdKSQsExA7" target="_blank"
                    className="block text-center lg:inline-block btn-1 mt-6">GET DIRECTIONS</a>
            </div>
        </div>
    </section>
  );
};

export default Location;