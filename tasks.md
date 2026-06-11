# Tasks Manager

## 🗺️ Phase 1: API Setup & Environment Configuration

- [x] **Account Creation & Key Retrieval**
- [x] Register a free account at [restcountries.com](https://restcountries.com/).
- [x] Copy your generated API Live Key from the dashboard.

- [x] **Configure Environment Variables**
- [x] Open your root `.env.local` file and save the token securely without any public prefixes:

```env
REST_COUNTRIES_API_KEY=your_live_key_here

```

- [x] Ensure `.env.local` is listed in your `.gitignore` file to prevent accidental leaks to GitHub.

## 🔌 Phase 2: Updating the Server-Side Fetching Code

- [ ] **Update Endpoint and Security Headers**
- [ ] Locate your Next.js Server Component page (e.g., `src/app/page.tsx`).
- [ ] Update the target URL string to the new endpoint: `https://api.restcountries.com/countries/v5`.
- [ ] Pass the token securely inside the fetch options configuration:

```ts
const res = await fetch("https://api.restcountries.com/countries/v5", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}`,
    "Content-Type": "application/json",
  },
  next: { revalidate: 86400 }, // Keep your existing cache layout active
});
```

- [ ] **Remap the Data Payload Envelope**
- [ ] Update your data parsing assignments. The new v5 payload returns your country array wrapped inside a top-level `data` block.
- [ ] Update your component mapping loops to read from `response.data` instead of mapping directly over the raw response root.

## 🧪 Phase 3: Production Validation

- [ ] **Verification Checklist**
- [ ] Run a local production build (`npm run build` or `pnpm build`) to verify that data typing boundaries parse cleanly without compiler errors.
- [ ] Confirm your search features and region dropdown filters map properties correctly against the new v5 data objects.
