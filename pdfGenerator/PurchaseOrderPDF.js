const PDFDocument = require("pdfkit");
const moment = require('moment');

function buildPDF(data, dataCallback, endCallback){

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

	const poDetails = data;

    generateHeader(doc,poDetails);
	generateCustomerInformation(doc,poDetails);
	generateProductLinesTable(doc,poDetails);
    generateFooter(doc,poDetails);
    doc.end();
};

function generateHeader(doc, poDetails) {
	const PO = poDetails.productDetails;

	const date = moment(PO.requestDate).format('DD/MM/YYYY');
	const IdDate = moment(PO.requestDate).format('YYMMDD');
	const BranchPrefix = PO.branchPrefix.substring(0, PO.branchPrefix.indexOf(','))
	const poID = PO.prID.toString().padStart(5,'0');

    // file path from server file
	doc.image('pdfGenerator/client_logo.png', 50, 50, { width: 120})
		.fontSize(25)
		.text(`Purchase Order`, 200, 50, {align: 'right'})
		.fontSize(11)
		.text(`Date`, 370, 95, {align: 'left'})
		.text(`${date}`, 440, 95, {align: 'left'})
		.text(`P.O. Number`, 370, 110, {align: 'left'})
		.text(`#${BranchPrefix}${IdDate}${poID}`, 440, 110, {align: 'left'});
};

// Payer & Payee Details
function generateCustomerInformation(doc, poDetails) {
	const PO = poDetails.productDetails;

	const targetDate = moment(PO.targetDeliveryDate).format('DD/MM/YYYY');
	const paymentMode = PO.paymentMode;

	// Supplier Details
	const supplierContactPerson = PO.SPerson;
	const supplierName = PO.supplierName;
	const supplierAddress = PO.SAddress.substring(0, PO.SAddress.indexOf(','));
	const supplierSubStrAddress = PO.SAddress.substring(PO.SAddress.indexOf(',') + 2);
	const supplierUnitNum  = supplierSubStrAddress.substring(0, supplierSubStrAddress.indexOf(','));
	const supplierPostalCode = supplierSubStrAddress.substring(supplierSubStrAddress.indexOf(',') + 2)
	const supplierOfficeNum = PO.SOfficeNum;
	const supplierEmail = PO.SEmail;

	// Company Details
	const personName = PO.name;
	const location = BranchTest(PO.branchName);
	const branchAddress = BranchTest(PO.branchAddress);
	const branchUnitNum = BranchTest(PO.branchUnitNum);
	const branchPostalCode = BranchTest(PO.branchPostalCode);
	const branchOfficeNum = BranchTest(PO.branchContact);
	const personEmail = PO.UEmail;

	// Top section
	doc.fontSize(14)
		.text(`Delivery Date`, 55, 170)
		.text(`Payment Mode`, 200, 170)
		.fontSize(11)
		.text(`${targetDate}`, 55, 195)
		.text(`${paymentMode}`, 200, 195);

	doc.moveTo(50,210).lineTo(550,210).stroke();

	// Payer & Payee Details
	doc.fontSize(14)
		.text(`Supplier`, 55, 230)
		.text(`Delivery To`, 300, 230)
		.fontSize(11)
		.text(`${supplierContactPerson}`, 55, 250)
		.text(`${supplierName}`)
		.text(`${supplierAddress}, ${supplierUnitNum}`)
		.text(`${supplierPostalCode}`)
		.text(`${supplierOfficeNum}`)
		.text(`${supplierEmail}`)
		.text(`${personName}`, 300, 250)
		.text(`ABC Cooking Studio ${location}`)
		.text(`${branchAddress}, ${branchUnitNum}`)
		.text(`Singapore ${branchPostalCode}`)
		.text(`${branchOfficeNum}`)
		.text(`${personEmail}`);

		doc.moveTo(50,340).lineTo(550,340).stroke();
};

