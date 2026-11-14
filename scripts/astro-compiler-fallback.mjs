// Astro 7 compiles .astro files with a native Rust binding whose linux-x64 build
// needs AVX2. On older x86-64 CPUs loading it dies with SIGILL, so this postinstall
// step swaps it for the official WASI build of the same release. Elsewhere it is a no-op.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function needsWasmCompiler({ platform, arch, cpuinfo }) {
  if (platform !== 'linux' || arch !== 'x64') return false;
  return !/^flags\s*:.*\bavx2\b/m.test(cpuinfo);
}

function readCpuinfo() {
  try {
    return readFileSync('/proc/cpuinfo', 'utf8');
  } catch {
    return '';
  }
}

function main() {
  const cpuinfo = readCpuinfo();
  if (!cpuinfo || !needsWasmCompiler({ platform: process.platform, arch: process.arch, cpuinfo })) return;

  const require = createRequire(join(process.cwd(), 'package.json'));
  let manifest;
  try {
    manifest = require.resolve('@astrojs/compiler-binding/package.json');
  } catch {
    return;
  }
  const scopeDir = dirname(dirname(manifest));
  const { version } = JSON.parse(readFileSync(manifest, 'utf8'));
  const target = join(scopeDir, 'compiler-binding-wasm32-wasi');
  const native = join(scopeDir, 'compiler-binding-linux-x64-gnu');

  if (!existsSync(join(target, 'astro.wasi.cjs'))) {
    const staging = mkdtempSync(join(tmpdir(), 'astro-wasi-'));
    try {
      // --force skips the package's cpu: wasm32 guard; --ignore-scripts keeps the install inert.
      try {
        execFileSync('npm', ['install', '--prefix', staging, '--no-save', '--no-package-lock', '--force', '--ignore-scripts', '--no-audit', '--no-fund', `@astrojs/compiler-binding-wasm32-wasi@${version}`], { stdio: 'inherit' });
      } catch (error) {
        console.error(`astro-compiler-fallback: this CPU lacks AVX2, so Astro needs @astrojs/compiler-binding-wasm32-wasi@${version}, but it could not be downloaded. Check registry access and run npm ci again.`);
        throw error;
      }
      const staged = join(staging, 'node_modules');
      cpSync(join(staged, '@astrojs', 'compiler-binding-wasm32-wasi'), target, { recursive: true });
      // Nest its runtime dependencies so resolution never depends on what else is hoisted.
      for (const dep of ['@napi-rs', '@emnapi', '@tybys', 'tslib']) {
        if (existsSync(join(staged, dep))) cpSync(join(staged, dep), join(target, 'node_modules', dep), { recursive: true });
      }
    } finally {
      rmSync(staging, { recursive: true, force: true });
    }
  }
  // The loader tries the native package first and SIGILL cannot be caught, so it must be absent.
  rmSync(native, { recursive: true, force: true });
  console.log(`astro-compiler-fallback: CPU without AVX2, using WASI compiler ${version}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
