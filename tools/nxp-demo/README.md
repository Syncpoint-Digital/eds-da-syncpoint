# NXP Adobe environment demo

The real EDS route in this repo is `/tools/nxp-demo.html`. It is authored in the project’s normal EDS source format, loads `blocks/nxp-workflow/nxp-workflow.js` through `scripts.js`, and its live search block requests `/query-index.json` from the active EDS origin. The source artifacts under `tools/nxp-demo/` are DA documents mounted by `fstab.yaml`. A content link at the top of the route opens the DA source examples.

The UI distinguishes sample artifacts from live tenant actions. The metadata section provides author-source and published-output examples, links to Adobe's Page Metadata, Indexing, and Publishing docs, a representative searchable index, and a JSON-LD example. The portability section shows an AEM Content Fragment Delivery API-shaped response and its mapping into a neutral external CMS shape. “Fetch fragment” uses a real URL entered by the presenter, if the endpoint is reachable and allows browser CORS. It only reads JSON; it does not write to the external CMS.

## Area 3 run of show

1. Open the Adobe [Page Metadata guide](https://www.aem.live/docs/metadata). In DA, add a two-column metadata table whose first row is `Metadata`, then use property/value rows. `metadata-demo.html` is a DA-ready source example.
2. Preview/publish the document in DA, then open its real preview/live URL and inspect page source to see title, meta fields, and JSON-LD. The snippet in the demo is illustrative; use the tenant response for proof.
3. Open Adobe's [Index Admin](https://tools.aem.live/tools/index-admin/index.html), configure an index scope and properties for the published metadata, save, and reindex. The real site index is `/query-index.json`.
4. Search the real index to demonstrate metadata-backed filtering. The local demo's records are sample data; `Download sample JSON` makes that explicit.

Adobe documents that DA indexing is configured through the Index Admin tool; spreadsheet indexing and `helix-query.yaml` do not apply to this DA-backed repo. [Adobe indexing documentation](https://www.aem.live/developer/indexing)

## Area 4 run of show

1. In AEM Assets, create a Content Fragment Model such as `TechnicalArticle`, including `articleId`, `title`, `body`, `product`, `status`, `classification`, `topic`, and `lastReviewed` fields. Create and publish an example fragment.
2. Open the [AEM Content Fragment Delivery OpenAPI tutorial](https://experienceleague.adobe.com/en/docs/experience-manager-learn/getting-started-with-aem-headless/open-api/basic/overview) and use the API Try It workflow or the actual published delivery endpoint for your fragment.
3. Paste the published fragment JSON endpoint into the demo and select **Fetch fragment**. The API response appears beside a mapping to a neutral `technical-article` external CMS record. Check the returned field structure against NXP's Content Fragment Model before presenting the mapping as final.
4. Explain which fields need transformation/validation for NXP's actual destination. The demo renders the destination payload locally; it does not submit or persist it to another CMS.

## What is needed for a genuinely live Adobe demo

- A DA space/site with author access and a branch connected to this EDS repo.
- Permission to use Index Admin for the DA site and publish/reindex content.
- An AEM as a Cloud Service Author plus Publish/Preview environment with Content Fragment Models and Content Fragments enabled, permission to create/publish them, and an authorized delivery endpoint.
- Browser access to the delivery endpoint, including CORS if calling it from the local demo origin. Otherwise use Adobe's Try It panel to fetch the JSON, then use a small local response file or the endpoint from a same-origin proxy.

This repo's EDS preview URLs are `https://main--eds-da-syncpoint--syncpoint-digital.aem.page/tools/nxp-demo.html` (preview) and the corresponding `.aem.live` path (published live), once the code is deployed and the DA source documents are published. No AEM CLI is installed in this repo, so a local static server cannot emulate EDS transformation or DA delivery. No credentials are stored by the demo.
