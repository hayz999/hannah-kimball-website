import { createCollectionRoutes } from '@/lib/adminCrud';
import { arrangementsConfig } from '@/lib/adminCrudConfigs';

export const { GET, POST } = createCollectionRoutes(arrangementsConfig);
