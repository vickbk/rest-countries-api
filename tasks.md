# Caching strategy

## 🛠️ Phase 1: Environment & Configuration Prep

Before using `cacheTag`, you need to tell Next.js to activate the new component-level caching layer.

- [x] **Activate Cache Components in Configuration**
- [x] Open your `next.config.ts` (or `next.config.js`) file.
- [x] Add the `cacheComponents` feature flag to your configuration object:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true, // Enables the 'use cache' and cacheTag APIs globally
};

export default nextConfig;
```

---

## 📐 Phase 2: Updating the Core Function with `'use cache'`

Instead of writing a complex external abstraction wrapper, you can inject the caching directives directly inside your existing deduplication function block.

- [x] **Import Native Cache Utilities**
- [x] Pull `cacheTag` (and optionally `cacheLife` if you want to set custom expiry rules) from the core library:

```ts
import { cacheTag, cacheLife } from "next/cache";
```

- [x] **Refactor `getAllCountries` Execution Block**
- [x] Inject the `'use cache'` boundary directive at the absolute top of the function scope.
- [x] Declare your tracking tag string using `cacheTag()`.

```ts
export async function getAllCountries({
  q,
  page = 0,
  ...options
}: {
  q?: string;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
  page?: number;
}) {
  "use cache"; // Mark this asynchronous loop block as cacheable
  cacheTag("countries:page"); // Assign the on-demand invalidation tag
  cacheLife("days"); // Set default stale/expire timeline profile to days

  q = q || undefined;
  const limit = 12;
  const offset = limit * page;

  // ... your existing concurrent Promise.all fetch and deduplication logic goes here

  return results;
}
```

> ⚠️ **Important Architecture Note:** Because Next.js auto-serializes arguments inside a `'use cache'` execution block, passing `page=0` and `page=1` automatically yields two completely independent, distinct memory slots under the hood. They will both respond to the collective tracking label `countries:page` when you trigger a purge.

---

## 🎛️ Phase 3: Syncing the On-Demand Revalidation Channel

- [x] **Update Your Revalidation Webhook Handler**
- [x] Open your background clearing endpoint file (`src/app/api/revalidate/route.ts`).
- [x] Keep using the standard `revalidateTag` utility, but match it to your updated string key label:

```ts
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Instantly flushes every combined search variation and pagination block linked to this tag
  revalidateTag("countries:page");

  return NextResponse.json({
    revalidated: true,
    message: "Successfully invalidated all country datasets.",
  });
}
```

---

## 🧪 Phase 4: Validating Output in the Build Terminal

- [ ] **Verify Dynamic Compilations**
- [ ] Compile the layout via `npm run build` or `pnpm build`.
- [ ] Double-check that your server code executes normally. This declarative approach keeps your custom REST API pagination and unique filter algorithms protected on the server, serving lightning-fast cached responses to the user.
