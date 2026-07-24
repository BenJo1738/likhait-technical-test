import { useState, useEffect, useCallback } from "react";
import { fetchCategories, createCategory } from "../services/api";

export function useCategories() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = async (name: string) => {
    await createCategory(name);
    await loadCategories();
  };

  return { categories, loading, addCategory };
}