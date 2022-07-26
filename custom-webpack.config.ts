import type { Configuration } from 'webpack';

module.exports = {
    entry: { background: 'src/background.ts', contentScript: 'src/content-script.ts' }
} as Configuration;