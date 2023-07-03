import "@/styles/globals.css";
import "@/styles/characters.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        router.events.on("routeChangeError", () => setLoading(false));
        router.events.on("routeChangeStart", () => setLoading(true));
        router.events.on("routeChangeComplete", () => setLoading(false));

        return () => {
            router.events.off("routeChangeError", () => setLoading(false));
            router.events.off("routeChangeStart", () => setLoading(true));
            router.events.off("routeChangeComplete", () => setLoading(false));
        };
    }, [router.events]);

    return <>{loading ? "Loading..." : <Component {...pageProps} />}</>;
}
