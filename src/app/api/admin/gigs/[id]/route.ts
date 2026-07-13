import { createItemRoutes } from '@/lib/adminCrud';
import { gigsConfig } from '@/lib/adminCrudConfigs';

export const { PUT, DELETE } = createItemRoutes(gigsConfig);
