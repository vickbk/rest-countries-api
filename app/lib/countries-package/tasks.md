# Tasks for implementing the wrapper for rest countries api

## 📐 Phase 1: Type Architecture & Schema Modeling

- [ ] **Define the Core Country Types**
- [ ] Recreate the explicit type definitions for a country object (e.g., `Country`, `CountryName`, `Flags`, `Currencies`) matching the properties your UI components currently consume.

- [ ] **Model the v5 Response Wrapper**
- [ ] Create a generic API wrapper interface to account for the new v5 top-level response envelope:

```ts
export interface RestCountriesResponse<T> {
  data: T;
  status: number;
  message?: string;
}
```

- [ ] **Define Method Parameter Options**
- [ ] Establish strict types for method filtering, sorting, or field-selection arguments (e.g., `fields?: string[]`, `region?: Region`).

---

## ⚙️ Phase 2: Client Initialization & Configuration

- [ ] **Design the Client Instantiation Layout**
- [ ] Decide between a class-based client or a factory function approach. A factory function or class allows you to inject the API key once at the root layout level rather than passing it into every single function call.

- [ ] **Enforce Strict Environment Validation**
- [ ] Add a runtime validation check to throw a descriptive error if the helper is executed without a valid API key present in the initialization options.

---

## 🔌 Phase 3: Core Method Implementation (v5 Compliant)

- [ ] **Implement the Base Fetch Mechanism**
- [ ] Create a private/internal `request` helper that automatically appends the base URL (`https://api.restcountries.com/countries/v5`) and injects the `Authorization: Bearer <key>` header on every execution.

- [ ] **Expose Next.js Fetch Customization**
- [ ] Allow functions to accept an optional `fetchOptions?: FetchOptions` configuration argument so your Next.js Server Components can pass cache directives like `{ next: { revalidate: 3600 } }` straight through the wrapper.

- [ ] **Replicate Legacy Utility Signatures**
- [ ] Implement `getCountries(options?: Options)` to pull the complete list.
- [ ] Implement `getCountryByCca3(code: string)` for your details layout routing.
- [ ] Implement `getCountriesByRegion(region: string)` to preserve your current navigation filters.

---

## 🧼 Phase 4: Data Layer Transformation & Error Handling

- [ ] **Unwrap the Data Envelopes**
- [ ] Ensure that all public-facing methods automatically parse the response and return _only_ the inner typed payloads (e.g., returning `payload.data`), hiding the API envelope noise from your page components.

- [ ] **Build Strict HTTP Error Catching**
- [ ] Implement response status checking (`if (!res.ok)`) inside the core request method to gracefully throw informative errors (e.g., parsing 401 for bad keys or 429 for rate limit overages) before the application crashes trying to read data.

---

## 🧪 Phase 5: Verification & Mapping Validation

- [ ] **Verify Property Mapping Integrity**
- [ ] Compare the objects returned by your custom helper against your existing Next.js Page rendering code to ensure fields like `.name.common` or `.flags.svg` match perfectly without forcing UI updates.

- [ ] **Verify Key Enclosure Isolation**
- [ ] Run a test compile to verify that everything executes seamlessly server-side inside your components, keeping your token completely isolated from the browser context.
