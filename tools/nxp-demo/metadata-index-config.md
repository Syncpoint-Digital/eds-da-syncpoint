# NXP metadata index configuration

Configure these properties in Adobe's [Index Admin tool](https://tools.aem.live/tools/index-admin/index.html) for the DA-backed `eds-da-syncpoint` site. Index definitions for DA are maintained through Index Admin, not by a `helix-query.yaml` file or a query-index spreadsheet. This checklist is configuration guidance; it has not been applied to a tenant.

| Index property | HTML extraction |
| --- | --- |
| title | `og:title` (built-in) |
| description | `meta[name="description"]` (built-in) |
| tags | `meta[name="article:tag"]` (built-in) |
| product | `meta[name="product"]` |
| topic | `meta[name="topic"]` |
| classification | `meta[name="classification"]` |
| status | `meta[name="status"]` |

Set the index to include `/tools/nxp-demo/**`, save, and reindex. The published index is `/query-index.json`. Check the actual output before presenting; if custom fields are missing, inspect the published HTML metadata and the index configuration.

The block added in `blocks/nxp-workflow/` calls `GET /query-index.json` on the current EDS origin. Its status line reports the HTTP result and record count. A local sample list is not substituted when the real endpoint is missing.
