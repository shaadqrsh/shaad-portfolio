"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeInUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    yOffset?: number;
    enableAnimation?: boolean;
    viewport?: {
        once?: boolean;
        amount?: "some" | "all" | number;
        margin?: string;
    };
}

const FadeInUp = ({
    children,
    delay = 0,
    duration = 0.5,
    className = "",
    yOffset = 20,
    enableAnimation = true,
    viewport = { once: true },
}: FadeInUpProps) => {
    return (
        <motion.div
            initial="hidden"
            animate={enableAnimation ? "visible" : "hidden"}
            whileInView={enableAnimation ? "visible" : undefined}
            variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration, delay }}
            viewport={viewport}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeInUp;
