import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('build wrapper forwards Astro CLI flags', () => {
  const result = spawnSync(process.execPath, ['scripts/build.mjs', '--help'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout + result.stderr, /--outDir/);
});
