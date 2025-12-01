"use client";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoaderProps {
    isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-shaad-200"
                >
                    <Loader2 className="animate-spin text-shaad-600 w-16 h-16" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const useSmartLoader = ({
    loadingDependencies = [],
    minDuration = 500,
    maxDuration = 3000,
}: {
    loadingDependencies?: boolean[];
    minDuration?: number;
    maxDuration?: number;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsPageLoaded(true);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    useEffect(() => {
        const allLoaded = isPageLoaded && !loadingDependencies.some((dep) => dep);

        if (allLoaded) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, minDuration);
            return () => clearTimeout(timer);
        }
    }, [isPageLoaded, loadingDependencies, minDuration]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, maxDuration);

        return () => clearTimeout(timer);
    }, [maxDuration]);

    return isLoading;
};

export default Loader;
