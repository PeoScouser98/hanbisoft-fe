import Image from '@/common/components/FallbackImage';
import { ROLE_MAP } from '@/common/constants/app.const';
import { TColumnDef, TDataGridProps } from '@/types/global';

const columns: TColumnDef = [
	{
		dataField: 'display_name',
		allowFilter: true,
		allowSorting: true,
		minWidth: 196,
		validationRules: [{ type: 'required' }],
		cellRender: (cell) => {
			return (
				<div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<Image src={cell.row.data?.picture} />
					{cell.row.data?.display_name}
				</div>
			);
		}
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
		minWidth: 196,
		cellRender: (cell) => {
			return ROLE_MAP.get(cell.value);
		}
	}
];

const defaultProps: TDataGridProps = {
	columns,
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
