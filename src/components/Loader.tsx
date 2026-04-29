"use client";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const imageCache = new Set<string>();

export const isImageCached = (src: string) => imageCache.has(src);
export const markImageCached = (src: string) => imageCache.add(src);

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
                    transition={{ duration: 0.2 }}
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
    minDuration = 150,
    maxDuration = 3000,
}: {
    loadingDependencies?: boolean[];
    minDuration?: number;
    maxDuration?: number;
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading && !loadingDependencies.some((dep) => dep)) {
            const timer = setTimeout(() => setIsLoading(false), minDuration);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minDuration, ...loadingDependencies]);

    useEffect(() => {
        if (!isLoading) return;
        const timer = setTimeout(() => setIsLoading(false), maxDuration);
        return () => clearTimeout(timer);
    }, [maxDuration, isLoading]);

    return isLoading;
};

export default Loader;
