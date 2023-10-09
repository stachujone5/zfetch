# zfetch Showcase

This repository showcases the `zfetch` function which serves as a utility for making type-safe API requests. It ensures that the JSON response from the API matches a given Zod schema and returns validated data.

## Installation

Before running the application, ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

```bash
# Clone the repository
git clone https://github.com/stachujone5/zfetch.git

# Change directory
cd zfetch

# Install dependencies
pnpm install
```

## Usage

Below is an example of how the `zfetch` function can be used to fetch and validate data from an API endpoint.

```tsx
import { z } from "zod";
import { zfetch } from "./zfetch";

// Define a schema for the API response
const schema = z.object({
  products: z.array(
    z.object({
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
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Use the zfetch function to fetch and validate data
export default async function Home() {
  const data = await zfetch({ schema, url: "/products" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.products.map((p) => (
        <p key={p.id}>{p.brand}</p>
      ))}
    </main>
  );
}
```

## Code

The `zfetch` function is defined as follows:

```ts
import { ZodSchema, z } from "zod";

// URL of the API we are fetching from
const BASE_URL = "https://dummyjson.com";

type Props<Z> = {
  url: string;
  schema: Z;
  options?: Parameters<typeof fetch>["1"];
};

export async function zfetch<Z extends ZodSchema>({
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
```

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
