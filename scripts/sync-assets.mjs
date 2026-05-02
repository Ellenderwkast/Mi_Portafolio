import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const assetPairs = [
  ['Mi imagen Ellenderdev/mi imagen.jpeg', 'public/assets/profile/mi-imagen.jpeg'],
  ['imagenes de open/home.png', 'public/assets/open/open-home.png'],
  ['imagenes de open/Screenshot_1777706137.png', 'public/assets/open/open-1.png'],
  ['imagenes de open/Screenshot_1777706142.png', 'public/assets/open/open-2.png'],
  ['imagenes de open/Screenshot_1777706172.png', 'public/assets/open/open-3.png'],
  ['imagenes del e-comerce/Sin título1.png', 'public/assets/ecommerce/ecommerce-1.png'],
  ['imagenes del e-comerce/Sin título2.png', 'public/assets/ecommerce/ecommerce-2.png'],
  ['imagenes del e-comerce/Sin título3.png', 'public/assets/ecommerce/ecommerce-3.png'],
  ['imagenes CRM GYM/Sin título.png', 'public/assets/crm/crm-1.png'],
  ['imagenes CRM GYM/Sin título1.png', 'public/assets/crm/crm-2.png'],
];

for (const [sourceRelativePath, targetRelativePath] of assetPairs) {
  const sourcePath = resolve(rootDir, sourceRelativePath);
  const targetPath = resolve(rootDir, targetRelativePath);

  mkdirSync(dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);
}

console.log(`Sincronizados ${assetPairs.length} assets hacia public/.`);