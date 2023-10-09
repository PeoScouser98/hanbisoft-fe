import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ExportingEvent } from 'devextreme/ui/data_grid';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { SavedEvent } from 'devextreme/ui/data_grid';

/**
 * @description Get updated, inserted and deleted data from data grid
 * @param {SavedEvent<any, any>} event
 */
export const getDataChanges = (event: SavedEvent<any, any>) => {
	try {
		if (Array.isArray(event.changes)) {
			const updated = event.changes?.filter((item) => item?.type === 'update');
			const inserted = event.changes?.filter((item) => item?.type === 'insert');
			const deleted = event.changes?.filter((item) => item?.type === 'remove');
			return {
				updated,
				inserted,
				deleted
			};
		}
	} catch (error) {
		return {
			updated: undefined,
			inserted: undefined,
			deleted: undefined
		};
	}
};

/**
 * Handle export excel from data grid
 * @param component
 * @param fileName
 */
export const handleExportExcel = <T>(component: ExportingEvent<T>['component'], fileName: string) => {
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
};

/**
 * @description Handle export data to PDF file from DX Data grid
 * @param {any} instance
 * @param {string} fileName
 */
export const exportGrid = (instance: any, fileName: string) => {
	const doc = new jsPDF();
	const dataGrid = instance;
	exportDataGridToPdf({
		jsPDFDocument: doc,
		component: dataGrid
	}).then(() => {
		doc.save(fileName);
	});
};
