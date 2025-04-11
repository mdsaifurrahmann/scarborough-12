import CustomDropdown from "@/components/custom-dropdown";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Images() {
    const images = [
        "https://picsum.photos/200/300?image=1050",
        "https://picsum.photos/300/300?image=206",
        "https://picsum.photos/250/350?image=1024",
        "https://picsum.photos/300/200?image=1027",
        "https://picsum.photos/275/325?image=1035",
        "https://picsum.photos/200/400?image=1041",
        "https://picsum.photos/350/250?image=1043",
        "https://picsum.photos/300/500?image=1049",
        "https://picsum.photos/400/300?image=1052",
        "https://picsum.photos/250/250?image=1055",
    ]

    const options = [
        { value: 'sff2024', label: '#SFF2024' },
        { value: 'sff2023', label: '#SFF2023' },
        { value: 'sff2022', label: '#SFF2022' },
    ];

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
                                src={image}
                                className="w-full block rounded-md"
                                alt={`Gallery ${i}`}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </section>)
}