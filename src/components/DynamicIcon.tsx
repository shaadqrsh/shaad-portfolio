"use client";

import { Code } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DynamicIconProps {
    name: string;
    className?: string;
}

/**
 * An icon image named in the data, such as "icon_unity.svg" (looked up in
 * /skills) or a full path like "/jams/icon_gmtk.png". Falls back to a code
 * icon if the file is missing. This used to accept any Lucide icon name too,
 * but that meant importing all of Lucide, about 170 KB gzipped on every page,
 * and no data entry used it. To use a Lucide icon in the data, add an SVG
 * file instead.
 */
const DynamicIcon = ({ name, className = "" }: DynamicIconProps) => {
    const [imgError, setImgError] = useState(false);

    const src = name.startsWith("/") ? name : `/skills/${name}`;

    // Some technologies have no logo and an empty icon name: skip straight to
    // the fallback instead of requesting /skills/ and getting a 400.
    if (name && !imgError) {
        return (
            <div className={`relative ${className}`}>
                {/* Each icon sits beside its name, so the image itself is decorative. */}
                <Image src={src} alt="" fill className="object-contain" onError={() => setImgError(true)} />
            </div>
        );
    }

    return <Code className={className} aria-hidden />;
};

export default DynamicIcon;