// 1 row of product line
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	doc.fontSize(11)
		.text(c1, 65, y, {  width: 25, align: 'center' })
		.text(c2, 150, y)
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(`$${c4}`, 370, y, { width: 90, align: 'right' })
		.text(`$${c5}`, 0, y, { align: 'right' });
};

// product lines table + total section + remarks Section
function generateProductLinesTable(doc, poDetails) {
	// array of product lines
	const PO = poDetails.itemLines;

	const totalPrices = [];
	const yIndex = {};

	const plY = 360
	const plTableTop = 370;

	doc.fontSize(13)
		.text(`Item No.`, 60, plY)
		.text(`Description`, 150, plY)
		.text(`Qty`, 280, plY, { width: 90, align: 'right' })
		.text(`Unit Price`, 370, plY, { width: 90, align: 'right' })
		.text(`Total Price`, 400, plY, { align: 'right' });

	for (i = 0; i < PO.length; i++) {
		const item = PO[i];
		const position = plTableTop + (i + 1) * 30;

		totalPrices.push(item.totalUnitPrice);
		
		generateTableRow(
			doc,
			position,
			i + 1,
			item.itemName,
			item.quantity,
			item.unitPrice,
			item.totalUnitPrice,
		);

		if(i == PO.length - 1){
			const y = position + 30;
			doc.moveTo(50,y).lineTo(550,y).stroke();
			
			// y = 490
			yIndex.y = y;
		};
	};

    // Calculate Total
    function CalculateTotal(array){
        let total = 0;
        for(let i = 0; i < array.length; i++){
            let num = +array[i]
            total = total + num
        };

        return total;
    };
        
    // Calculate GST
    function GSTFinder(amt){
        const gst = (8/100)*amt;
        return gst;
    };
                
    const totalArr = [];

    // Find subtotal
    const subtotal = CalculateTotal(totalPrices).toFixed(2);

    // Find GST
    const gst = GSTFinder(subtotal).toFixed(2);

    // push values into totalArr
    totalArr.push(subtotal, gst);

    // Calculate final total
    const total = CalculateTotal(totalArr).toFixed(2);

	// Generate Total & Remarks Section
	generateTotals(doc, yIndex, totalArr, total);
	generateRemarks(doc, yIndex, poDetails);
};

// total section
function generateTotals(doc, yIndex, totalArr, total){
	const subtotal = totalArr[0];
	const gst = totalArr[1];

	const c1x = 380;
	const c2x = 450;

	// y = 490
	const y = yIndex.y;

	doc.fontSize(14)
		.text(`Subtotal`, c1x, y+20, { width: 80, align: 'right'})
		.text(`Discount(%)`, c1x, y+45, { width: 80, align: 'right'})
		.text(`GST 8%`, c1x, y+70, { width: 80, align: 'right'})
		.text(`Total`, c1x, y+95, { width: 80, align: 'right'});

	doc. fontSize(12)
		.text(`$${subtotal}`, c2x, y+20, { align: 'right' })
		.text(`$${gst}`, c2x, y+70, { align: 'right' })
		.fontSize(14)
		.text(`$${total}`, c2x, y+95, { align: 'right' });
};

// remarks section
function generateRemarks(doc, yIndex, poDetails){
	const PO = poDetails.productDetails;

	const remarks = PO.remarks;

	// y = 490
	const y = yIndex.y;

	doc.fontSize(13)
		.text(`Remarks`, 55, y+20)
		.fontSize(11)
		.text(`${remarks}`, {width: 280});
}

function generateFooter(doc, poDetails) {
	const contact = BranchTest(poDetails.productDetails.branchContact);
	const email = poDetails.productDetails.UEmail;

	doc.fontSize(10)
		.text(
		`If you have any questions about the purchase order, please email ${email}`,
		50,
		780,
		{ align: 'center', width: 500 },
	);
}

function BranchTest(data){
	if(data.includes(',')){
		return data.substring(0, data.indexOf(','));
	}
	else{
		return data;
	};
};

module.exports = { buildPDF };