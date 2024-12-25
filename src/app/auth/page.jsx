"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { AuthWrapper } from "@/components/Wrapper";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/AuthStore";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Generic } from "@/components/loaders/Generic";

export default function Auth() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { providers, setProviders } = useAuthStore();

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isAuthenticated && user) {
            router.push("/");
        }
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        const fetchProviders = async () => {
            const result = await getProviders();
            setProviders(result);
        };

        if (!providers) {
            setIsLoading(true)
            fetchProviders();
            setIsLoading(false)
        }
    }, [providers, setProviders]);

    if (isLoading)
    return (
        <AuthWrapper>
            <Generic />
        </AuthWrapper>
    );

    return (
        <AuthWrapper>
            <div className="flex w-80 flex-col gap-4 text-center">
                <Title>Sign Up</Title>
                <p className="opacity-50">
                    Sign up with your preferred method.
                </p>
                {providers &&
                    Object.values(providers).map((provider) => (
                        <Button
                            key={provider.id}
                            onClick={() => signIn(provider.id)}
                        >
                            {provider.id === "google" && <FaGoogle />}
                            {provider.id === "github" && <FaGithub />}
                            {provider.id !== "google" &&
                                provider.id !== "github" && (
                                    <span>{provider.name}</span>
                                )}
                            <span>Via {provider.name}</span>
                        </Button>
                    ))}
            </div>
        </AuthWrapper>
    );
}
