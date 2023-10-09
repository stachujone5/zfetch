import { ZodSchema, z } from "zod";

const BASE_URL = "https://dummyjson.com";

type Props<Z> = {
  url: string;
  schema: Z;
  options?: Parameters<typeof fetch>["1"];
};

export async function zodFetcher<Z extends ZodSchema>({
  url,
  schema,
  options,
}: Props<Z>) {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return schema.parse(await response.json()) as z.infer<Z>;
}
