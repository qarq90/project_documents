import {
    FaLock,
    FaCloud,
    FaFileAlt,
    FaShieldAlt,
    FaRegPaperPlane,
    FaSearch,
    FaLightbulb,
} from "react-icons/fa";

export const Features = () => {
    const features = [
        {
            icon: (
                <FaLock className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Top-Notch Security",
            description:
                "Your documents are secured with end-to-end encryption to keep them safe from unauthorized access.",
        },
        {
            icon: (
                <FaCloud className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Cloud Storage",
            description:
                "Easily upload and access your documents from anywhere, at any time.",
        },
        {
            icon: (
                <FaFileAlt className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Document Management",
            description:
                "Categorize and organize your files for easy access and management.",
        },
        {
            icon: (
                <FaShieldAlt className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Advanced Privacy",
            description:
                "Our app ensures that only you have access to your files with strict privacy measures.",
        },
        {
            icon: (
                <FaRegPaperPlane className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Seamless Sharing",
            description:
                "Share your documents with others effortlessly while maintaining full control over access permissions.",
        },
        {
            icon: (
                <FaSearch className="mb-4 text-4xl text-[var(--primary-color)]" />
            ),
            title: "Easy Search",
            description:
                "Quickly search through your documents with advanced filtering options to find what you need instantly.",
        },
    ];

    return (
        <div className="container mx-auto mb-8 flex flex-col items-center text-center">
            <h1 className="mb-12 flex gap-3 text-3xl font-semibold sm:text-4xl md:text-5xl">
                <FaLightbulb /> Features
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center rounded-md bg-[#222222BF] p-6 text-center"
                    >
                        {feature.icon}
                        <h3 className="mb-2 text-xl font-semibold">
                            {feature.title}
                        </h3>
                        <p className="text-lg">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
