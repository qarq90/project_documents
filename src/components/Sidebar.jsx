"use client";

import { PiFileFill } from "react-icons/pi";
import { PiFolderOpenFill } from "react-icons/pi";
import { PiUploadFill } from "react-icons/pi";
import { LogOut } from "lucide-react";
import { FaTimes, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuthStore } from "@/stores/AuthStore";
import { userName } from "@/helpers/authHelpers";
import { signOut } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { userStore } = useAuthStore();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
        }
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const closeSidebar = () => setIsOpen(false);

    const goToAuth = async () => {
        await signOut({ callbackUrl: "/auth" });
    };

    return (
        <>
            <button
                className="absolute left-4 top-4 z-50 flex items-center justify-center rounded-md bg-[var(--tertiary-black)] p-2 text-white md:hidden"
                onClick={toggleSidebar}
            >
                {!isOpen ? <FaBars /> : <FaTimes />}
            </button>

            <div
                className={`fixed left-0 top-0 z-40 flex h-screen w-4/5 max-w-xs transform flex-col justify-between bg-[var(--secondary-black)] p-3 pt-16 shadow-lg transition-transform duration-300 ease-in-out md:fixed md:w-1/6 md:translate-x-0 md:pt-0 md:pt-2 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    <div>
                        <Link
                            href="/"
                            className="mb-4 mt-1 flex h-16 items-center justify-start gap-2 rounded-md bg-[#222222BF] px-4 py-2 text-2xl hover:bg-[var(--tertiary-black)] hover:opacity-75"
                            onClick={closeSidebar}
                        >
                            <PiFileFill size={28} /> DocStock
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/upload-doc"
                            className="my-1 flex items-center justify-start gap-2 rounded-md px-4 py-2 text-xl hover:bg-[var(--tertiary-black)] hover:opacity-75"
                            onClick={closeSidebar}
                        >
                            <PiUploadFill /> Add Document
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/view-docs"
                            className="my-1 flex items-center justify-start gap-2 rounded-md px-4 py-2 text-xl hover:bg-[var(--tertiary-black)] hover:opacity-75"
                            onClick={closeSidebar}
                        >
                            <PiFolderOpenFill /> View Documents
                        </Link>
                    </div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            goToAuth();
                            closeSidebar();
                        }}
                        className="my-1 flex cursor-pointer items-center justify-start gap-2 rounded-md px-4 py-2 text-xl hover:bg-[var(--tertiary-black)] hover:opacity-75"
                    >
                        <LogOut /> {userStore ? "Logout" : "Register"}
                    </div>
                    <div>
                        <span className="mb-1 mt-4 flex h-16 items-center justify-start gap-2 rounded-md bg-[#222222BF] px-4 py-6 text-2xl">
                            {userStore ? (
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={userStore?.image}
                                    alt="User Avatar"
                                />
                            ) : (
                                <FaUser size={28} />
                            )}
                            {userStore ? (
                                <>{userName(userStore?.name)}</>
                            ) : (
                                <>User</>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};
