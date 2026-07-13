import { createCollectionRoutes } from '@/lib/adminCrud';
import { gigsConfig } from '@/lib/adminCrudConfigs';

export const { GET, POST } = createCollectionRoutes(gigsConfig);
