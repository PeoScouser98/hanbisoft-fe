import { exportDataGrid } from 'devextreme/excel_exporter';
import { ExportingEvent } from 'devextreme/ui/data_grid';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
// @emotion/babel-preset-css-prop
export default function handleExportExcel<T>(component: ExportingEvent<T>['component'], fileName: string) {
	const workbook = new Workbook();
	const worksheet = workbook.addWorksheet('Main sheet');
	exportDataGrid({
		component: component,
		worksheet: worksheet,
		customizeCell: function (options) {
			options.excelCell.font = { name: 'Arial', size: 12 };
			options.excelCell.alignment = { horizontal: 'left' };
		}
	}).then(function () {
		workbook.xlsx.writeBuffer().then(function (buffer) {
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
		});
	});
}
