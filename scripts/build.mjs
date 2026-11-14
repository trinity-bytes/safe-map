import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// Resolve the CLI from Astro's own manifest: its location changes between majors.
const require = createRequire(import.meta.url);
const astroManifest = require.resolve('astro/package.json');
const astroBin = join(dirname(astroManifest), require(astroManifest).bin.astro);

// Keep Astro/Sharp within the small development host's memory budget.
const result = spawnSync(process.execPath, [
  '--max-old-space-size=768',
  astroBin,
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
