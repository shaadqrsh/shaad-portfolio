import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface ImageDialogProps {
  children: ReactNode;
  src: string;
}

const ImageDialog = ({ children, src }: ImageDialogProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={isMobile}
        style={{ maxWidth: "none" }}
        className="bg-transparent border-0 shadow-none p-0 w-auto 
                   flex justify-center items-center"
        closeButtonClassName="text-white bg-black/50 rounded-full z-50"
      >
        <DialogTitle className="hidden">Image Modal</DialogTitle>
        <div className="h-[60vh] max-h-[75vh]">
          <Image
            src={src}
            alt="image"
            width={1920}
            height={1080}
            className="w-auto h-full object-contain max-w-[90vw]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;