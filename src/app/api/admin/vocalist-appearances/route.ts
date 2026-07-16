import { createCollectionRoutes } from '@/lib/adminCrud';
import { vocalistAppearancesConfig } from '@/lib/adminCrudConfigs';

export const { GET, POST } = createCollectionRoutes(vocalistAppearancesConfig);
