import { spawnSync } from 'node:child_process';

// Keep Astro/Sharp within the small development host's memory budget.
const result = spawnSync(process.execPath, [
  '--max-old-space-size=768',
  './node_modules/astro/astro.js',
  'build',
  ...process.argv.slice(2),
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    UV_THREADPOOL_SIZE: '1',
    VIPS_CONCURRENCY: '1',
    MALLOC_ARENA_MAX: '2',
  },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
