import { useMutation, useQueryClient } from '@tanstack/react-query';
import SiteSettingService from '../api/site_setting.service';

/**
 * Update site settings
 */
export function useUpdateSiteSettingMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['site_settings'],
		mutationFn: SiteSettingService.updateSiteSettings,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['site_settings'] })
	});
}
