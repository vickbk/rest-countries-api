import getMemo from "./get-memo";
import { MemoObject } from "./memo-types";

export default function getMemoItem<T = unknown>(params: string): T {
  const path = params.split(".");
  return getNested(getMemo(), path) as T;
}

function getNested(obj: MemoObject, path: string[]): unknown {
  return path.reduce(
    (o: unknown, p) => (o ? (o as Record<string, unknown>)[p] : undefined),
    obj
  );
}
