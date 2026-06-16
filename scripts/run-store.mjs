/**
 * Run PAWRA Hydrogen dev from repo root with correct working directory.
 * Avoids Shopify CLI picking up the wrong folder when the repo path has spaces.
 */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const storeDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'hydrogen-quickstart');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const script = process.argv[2] || 'dev';

const child = spawn(npmCmd, ['run', script], {
  cwd: storeDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 1));
