import { useState, useEffect } from "react";

const useManualCols = (desktopCols: number, mobileCols: number, breakpoint: number = 1024) => {
    const [cols, setCols] = useState(desktopCols);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth >= breakpoint) {
                setCols(desktopCols);
            } else {
                setCols(mobileCols);
            }
        };

        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, [desktopCols, mobileCols, breakpoint]);

    return cols;
};

export default useManualCols;
