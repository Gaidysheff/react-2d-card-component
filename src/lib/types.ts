// ================ AugmentedRequired<Type, Key> =======================
export type AugmentedRequired<
  T extends object,
  K extends keyof T = keyof T,
> = Omit<T, K> & Required<Pick<T, K>>;

// ==================== Универсальный Helper ===========================

import { type ReactFormExtendedApi } from "@tanstack/react-form";

// Создаем "ленивый" тип, который сам проставит все any за нас
export type AnyReactForm<TData> = ReactFormExtendedApi<
  TData,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
