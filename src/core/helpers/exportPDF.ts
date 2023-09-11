import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

/**
 * @description Handle export data to PDF file from DX Data grid
 * @param {any} instance
 * @param {string} fileName
 */
export default function exportGrid(instance: any, fileName: string) {
	const doc = new jsPDF();
	const dataGrid = instance;
	exportDataGridToPdf({
		jsPDFDocument: doc,
		component: dataGrid
	}).then(() => {
		doc.save(fileName);
	});
}
