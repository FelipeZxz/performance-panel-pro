import { useEffect, useState, useCallback } from "react";
import { LogOut, Plus, Trash2, Save, KeyRound, RefreshCw, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AccessKey {
  id: string;
  key_value: string;
  label: string | null;
  duration_minutes: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

interface AdminPanelProps {
  sessionToken: string;
  onLogout: () => void;
}

export const AdminPanel = ({ sessionToken, onLogout }: AdminPanelProps) => {
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newDuration, setNewDuration] = useState(1440);
  const [creating, setCreating] = useState(false);
  const [newAdminKey, setNewAdminKey] = useState("");

  const call = useCallback(
    async (action: string, payload?: unknown) => {
      const { data, error } = await supabase.functions.invoke("admin-keys", {
        body: { sessionToken, action, payload },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      return data;
    },
    [sessionToken]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await call("list");
      setKeys(data.keys || []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }, [call]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async () => {
    if (!newKey.trim()) {
      toast.error("Digite o valor da chave");
      return;
    }
    setCreating(true);
    try {
      await call("create", {
        key_value: newKey.trim(),
        label: newLabel.trim() || null,
        duration_minutes: Number(newDuration) || 1440,
        is_active: true,
      });
      toast.success("Chave criada");
      setNewKey("");
      setNewLabel("");
      setNewDuration(1440);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    } finally {
      setCreating(false);
    }
  };

  const updateField = async (id: string, patch: Partial<AccessKey>) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, ...patch } : k)));
  };

  const saveKey = async (k: AccessKey) => {
    try {
      await call("update", {
        id: k.id,
        key_value: k.key_value,
        label: k.label,
        duration_minutes: k.duration_minutes,
        is_active: k.is_active,
      });
      toast.success("Atualizado");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    }
  };

  const toggleActive = async (k: AccessKey, val: boolean) => {
    try {
      await call("update", { id: k.id, is_active: val });
      updateField(k.id, { is_active: val });
      toast.success(val ? "Online" : "Offline");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm("Remover esta chave?")) return;
    try {
      await call("delete", { id });
      toast.success("Removida");
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    }
  };

  const changeAdminKey = async () => {
    const v = newAdminKey.trim();
    if (v.length < 4) {
      toast.error("Mínimo 4 caracteres");
      return;
    }
    if (!confirm("Trocar chave admin? Você precisará usá-la no próximo login.")) return;
    try {
      await call("update_admin_key", { new_admin_key: v });
      toast.success("Chave admin atualizada");
      setNewAdminKey("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="card-gaming rounded-xl p-4 flex items-center justify-between">
          <div>
            <h1 className="text-foreground font-bold text-lg flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              Admin Panel
            </h1>
            <p className="text-xs text-muted-foreground">Proxy Android</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={load} title="Recarregar">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onLogout} title="Sair">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Create */}
        <div className="card-gaming rounded-xl p-4 space-y-3">
          <h2 className="text-foreground font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Criar Nova Chave
          </h2>
          <Input
            placeholder="Valor da chave (ex: cliente123)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <Input
            placeholder="Rótulo / nome do cliente (opcional)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              placeholder="Duração (minutos)"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {(newDuration / 60).toFixed(1)} h
            </span>
          </div>
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? "Criando..." : "Criar Chave"}
          </Button>
        </div>

        {/* List */}
        <div className="space-y-3">
          <h2 className="text-foreground font-semibold px-1">
            Chaves ({keys.length})
          </h2>
          {loading ? (
            <div className="text-center text-muted-foreground py-6">Carregando...</div>
          ) : keys.length === 0 ? (
            <div className="text-center text-muted-foreground py-6 card-gaming rounded-xl">
              Nenhuma chave
            </div>
          ) : (
            keys.map((k) => (
              <div key={k.id} className="card-gaming rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${k.is_active ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                    {k.is_active ? "ONLINE" : "OFFLINE"}
                  </span>
                  <Switch
                    checked={k.is_active}
                    onCheckedChange={(v) => toggleActive(k, v)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Chave</label>
                  <Input
                    value={k.key_value}
                    onChange={(e) => updateField(k.id, { key_value: e.target.value })}
                  />
                  <label className="text-xs text-muted-foreground">Rótulo</label>
                  <Input
                    value={k.label ?? ""}
                    placeholder="—"
                    onChange={(e) => updateField(k.id, { label: e.target.value })}
                  />
                  <label className="text-xs text-muted-foreground">Duração (min)</label>
                  <Input
                    type="number"
                    value={k.duration_minutes}
                    onChange={(e) => updateField(k.id, { duration_minutes: Number(e.target.value) })}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => saveKey(k)} className="flex-1">
                    <Save className="w-4 h-4 mr-1" /> Salvar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteKey(k.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Admin key */}
        <div className="card-gaming rounded-xl p-4 space-y-3 border border-primary/30">
          <h2 className="text-foreground font-semibold flex items-center gap-2">
            <Power className="w-4 h-4 text-primary" /> Trocar Chave Admin
          </h2>
          <Input
            type="password"
            placeholder="Nova chave admin"
            value={newAdminKey}
            onChange={(e) => setNewAdminKey(e.target.value)}
          />
          <Button onClick={changeAdminKey} variant="secondary" className="w-full">
            Atualizar Chave Admin
          </Button>
        </div>
      </div>
    </div>
  );
};
