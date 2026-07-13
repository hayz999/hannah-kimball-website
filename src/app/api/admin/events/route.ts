import { createCollectionRoutes } from '@/lib/adminCrud';
import { eventsConfig } from '@/lib/adminCrudConfigs';

export const { GET, POST } = createCollectionRoutes(eventsConfig);
