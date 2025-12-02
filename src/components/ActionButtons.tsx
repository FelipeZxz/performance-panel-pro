import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { FaFire, FaBolt } from "react-icons/fa";

export default function ffAppLink() {
  const [open, setOpen] = React.useState(true);

  const openFF = (pkg: string) => {
    // Tenta abrir o app diretamente
    window.location.href = `android-app://${pkg}`;

    // Caso o app não esteja instalado → fallback após 1200ms
    setTimeout(() => {
      window.location.href = `https://play.google.com/store/apps/details?id=${pkg}`;
    }, 1200);
  };

  const handleSelect = (type: "normal" | "max") => {
    setOpen(false);

    const pkgNormal = "com.dts.freefireth";
    const pkgMax = "com.dts.freefiremax";

    openFF(type === "normal" ? pkgNormal : pkgMax);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <FaFire className="text-orange-500" />
              Selecionar versão do jogo
            </DialogTitle>
            <DialogDescription className="text-center mt-2 text-gray-700">
              Escolha qual versão do Free Fire deseja abrir.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Free Fire Normal */}
            <Button
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl"
              onClick={() => handleSelect("normal")}
            >
              <FaFire className="text-xl" />
              <span className="text-lg font-semibold">Abrir Free Fire</span>
            </Button>

            {/* Free Fire MAX */}
            <Button
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl"
              onClick={() => handleSelect("max")}
            >
              <FaBolt className="text-xl" />
              <span className="text-lg font-semibold">Abrir Free Fire MAX</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
