# `process-env`

An example worker that shows how you could implement `process.env` support using Proxies and Cloudflare's new [`AsyncLocalStorage`](https://blog.cloudflare.com/workers-node-js-asynclocalstorage/)

It's as simple as wrapping your exported handler in `injectProcessEnv`, which will make `process.env` available throughout your worker call stack. See `wrangler-configuration.d.ts` for the relevant typing to make this play nice with Typescript.