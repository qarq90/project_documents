import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoToMoon } from "../../../public/svg/GoToMoon";
import { WorkingLate } from "../../../public/svg/WorkingLate";
import { Abduction } from "../../../public/svg/Abduction";
import { OuterSpace } from "../../../public/svg/OuterSpace";
import { SpaceStars } from "../../../public/svg/SpaceStars";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { FaUserPlus } from "react-icons/fa";

export const AccountRequired = () => {
    const [randomNumber, setRandomNumber] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (randomNumber === null) {
            setRandomNumber(Math.floor(Math.random() * 5));
        }
    }, [randomNumber]);

    const goToAuth = () => router.push("/auth");

    if (randomNumber === null) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 md:gap-8">
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                {randomNumber === 0 && <WorkingLate />}
                {randomNumber === 1 && <Abduction />}
                {randomNumber === 2 && <SpaceStars />}
                {randomNumber === 3 && <OuterSpace />}
                {randomNumber === 4 && <GoToMoon />}
            </div>
            <div className="text-center text-lg sm:text-xl">
                <Label>
                    Register before you can access your
                    <span className="font-medium"> documents</span>!
                </Label>
            </div>
            <div className="flex w-full items-center justify-center">
                <Button onClick={goToAuth}>
                    <FaUserPlus /> Register Now
                </Button>
            </div>
        </div>
    );
};
