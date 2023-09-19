import { SavedEvent } from 'devextreme/ui/data_grid';

export default function getDataGridChanges(e: SavedEvent<any, any>) {
	const updatedData = e.changes.filter((item) => item.type === 'update');
	const newData = e.changes.filter((item) => item.type === 'insert');
	const deletedData = e.changes.filter((item) => item.type === 'remove');
	return { updatedData, newData, deletedData };
}
