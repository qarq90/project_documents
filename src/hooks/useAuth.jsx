import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/AuthStore";

export const useAuth = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { setUserStore, userStore } = useAuthStore();

    useEffect(() => {
        if (status === "loading") return;

        if (status === "authenticated" && !userStore) {
            setUserStore(session?.user);
        }
    }, [session, status, router, setUserStore, userStore]);

    return {
        isAuthenticated: status === "authenticated",
        user: session?.user || userStore || null,
        loading: status === "loading",
    };
};
