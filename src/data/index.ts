// Types
export * from './types';

// Individual projects
export { fling } from './projects/fling';
export { lastScythe } from './projects/last-scythe';
export { waSirLtaxi } from './projects/wa-sir-ltaxi';
export { ostin8to } from './projects/ostin8to';
export { chaotiles } from './projects/chaotiles';
export { blcs } from './projects/blcs';
export { musee } from './projects/musee';
export { journal2050 } from './projects/journal-2050';

// All projects array
import { fling } from './projects/fling';
import { lastScythe } from './projects/last-scythe';
import { waSirLtaxi } from './projects/wa-sir-ltaxi';
import { ostin8to } from './projects/ostin8to';
import { chaotiles } from './projects/chaotiles';
import { blcs } from './projects/blcs';
import { musee } from './projects/musee';
import { journal2050 } from './projects/journal-2050';
import { Project } from './types';

export const projects: Project[] = [
  fling,
  lastScythe,
  waSirLtaxi,
  ostin8to,
  chaotiles,
  blcs,
  musee,
  journal2050
];
