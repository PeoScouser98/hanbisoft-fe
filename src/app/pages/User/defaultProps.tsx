import Image from '@/common/components/FallbackImage';
import { TDataGridProps } from '@/types/global';

const defaultProps: TDataGridProps = {
	columns: [
		// {
		// 	dataField: 'picture',
		// 	allowFiltering: false,
		// 	allowSorting: false,
		// 	allowEditing: false,
		// 	cellRender: (instance) => {
		// 		console.log(instance.value);
		// 		return <Image src={instance.value} css={{ width: '2rem', aspectRatio: 1 }} />;
		// 	}
		// },

		{
			dataField: 'display_name',
			allowSorting: true,
			minWidth: 196,
			validationRules: [{ type: 'required' }]
		},
		{
			dataField: 'email',
			validationRules: [
				{
					type: 'email'
				},
				{ type: 'required' }
			],
			minWidth: 196
		},
		{
			dataField: 'phone',
			validationRules: [{ type: 'required' }, { type: 'stringLength', min: 10, max: 10 }],
			minWidth: 196
		},
		{
			dataField: 'role',
			validationRules: [{ type: 'required' }],
			allowSorting: false,
			minWidth: 196
		}
	],
	columnFixing: {
		enabled: true
	},
	export: {
		enabled: true,
		formats: ['excel']
	},
	height: 384,
	keyExpr: '_id',
	editing: {
		mode: 'batch',
		refreshMode: 'repaint',
		newRowPosition: 'viewportTop',
		useIcons: true,
		allowAdding: true,
		allowUpdating: true
	},
	selection: {
		selectAllMode: 'allPages',
		mode: 'multiple',
		showCheckBoxesMode: 'always'
	},
	filterRow: {
		visible: true
	},
	toolbar: {
		visible: true,
		items: [
			{
				name: 'addRowButton',
				widget: 'dxButton',
				location: 'after'
			},
			{
				name: 'revertButton',
				widget: 'dxButton',
				location: 'after'
			},
			{
				name: 'exportButton',
				widget: 'dxButton',
				location: 'after'
			}
		]
	},
	columnResizingMode: 'nextColumn',
	scrolling: {
		mode: 'virtual',
		rowRenderingMode: 'virtual',
		columnRenderingMode: 'virtual',
		renderAsync: false,
		preloadEnabled: true,
		scrollByContent: true,
		showScrollbar: 'onHover'
	},

	showBorders: true,
	showColumnLines: true,
	showRowLines: true,
	allowColumnResizing: true,
	cacheEnabled: true,
	wordWrapEnabled: true,
	columnAutoWidth: false
};

export default defaultProps;
