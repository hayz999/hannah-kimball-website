import { createCollectionRoutes } from '@/lib/adminCrud';
import { compositionsConfig } from '@/lib/adminCrudConfigs';

export const { GET, POST } = createCollectionRoutes(compositionsConfig);
