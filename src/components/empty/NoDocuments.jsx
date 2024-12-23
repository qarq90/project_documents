import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RidingCycle } from "../../../public/svg/RidingCycle";
import { HotAirBalloon } from "../../../public/svg/HotAirBalloon";
import { SearchEngine } from "../../../public/svg/SearchEngine";
import { SearchingFemale } from "../../../public/svg/SearchingFemale";
import { WorkingLate } from "../../../public/svg/WorkingLate";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { PiUploadFill } from "react-icons/pi";

export const NoDocuments = () => {
    const [randomNumber, setRandomNumber] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 5));
    }, []);

    const goToUpload = () => router.push("/upload-doc");

    if (randomNumber === null) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-8 sm:px-8 sm:py-10 md:gap-8">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
                {randomNumber === 0 && <SearchEngine />}
                {randomNumber === 1 && <RidingCycle />}
                {randomNumber === 2 && <HotAirBalloon />}
                {randomNumber === 3 && <WorkingLate />}
                {randomNumber === 4 && <SearchingFemale />}
            </div>
            <div className="text-center text-lg sm:text-xl md:text-2xl">
                <Label>
                    No document found! Please
                    <span className="font-medium"> upload some</span> to get
                    started.
                </Label>
            </div>
            <div className="flex w-full items-center justify-center">
                <Button onClick={goToUpload}>
                    <PiUploadFill /> Upload Now
                </Button>
            </div>
        </div>
    );
};
