# Scenario Answers

## C1. How would you prove that our Xero API connection is working before checking invoices?

**Three-step verification:**

1. **Check tenant connections** — `GET https://api.xero.com/connections`, expect `200 OK` with valid `tenantId`
2. **Verify token validity** — Ensure access token is not expired (Xero tokens expire in 30 min); refresh if needed
3. **Lightweight ping** — `GET https://api.xero.com/api.xro/2.0/Organization`. A `200 OK` confirms network, token, and tenant are all working

---

## C2. If `/connections` works but `GET /Invoices` fails, what would you check?

**Possible causes:**

1. **Missing `Xero-Tenant-Id` header** — required on `/Invoices` requests
2. **Insufficient OAuth scopes** — ensure `accounting.transactions` or `accounting.transactions.read` is authorized
3. **HTTP status code analysis:**
   - `401` — Token expired between the two calls
   - `403` — User lacks permission to view invoices
   - `400` — Invalid request parameters (date format, `where` clause syntax, etc.)

---

## C3. What endpoint would you call to check invoices?

```
GET https://api.xero.com/api.xro/2.0/Invoices
Headers: Authorization, Xero-Tenant-Id, Accept: application/json
```

**Optimizations:** Pagination (`?page=1`), filtering (`?where=Status=="AUTHORISED"`), incremental sync (`If-Modified-Since`)

---

## C4. How would you check one specific invoice?

- **By InvoiceID:** `GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}`
- **By invoice number:** `GET /Invoices?where=InvoiceNumber=="INV-0042"`

---

## C5. If the invoice API returns 429, how should the backend handle it?

1. **Read `Retry-After` header** — wait the specified seconds before retrying
2. **Exponential backoff + jitter** — prevent thundering herd when multiple workers resume simultaneously
3. **Circuit breaker** — pause all requests for the affected tenant after consecutive 429s
4. **Proactive prevention:** local rate limiter (token bucket) + batch requests to reduce API calls
