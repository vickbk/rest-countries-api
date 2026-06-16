Because the v5 API limits individual network requests to a maximum of **100 records per page** (`limit=100`), your helper needs to iteratively loop through the pages using the `offset` parameter, accumulate the results, and deliver a unified array to your Next.js Server Components.

---

## 🗺️ Phase 1: Pagination Parameter & Type Setup

- [x] **Define Paging Constraints**
- [x] Establish explicit constants matching the v5 limits:

```ts
const MAX_LIMIT = 100;
const DEFAULT_OFFSET = 0;
```

- [ ] **Model the Paginated Response Signature**
- [ ] Update your v5 API payload wrapper types to reflect the list data shape returned from paginated endpoints:

```ts
export interface PaginatedResponse<T> {
  data: T[];
  // Account for any metadata attributes provided in v5 responses
}
```

---

## ⚙️ Phase 2: Implementing the Auto-Accumulator Engine

- [ ] **Build the Recursive/Iterative Fetch Loop**
- [ ] Inside your helper client, build a private `fetchAllPages` method. This method handles tracking the `offset` and appending data until the API returns no more entries:

```ts
private async fetchAllPages<T>(url: string, options?: RequestInit): Promise<T[]> {
  let allRecords: T[] = [];
  let currentOffset = 0;
  let hasMore = true;

  while (hasMore) {
    const separator = url.includes('?') ? '&' : '?';
    const targetUrl = `${url}${separator}limit=${MAX_LIMIT}&offset=${currentOffset}`;

    const response = await this.request<PaginatedResponse<T>>(targetUrl, options);
    const batch = response.data || [];

    allRecords = [...allRecords, ...batch];

    if (batch.length < MAX_LIMIT) {
      hasMore = false;
    } else {
      currentOffset += MAX_LIMIT;
    }
  }

  return allRecords;
}

```

- [ ] **Add Network & Rate-Limit Safeguards**
- [ ] Integrate error handling inside the loop to break out safely if an intermediary page returns a non-200 status (e.g., a `429 Too Many Requests` error), avoiding infinite loops.

---

## 🔌 Phase 3: Abstracing Paging Behind Legacy Methods

- [ ] **Update Core Package Utility Methods**
- [ ] Update `getCountries()` to route internally through the auto-accumulator function so your Next.js page receives the complete 250+ country array seamlessly.
- [ ] Update `getCountriesByRegion(region: string)` to use the exact same looping logic. This preserves your existing select-box dropdown filters without changing your downstream code.

- [ ] **Pass Server Directives Smoothly**
- [ ] Ensure that your main pagination loop forwards your custom Next.js fetch configurations (such as `{ next: { revalidate: 86400 } }`) straight down to every internal sub-page request.

---

## 🧪 Phase 4: Verification & Performance Tweaks

- [ ] **Validate Array Flattening Output**
- [ ] Verify that your helper outputs a clean, flat array of complete country records rather than nested arrays.

- [ ] **Compare Response Speed and Caching Performance**
- [ ] Run a test compile to ensure your Next.js Server Components securely execute this sequence on the server side, keeping the multi-page fetching entirely invisible to the end user's browser.
