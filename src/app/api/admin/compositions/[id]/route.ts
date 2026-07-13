import { createItemRoutes } from '@/lib/adminCrud';
import { compositionsConfig } from '@/lib/adminCrudConfigs';

export const { PUT, DELETE } = createItemRoutes(compositionsConfig);
