import { createItemRoutes } from '@/lib/adminCrud';
import { arrangementsConfig } from '@/lib/adminCrudConfigs';

export const { PUT, DELETE } = createItemRoutes(arrangementsConfig);
