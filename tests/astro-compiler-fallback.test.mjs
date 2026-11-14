import assert from 'node:assert/strict';
import test from 'node:test';
import { needsWasmCompiler } from '../scripts/astro-compiler-fallback.mjs';

const withoutAvx2 = 'processor\t: 0\nflags\t\t: fpu sse4_2 avx aes\n';
const withAvx2 = 'processor\t: 0\nflags\t\t: fpu sse4_2 avx avx2 bmi2 fma\n';

test('uses the WASI compiler only on linux x64 without AVX2', () => {
  assert.equal(needsWasmCompiler({ platform: 'linux', arch: 'x64', cpuinfo: withoutAvx2 }), true);
  assert.equal(needsWasmCompiler({ platform: 'linux', arch: 'x64', cpuinfo: withAvx2 }), false);
  assert.equal(needsWasmCompiler({ platform: 'linux', arch: 'arm64', cpuinfo: withoutAvx2 }), false);
  assert.equal(needsWasmCompiler({ platform: 'darwin', arch: 'x64', cpuinfo: withoutAvx2 }), false);
});
