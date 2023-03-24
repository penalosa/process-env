// @ts-ignore
import { AsyncLocalStorage } from 'node:async_hooks';

const cloudflareEnv = new AsyncLocalStorage();

// @ts-ignore
globalThis.process = {
  env: new Proxy(
    {},
    {
      get(_, property) {
        return cloudflareEnv.getStore()[property];
      },
    }
  ),
};

export function withProcessEnv<A, B, C>(
  handlers: ExportedHandler<A, B, C>
): ExportedHandler<A, B, C> {
  return {
    ...handlers,
    ...(handlers.fetch && {
      fetch: (request, env, ctx) =>
        cloudflareEnv.run(env, () => handlers.fetch!(request, env, ctx)),
    }),
  };
}
