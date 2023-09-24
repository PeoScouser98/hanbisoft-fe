import { SavedEvent } from 'devextreme/ui/data_grid';

/**
 * @description Get updated, inserted and deleted data from data grid
 * @param {SavedEvent<any, any>} e
 */
export default function getDataChanges(e: SavedEvent<any, any>) {
	const updatedData = e.changes.filter((item) => item.type === 'update');
	const newData = e.changes.filter((item) => item.type === 'insert');
	const deletedData = e.changes.filter((item) => item.type === 'remove');
	return { updatedData, newData, deletedData };
}
