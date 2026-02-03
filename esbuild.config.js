import { build } from 'esbuild';
import fs from 'fs';

const license = fs.readFileSync('LICENSE', 'utf8');

build({
  entryPoints: ['./dist/index.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'jtYxtus',
  outfile: './dist/jt.yxtus.min.js',
  banner: {
    js: `/*\n${license}\n*/`
  },
  footer: {
    js: 'jtYxtus = jtYxtus.default;'
  }
}).catch(() => process.exit(1));