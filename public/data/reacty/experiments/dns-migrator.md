# DNS Migration & Cloudflare Worker Setup Plan (Squarespace‑Managed Domains)

**Domains affected:**

* `highlandscastleholdings.com` (primary, **Squarespace‑registered** / formerly Google Domains)
* `hcastleh.com` (alias, **Squarespace‑registered**)

**Goals**

1. Serve Cloudflare Worker at

   * `todd.highlandscastleholdings.com`
   * `todd.hcastleh.com`
2. Preserve existing Wix website (`www.highlandscastleholdings.com`).
3. Preserve Google Workspace email for both zones.
4. Keep `hcastleh.com` traffic forwarding to `highlandscastleholdings.com`.
5. Achieve near‑zero downtime and provide rollback.

---

## 1  Checklist of Required Facts

| # | Needed information                                                                                         | Why                                              |
| - | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 1 | **Current Squarespace name‑server set** for each domain (`ns1.squarespacedns.com`, etc.)                   | Confirms Squarespace is authoritative today.     |
| 2 | Complete list of current DNS records (download CSV or copy from **Squarespace → Domains → DNS settings**). | Re‑create records in Cloudflare before cut‑over. |
| 3 | Forwarding method for `hcastleh.com` (Squarespace “Forwarding & Masking” vs. normal A/CNAME + redirect)    | Determines redirect strategy.                    |
| 4 | Custom TXT/CAA records (SPF, DMARC, DKIM, site verifications)                                              | Avoid post‑migration mail/service failures.      |
| 5 | Preferred maintenance window and acceptable downtime (if any)                                              | TTL tuning & switch timing.                      |
| 6 | Decision: **Full Cloudflare DNS** vs. **Partial (CNAME) setup**                                            | Impacts steps 5‑6 and rollback.                  |

---

## 2  Preparation Steps (≥24 h before window)

1. Collect all data in **Section 1**.
2. In **Squarespace Domains → DNS Settings**:

   * Copy/export the current record list (CSV download or manual copy).
   * Edit each record and set **TTL = 300 seconds**.
3. Wait ≥30 min to ensure low‑TTL propagation.

### Windows verification commands

```powershell
Resolve-DnsName highlandscastleholdings.com -Type NS
Resolve-DnsName hcastleh.com -Type NS
Resolve-DnsName highlandscastleholdings.com -Type SOA
```

---

## 3  Cloudflare Staging (Do **before** NS switch)

1. **Add both zones** to a free Cloudflare account; *do not* change NS yet.
2. Compare Cloudflare’s auto‑import with your Squarespace record list; manually add any missing entries:

   * Wix: `@` A records (2) and `www` CNAME per Wix docs.
   * Google Workspace: MX, SPF TXT, DKIM, DMARC.
   * All existing TXT, CAA, SRV, etc.
3. **Create Worker custom domains**

   * Cloudflare → **Workers & Pages → your‑worker → Triggers → Custom Domains**.
   * Add `todd.highlandscastleholdings.com` & `todd.hcastleh.com`.
   * Cloudflare autogenerates proxied CNAMEs and SSL certs.
4. **Alias redirect options**

   * *Preferred*: Cloudflare **Rules → Bulk Redirects** 301 `hcastleh.com/*` → `https://highlandscastleholdings.com/$1`.
   * *Alternate*: Keep Squarespace’s domain forwarding & choose partial setup.

---

## 4  Cut‑over Procedure (Maintenance window)

> **Estimated downtime:** <5 min if TTL = 300 s.

| Step | Action                                                                                          | Windows command / UI                                                  |
| ---- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1    | Confirm Cloudflare zone parity                                                                  | `Resolve-DnsName highlandscastleholdings.com -Server <Cloudflare-NS>` |
| 2    | In **Squarespace Domains** → *Nameservers*, replace Squarespace NS with the **Cloudflare pair** | Squarespace Domains UI                                                |
| 3    | Monitor propagation (loop script below)                                                         | *(see script beneath table)*                                          |
| 4    | Verify critical records via `1.1.1.1` & `8.8.8.8`                                               | `nslookup -type=mx highlandscastleholdings.com 1.1.1.1`               |
| 5    | Functional tests (site, worker, email, redirect)                                                | Browser & mail client                                                 |

**PowerShell loop for Step 3**

```powershell
while ($true) {
    Resolve-DnsName highlandscastleholdings.com -Type NS
    Start-Sleep 30
}
```

**Functional tests for Step 5**

* Load `https://www.highlandscastleholdings.com`
* Load `https://todd.highlandscastleholdings.com`
* Send & receive email at *@highlandscastleholdings.com*
* Browse `hcastleh.com` → should 301‑redirect to the primary root

---

## 5  Validation Checklist

* [ ] Cloudflare NS authoritative for both zones (`Resolve‑DnsName ... -Type NS`).
* [ ] Wix site loads (A/CNAME records correct, Cloudflare orange‑cloud **off** if Wix requires).
* [ ] Worker responds on both sub‑domains (HTTP 200).
* [ ] MX/SPF/DKIM/DMARC pass (check with [MXToolbox](https://mxtoolbox.com)).
* [ ] Alias domain redirects with 301 status.

### Rollback

If a critical failure occurs, revert registrar NS entries back to the Squarespace name‑server set (thanks to low TTL, restoration is immediate).

---

## 6  Reference Docs & Sources

| Topic                                         | Docs                                                                                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Squarespace Domains DNS overview              | [https://support.squarespace.com/hc/en-us/articles/206543637](https://support.squarespace.com/hc/en-us/articles/206543637)                                             |
| Squarespace “Forward to URL”                  | [https://support.squarespace.com/hc/en-us/articles/205812378](https://support.squarespace.com/hc/en-us/articles/205812378)                                             |
| Cloudflare Workers → Custom Domains           | [https://developers.cloudflare.com/workers/platform/custom-domains](https://developers.cloudflare.com/workers/platform/custom-domains)                                 |
| Cloudflare DNS zone setups (Full vs. Partial) | [https://developers.cloudflare.com/dns/zone-setups](https://developers.cloudflare.com/dns/zone-setups)                                                                 |
| Cloudflare Bulk Redirect Rules                | [https://developers.cloudflare.com/rules/bulk-redirects](https://developers.cloudflare.com/rules/bulk-redirects)                                                       |
| Wix DNS requirements                          | [https://support.wix.com/en/article/adding-or-updating-records-in-your-wix-account](https://support.wix.com/en/article/adding-or-updating-records-in-your-wix-account) |
| Google Workspace MX & SPF records             | [https://support.google.com/a/answer/174125](https://support.google.com/a/answer/174125)                                                                               |
