import { useMutation, useQueryClient } from '@tanstack/react-query';
import SiteSettingService from '../api/site_setting.service';

const QUERY_KEY = 'site_settings';
/**
 * Update site settings
 */
export function useUpdateSiteSettingMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY],
		mutationFn: SiteSettingService.updateSiteSettings,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['site_settings'] })
	});
}
