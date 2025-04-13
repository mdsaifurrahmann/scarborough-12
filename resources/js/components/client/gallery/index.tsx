import CustomDropdown from '@/components/custom-dropdown';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './index.css';

export default function Images() {
    const [selectedYear, setSelectedYear] = useState<number>(2022);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [visibleImagesCount, setVisibleImagesCount] = useState<number>(12);

    const options = [
        { value: '2022', label: '#SFF2022' },
        { value: '2023', label: '#SFF2023' },
        { value: '2024', label: '#SFF2024' },
    ];

    type Image = {
        title: string | null;
        url: string;
    };

    const imagesByYear: Record<number, Image[]> = {
        2022: [
            { title: null, url: '1.JPG' },
            { title: null, url: '2.JPG' },
            { title: null, url: '3.JPG' },
            { title: null, url: '4.JPG' },
            { title: null, url: '5.JPG' },
            { title: null, url: '7.JPG' },
            { title: null, url: '8.JPG' },
            { title: null, url: '9.JPG' },
            { title: null, url: '10.JPG' },
            { title: null, url: '11.JPG' },
            { title: null, url: '12.JPG' },
            { title: null, url: '13.JPG' },
            { title: null, url: '14.JPG' },
            { title: null, url: '15.JPG' },
            { title: null, url: '16.JPG' },
        ],
        2023: [
            { title: null, url: '1.png' },
            { title: null, url: '2.png' },
            { title: null, url: '3.png' },
            { title: null, url: '4.png' },
            { title: null, url: '5.png' },
            { title: null, url: '7.png' },
            { title: null, url: '8.png' },
            { title: null, url: '9.png' },
            { title: null, url: '10.png' },
            { title: null, url: '11.png' },
            { title: null, url: '12.png' },
            { title: null, url: '13.png' },
            { title: null, url: '14.png' },
            { title: null, url: '15.png' },
            { title: null, url: '16.png' },
            { title: null, url: '17.png' },
            { title: null, url: '18.png' },
            { title: null, url: '19.png' },
            { title: null, url: '20.png' },
        ],
        2024: [
            { title: null, url: '1.jpg' },
            { title: null, url: '2.jpg' },
            { title: null, url: '3.jpg' },
            { title: null, url: '4.jpg' },
            { title: null, url: '5.jpg' },
            { title: null, url: '6.jpg' },
            { title: null, url: '7.jpg' },
            { title: null, url: '8.jpg' },
            { title: null, url: '9.jpg' },
            { title: null, url: '10.jpg' },
            { title: null, url: '11.jpg' },
            { title: null, url: '12.jpg' },
            { title: null, url: '13.jpg' },
            { title: null, url: '14.jpg' },
            { title: null, url: '15.jpg' },
            { title: null, url: '16.jpg' },
            { title: null, url: '17.jpg' },
            { title: null, url: '18.jpg' },
            { title: null, url: '19.jpg' },
            { title: null, url: '20.jpg' },
            { title: null, url: '21.jpg' },
            { title: null, url: '22.jpg' },
            { title: null, url: '23.jpg' },
            { title: null, url: '24.jpg' },
            { title: null, url: '25.jpg' },
        ],
    };

    const images = imagesByYear[selectedYear] || [];
    const visibleImages = images.slice(0, visibleImagesCount);

    const handleSelect = (option: { value: string; label: string } | null) => {
        setSelectedYear(Number(option?.value));
        setVisibleImagesCount(12); // Reset visible images count when year changes
    };

    const handleLoadMore = () => {
        setVisibleImagesCount((prevCount) => Math.min(prevCount + 12, images.length));
    };

    function resetAnimation(el: HTMLElement | null) {
        if (!el) return;
        el.classList.remove('fade-in');
        void el.offsetWidth;
        el.classList.add('fade-in');
    }

    useEffect(() => {
        imageRefs.current.forEach((el) => resetAnimation(el));
    }, [selectedYear]);

    return (
        <section className="mb-22">
            <div className="container">
                <div className="mb-6 flex flex-col items-center justify-between lg:flex-row">
                    <h1 className="section-title !mb-0">GALLERY</h1>
                    <div>
                        <CustomDropdown options={options} defaultValue={options[0]} onChange={handleSelect} />
                    </div>
                </div>
                <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 1023: 3 }}>
                    <Masonry gutter="10px" className="bg-primary rounded-md p-2">
                        {visibleImages.map((image, i) => (
                            <img
                                key={i}
                                ref={(el) => {
                                    imageRefs.current[i] = el;
                                }}
                                src={`/images/gallery/${selectedYear}/${image.url}`}
                                className="fade-in block w-full cursor-pointer rounded-md"
                                alt={image.title ?? ''}
                                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                                onClick={() => setLightboxIndex(i)}
                                loading="lazy"
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
                {visibleImagesCount < images.length && (
                    <div className="text-center mt-4">
                        <button
                            className="px-4 py-2 bg-primary text-black font-bold rounded-md cursor-pointer"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )}
                {lightboxIndex !== null && (
                    <Lightbox
                        open={lightboxIndex !== null}
                        index={lightboxIndex}
                        close={() => setLightboxIndex(null)}
                        slides={images.map((img) => ({
                            src: `/images/gallery/${selectedYear}/${img.url}`,
                            alt: img.title ?? '',
                        }))}
                    />
                )}
            </div>
        </section>
    );
}
