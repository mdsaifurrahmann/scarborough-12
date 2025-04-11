import CustomDropdown from "@/components/custom-dropdown";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Images() {
    const [selectedYear, setSelectedYear] = useState<number>(2023);

    const options = [
        { value: '2023', label: '#SFF2023' },
        { value: '2024', label: '#SFF2024' },
        { value: '2025', label: '#SFF2025' },
    ];

    type Image = {
        title: string;
        url: string;
    };

    const imagesByYear: Record<number, Image[]> = {
        2020: [
            { title: 'Image 1', url: 'img1.jpg' },
            { title: 'Image 2', url: 'img2.jpg' },
            { title: 'Image 3', url: 'img3.jpg' },
            { title: 'Image 4', url: 'img4.jpg' },
        ],
        2021: [{ title: 'Image 1', url: 'img1.jpg' }],
        2022: [{ title: 'Image 2', url: 'img2.jpg' }],
        2023: [{ title: 'Image 3', url: 'img3.jpg' }],
        2024: [{ title: 'Image 4', url: 'img4.jpg' }],
    };


    const images = imagesByYear[selectedYear] || []

    const handleSelect = (option: { value: string; label: string } | null) => {
        console.log('Selected option:', option);
    };

    return (
        <section className="mb-22">
            <div className="container">
                <div className="flex justify-between items-center mb-6 flex-col lg:flex-row">
                    <h1 className="section-title !mb-0">GALLERY</h1>
                    <div>
                        <CustomDropdown
                            options={options}
                            defaultValue={options[0]}
                            onChange={handleSelect}
                        />
                    </div>
                </div>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 0: 2, 1023: 3 }}
                >
                    <Masonry gutter="10px" className="bg-primary p-2 rounded-md">
                        {images.map((image, i) => (
                            <img
                                key={i}
                                src={image.url}
                                className="w-full block rounded-md"
                                alt={`Gallery ${i}`}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </section>)
}