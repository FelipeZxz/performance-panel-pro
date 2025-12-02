import { useState } from "react";
import { Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DelayOptimizer = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">

      {/* Título + bolinha animada */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bolt className="text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Diminuir Delay</h2>
        </div>

        {/* Bolinha verde piscando */}
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* Botão */}
      <Button
        onClick={() => setActive(!active)}
        className={`w-full h-11 text-base font-semibold transition-all 
          ${active ? "bg-green-600" : "bg-red-600 hover:bg-red-700"}`}
      >
        {active ? "Ativado" : "Ativar"}
      </Button>
    </div>
  );
};
