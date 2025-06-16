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
        className="bg-transparent border-0"
        closeButtonClassName="text-white"
      >
        <DialogTitle className="hidden">Image Modal</DialogTitle>
        <div className="w-[500px] h-[500px]">
          <Image
            src={src}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
