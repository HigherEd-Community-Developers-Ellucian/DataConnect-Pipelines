# Multi-Destination Deliverable Pattern for Ellucian Data Connect

> **Pipelines included:**
> - `tenantname-reduce-and-save-deliverable` — *accumulates and stores a deliverable in the pipeline context*
> - `tenantname-restore-deliverable-and-for-each` — *restores the deliverable to the payload before each destination fitting*

This repository contains two complementary **Subpipelines** that let a single Data Connect pipeline **send one generated deliverable to multiple destination fittings**—without re-creating or re-reading the data each time. Please replace the "tenantname" with your tenant for uniqueness.

---

## 🚀 Overview

### The Problem
In Data Connect, each **destination fitting** (e.g., SFTP Put and File Writer) **replaces the `payload`** when it runs.  
If you need to send the *same* output to more than one destination, you would normally have to rebuild it for each fitting.

### The Solution
This pattern separates the workflow into two reusable subpipelines:
1. **Reduce & Save Deliverable** — builds and stores the deliverable *once* in the shared `context`.
2. **Restore & For Each** — retrieves that deliverable and puts it back on the `payload` **before each destination fitting**, ensuring every destination receives the same data.
* **Custom Parameter "deliverableName"**: By default, the file that you seek to retain will be saved on the context under the name "deliverable", but if you give "deliverableName" a value and place it in the context, that will be the location where these custom fittings (ie. sub-pipelines) will store and "restore" from. This allows for multiple files to be saved if desired.

---

## 🧩 Architecture

```mermaid
flowchart TD
  A[Data Sources & Transforms]
  A --> B[Subpipeline: Reduce & Save Deliverable]
  B -->|context.deliverable| C[Context Storage]
  C --> D1[Restore & For Each → Destination A]
  C --> D2[Restore & For Each → Destination B]
  C --> D3[Restore & For Each → Destination C]
