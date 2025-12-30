"use client";


import { Download } from "lucide-react";
import Button from "@/components/ui/button";
import { name } from "@/lib/Data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResumePage = () => {
    return (
        <section className="min-h-screen flex flex-col bg-shaad-400">
            <Navbar />

            <div className="flex flex-1 flex-col items-center justify-center py-8">
                <div className="mb-6 flex gap-4">
                    <Button href={`/${name} - Resume.pdf`} download>
                        <Download className="mr-2 h-4 w-4" />
                        <span className="font-semibold">Download PDF</span>
                    </Button>
                </div>

                <div className="w-full h-full flex justify-center px-4 md:px-0">
                    <iframe
                        src={`/${name} - Resume.pdf`}
                        className="w-full md:w-[80%] h-screen min-h-[800px] rounded-lg shadow-2xl"
                        title={`${name} - Resume`}
                    />
                </div>
            </div>

            <div className="relative z-10">
                <Footer />
            </div>
        </section>
    );
};

export default ResumePage;
