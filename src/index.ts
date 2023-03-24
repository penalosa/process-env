import { withProcessEnv } from './inject-process';

function sayHello() {
  return process.env.MY_TEST_NAMESPACE.get('hello');
}

export default withProcessEnv({
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/hello':
        return new Response(await process.env.MY_TEST_NAMESPACE.get('hello'));
      case '/store':
        await env.MY_TEST_NAMESPACE.put(
          'hello',
          url.searchParams.get('value') ?? 'world'
        );
        return new Response(await sayHello());
    }
    return new Response(await sayHello());
  },
});
