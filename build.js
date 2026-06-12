const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const entries = {
  global: path.resolve(__dirname, 'src/global/index.ts'),
  case: path.resolve(__dirname, 'src/pages/case.ts'),
};

const outdir = path.resolve(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

// Build each entry point separately as IIFE
Promise.all(
  Object.entries(entries).map(([name, entry]) =>
    esbuild.build({
      entryPoints: [entry],
      outfile: path.join(outdir, `${name}.js`),
      format: 'iife',
      bundle: true,
      minify: false,
    })
  )
)
  .then(() => {
    console.log('Build successful!');
    console.log(`Generated: ${path.join(outdir, 'global.js')}`);
    console.log(`Generated: ${path.join(outdir, 'case.js')}`);
  })
  .catch(() => process.exit(1));
