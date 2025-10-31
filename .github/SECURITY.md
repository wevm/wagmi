## Security Vulnerability Report: Prototype Pollution in Sub-Dependency

**Subject:** High Severity Security Vulnerability (Prototype Pollution) in `fast-redact` sub-dependency (CVE-2025-57319)

---

### 1. Overview

* **Vulnerable Component:** `fast-redact`
* **Type of Vulnerability:** Prototype Pollution (CWE-1321)
* **Severity:** High (Denial of Service, potential for broader impact if chained)
* **GitHub Security Advisory:** GHSA-ffrw-9mx8-89p8
* **CVE ID:** CVE-2025-57319

---

### 2. Affected Package & Dependency Chain

* **Affected `wagmi` Version:** `wagmi@2.19.1`
    * *Note: Also observed in @wagmi/connectors@6.1.2 and porto@0.2.35*
* **Dependency Chain:** The vulnerability is inherited through the logging infrastructure.
    * *(Example trace): `wagmi` $\rightarrow$ `[Intermediate Logging Dependency]` $\rightarrow$ `pino` $\rightarrow$ `fast-redact@3.5.0` (or older).*

---

### 3. Description of the Issue

The vulnerability exists in the `fast-redact` package (specifically versions `<= 3.5.0`). The function `nestedRestore` is susceptible to Prototype Pollution, which allows an attacker to inject properties onto `Object.prototype` via a crafted payload.

While primarily noted as a Denial of Service (DoS) risk, Prototype Pollution can potentially be chained with other application logic to achieve more critical consequences depending on downstream usage of polluted objects.

---

### 4. Suggested Resolution

The underlying vulnerability has been addressed in upstream packages.

* **Fixed Upstream:** The issue is resolved in versions of `pino` that have either patched `fast-redact` or replaced it with the secure **`slow-redact`** dependency.
* **Action Required for `wagmi`:** Please update the relevant dependency versions within the `wagmi` and `@wagmi/connectors` packages to ensure a fixed version of the logging dependency is pulled into the overall dependency tree.
