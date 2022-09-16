import myzod from "myzod";
import type { Infer } from "myzod";

export const ID = myzod.string();

export const baseSchema = myzod.object({
  key: ID,
});

export type BaseType = Infer<typeof baseSchema>;
