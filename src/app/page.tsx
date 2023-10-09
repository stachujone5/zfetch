import { z } from "zod";
import { zfetch } from "./zfetch";

const product = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

const schema = z.object({
  products: z.array(product),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export default async function Home() {
  const data = await zfetch({ schema, path: "/products" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.products.map((p) => (
        <p key={p.id}>{p.brand}</p>
      ))}
    </main>
  );
}
