import React from "react";

export function AppWrapper({ children }) {
    return <div className="flex">{children}</div>;
}

export function BodyWrapper({ children }) {
    return (
        <div className="w-screen px-4 pb-3 pt-5 md:ml-64 md:px-12">
            {children}
        </div>
    );
}

export function AuthWrapper({ children }) {
    return (
        <div className="m-4 mt-[-16] flex h-screen w-screen items-center justify-center md:m-0 md:ml-56 md:mt-0">
            {children}
        </div>
    );
}
