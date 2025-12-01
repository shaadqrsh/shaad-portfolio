"use client";

import { Code } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { ComponentType, useState } from "react";

interface DynamicIconProps {
    name: string;
    className?: string;
}

const DynamicIcon = ({ name, className = "" }: DynamicIconProps) => {
    const [imgError, setImgError] = useState(false);

    const lucideName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = ((LucideIcons as unknown) as Record<string, ComponentType<{ className?: string }>>)[lucideName];

    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    let src = name;
    if (!src.startsWith("/")) {
        src = `/skills/${src}`;
    }

    if (!imgError) {
        return (
            <div className={`relative ${className}`}>
                <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain"
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }

    return <Code className={className} />;
};

export default DynamicIcon;
