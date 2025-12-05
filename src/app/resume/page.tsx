"use client";

import Resume from "@/components/Resume";
import { Download } from "lucide-react";
import Button from "@/components/ui/button";
import { name } from "@/lib/Data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResumePage = () => {
    const handleDownload = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            const link = document.createElement('a');
            link.href = `/${name} - Resume.pdf`;
            link.click();
        } else {
            document.title = `${name} - Resume`;
            window.print();
        }
    };

    return (
        <section className="min-h-screen flex flex-col bg-shaad-400 print:bg-white">
            <div className="print:hidden">
                <Navbar />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-8 print:py-0">
                <div className="mb-6 flex gap-4 print:hidden">
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        <span className="font-semibold">Download PDF</span>
                    </Button>
                </div>

                <div className="w-full overflow-hidden flex justify-center print:block print:w-auto print:overflow-visible">
                    <div className="shadow-2xl print:shadow-none bg-white min-w-[21cm] md:scale-100 scale-[0.45] origin-top md:origin-center -mb-[16cm] md:mb-0">
                        <Resume />
                    </div>
                </div>
            </div>

            <div className="relative z-10 print:hidden">
                <Footer />
            </div>
        </section>
    );
};

export default ResumePage;
