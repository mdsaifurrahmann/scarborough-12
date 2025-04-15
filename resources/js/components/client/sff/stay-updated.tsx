import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const StayUpdated = () => {
    return (
        <section className="mt-32 mb-32">
            <h3 className="section-title">STAY UPDATED</h3>
            <div className="flex items-center justify-center gap-12">
                <a href="https://www.facebook.com/Scarboroughfolkfest" target="_blank">
                    {/* <img src="./images/social/fb.png" alt="facebook" loading="lazy" /> */}
                    <Facebook size={32} />
                </a>
                <a href="https://www.linkedin.com/company/paramparacanada/" target="_blank">
                    {/* <img src="./images/social/linkdedin.png" alt="linkedin" loading="lazy" /> */}
                    <Linkedin size={32} />
                </a>
                <a href="https://www.instagram.com/paramparacanada/" target="_blank">
                    {/* <img src="./images/social/insta.png" alt="instagram" loading="lazy" /> */}
                    <Instagram size={32} />
                </a>
                <a href="https://www.youtube.com/@scarboroughfolkfest" target="_blank">
                    {/* <img src="./images/social/yt.png" alt="youtube" loading="lazy" /> */}
                    <Youtube size={32} />
                </a>
            </div>
        </section>
    );
};

export default StayUpdated;
