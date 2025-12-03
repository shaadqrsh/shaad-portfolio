"use client";
import React from "react";

interface DateDisplayProps {
    date: string;
    endDate?: string;
    className?: string;
    inProgress?: boolean;
}

const getPrecision = (dateStr: string): "year" | "monthYear" | "long" => {
    if (!dateStr) return "long";
    const parts = dateStr.split("/");
    if (parts.length !== 3) return "long";

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    if (day === 0 && month === 0) return "year";
    if (day === 0) return "monthYear";
    return "long";
};

const parseDate = (dateStr: string): Date | null => {
    if (!dateStr || dateStr.toLowerCase() === "present") return null;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (day === 0) day = 1;
    if (month === 0) month = 1;

    return new Date(year, month - 1, day);
};

const formatDate = (date: Date, variant: "year" | "monthYear" | "long"): string => {
    if (variant === "year") {
        return date.getFullYear().toString();
    }
    if (variant === "monthYear") {
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    if (variant === "long") {
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    }
    return date.toLocaleDateString();
};

const DateDisplay = ({ date, endDate, className, inProgress }: DateDisplayProps) => {
    // Infer range mode if endDate is provided or inProgress is true
    const isRange = !!endDate || inProgress;

    if (isRange) {
        const start = parseDate(date);
        const end = endDate ? parseDate(endDate) : null;

        if (!start) return null;

        const startPrecision = getPrecision(date);
        const startStr = formatDate(start, startPrecision);
        let endStr = "";

        if (inProgress) {
            if (end && endDate) {
                const endPrecision = getPrecision(endDate);
                endStr = `${formatDate(end, endPrecision)} (Expected)`;
            } else {
                endStr = "Present";
            }
        } else {
            if (endDate && endDate.toLowerCase() === "present") {
                endStr = "Present";
            } else if (end && endDate) {
                const endPrecision = getPrecision(endDate);
                endStr = formatDate(end, endPrecision);
            }
        }

        return (
            <span className={className}>
                {startStr} - {endStr}
            </span>
        );
    }

    const parsedDate = parseDate(date);
    if (!parsedDate) return <span className={className}>{date}</span>;

    const dynamicVariant = getPrecision(date);
    return <span className={className}>{formatDate(parsedDate, dynamicVariant)}</span>;
};

export default DateDisplay;
