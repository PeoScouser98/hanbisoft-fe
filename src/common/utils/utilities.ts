/**
 * Utility methods
 */
export default {
	isJSON(value) {
		try {
			return !!JSON.parse(value);
		} catch (error) {
			return false;
		}
	}
};
