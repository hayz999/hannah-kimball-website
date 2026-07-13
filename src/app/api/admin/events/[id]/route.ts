import { createItemRoutes } from '@/lib/adminCrud';
import { eventsConfig } from '@/lib/adminCrudConfigs';

export const { PUT, DELETE } = createItemRoutes(eventsConfig);
