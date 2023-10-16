import { TDataGridProps } from '@/types/global';

const defaultProps: TDataGridProps = {
	columns: [
		{ dataField: 'field' },
		{ dataField: 'expressions.en' },
		{ dataField: 'expressions.kr' },
		{ dataField: 'collection' }
	],
	keyExpr: '_id',
	remoteOperations: false,
	editing: {
		mode: 'batch',
		useIcons: true,
		allowAdding: true,
		allowUpdating: true,
		startEditAction: 'dblClick',
		newRowPosition: 'viewportBottom'
	},
	selection: {
		showCheckBoxesMode: 'always',
		selectAllMode: 'allPages',
		mode: 'multiple',
		allowSelectAll: true
	},
	toolbar: {
		items: [
			{
				name: 'exportButton',
				location: 'after'
			}
		]
	},
	scrolling: {
		mode: 'virtual',
		rowRenderingMode: 'virtual',
		columnRenderingMode: 'virtual',
		useNative: false,
		preloadEnabled: true,
		scrollByThumb: true,
		showScrollbar: 'onHover'
	},
	allowColumnReordering: false,
	allowColumnResizing: true,
	columnAutoWidth: false,
	showBorders: true,
	showColumnLines: true,
	showRowLines: true,
	cacheEnabled: true,
	filterSyncEnabled: true
};

export default defaultProps;
