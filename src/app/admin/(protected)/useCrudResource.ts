import { useCallback, useEffect, useState } from "react";

type UseCrudResourceOptions<Row, Form> = {
  endpoint: string;
  emptyForm: Form;
  toForm: (row: Row) => Form;
  toBody: (form: Form) => unknown;
};

export function useCrudResource<Row extends { id: string }, Form extends Record<string, unknown>>({
  endpoint,
  emptyForm,
  toForm,
  toBody,
}: UseCrudResourceOptions<Row, Form>) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Row | null>(null);
  const [deleteItem, setDeleteItem] = useState<Row | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);

  const load = useCallback(async () => {
    setError(null);
    try {
      const r = await fetch(endpoint);
      if (!r.ok) {
        setItems([]);
        setError(
          r.status === 401
            ? "Your session has expired. Please log in again."
            : "Failed to load data.",
        );
        return;
      }
      setItems(await r.json());
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const set =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function startAdd() {
    setForm(emptyForm);
    setAdding(true);
  }

  function startEdit(row: Row) {
    setForm(toForm(row));
    setEditItem(row);
  }

  async function saveAdd() {
    setSaving(true);
    try {
      const payload = toBody(form);
      const isFormData = payload instanceof FormData;
      const r = await fetch(endpoint, {
        method: "POST",
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("save failed");
      setAdding(false);
      await load();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (!editItem) return;
    setSaving(true);
    try {
      const payload = toBody(form);
      const isFormData = payload instanceof FormData;
      const r = await fetch(`${endpoint}/${editItem.id}`, {
        method: "PUT",
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("save failed");
      setEditItem(null);
      await load();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteItem) return;
    setSaving(true);
    try {
      const r = await fetch(`${endpoint}/${deleteItem.id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("delete failed");
      setDeleteItem(null);
      await load();
    } catch {
      setError("Failed to delete. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return {
    items,
    loading,
    error,
    saving,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    adding,
    setAdding,
    form,
    set,
    setForm,
    startAdd,
    startEdit,
    saveAdd,
    saveEdit,
    confirmDelete,
  };
}
