import { createItemRoutes } from '@/lib/adminCrud';
import { vocalistAppearancesConfig } from '@/lib/adminCrudConfigs';

export const { PUT, DELETE } = createItemRoutes(vocalistAppearancesConfig);
