import { InputPluginOption } from 'rollup';
import crypto from 'crypto';

export default function importMapSRI(): InputPluginOption {
  return {
    name: 'import-map-sri',
    generateBundle(_options, bundle) {
      const importmap: { imports: { [key: string]: string }, integrity: { [key: string]: string } } = {
        imports: {},
        integrity: {}
      };

      for (const [filename, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          const hash = crypto
            .createHash('sha384')
            .update(chunk.code)
            .digest('base64');

          importmap.imports[`/${filename}`] = `/${filename}`;
          importmap.integrity[`/${filename}`] = `sha384-${hash}`;
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: 'import-map.json',
        source: JSON.stringify(importmap, null, 2)
      });
    }
  };
}
