import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { PiFileFill } from "react-icons/pi";

export const Hero = () => {
    const router = useRouter();
    const goToUpload = () => router.push("/upload-doc");
    return (
        <section className="relative flex h-screen flex-col items-center justify-center sm:py-24 lg:py-32">
            <div className="container mx-auto flex flex-col items-center text-center">
                <h1 className="mb-4 flex gap-3 text-3xl font-semibold sm:text-4xl md:text-5xl">
                    <PiFileFill /> DocStock
                </h1>
                <p className="mb-4 text-lg opacity-50 sm:text-xl">
                    Safely upload, manage, and share your important files <br />{" "}
                    with advanced encryption.
                </p>
                <div className="rounded-md px-6 py-3">
                    <Button disabled={false} onClick={goToUpload}>
                        <FaCloudUploadAlt /> Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
};
