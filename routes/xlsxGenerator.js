const express = require('express');
const xlsx = require('xlsx');
const moment = require('moment');

const router = express.Router();

const auditTrailModel = require('../model/auditTrail');

// ? Transaction report Excel download 
router.get('/excel', async (req, res, next) => {

    try {
        const result = await auditTrailModel.getALLTransactions();  //? returns an array of all data

        // translates result into proper datasets
        const transactionResult = TransactionData(result);

        // Gets all transaction rows
        const transactionArr = transactionResult.Transactions;

        // Calculate total amount for last row in excel
        const TOTAL = CalculateTotal(transactionResult.Total).toFixed(2);
        transactionArr.push({
            PO_No: '',
            Purchase_Type: '',
            Date: '',
            Name: '',
            Branch: '',
            Supplier: '',
            Payment_Mode: '',
            Purchase_Status: '',
            Payment_Status: 'Total',
            Total_Price: TOTAL
        });

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(transactionArr);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

        // Buffer the generated file
        const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // setting headers for res
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=TransactionReport.xlsx`);

        // send response
        return res.send(excelBuffer);

    } catch (err) {
        console.log(err);
        return res.status(500).send(`Unknown Error`);
    };
});

// ? Transaction report Excel download based on Date
// ? http://localhost:3000/api/xlsx/excel/Date?startDate=[queryValue]&endDate=[queryValue]
router.get('/excel/Date', async (req, res, next) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    const SD = DateString(startDate);
    const ED = DateString(endDate);

    try {
        const result = await auditTrailModel.getTransactionsByDate(startDate, endDate);  //? returns an array of all data

        const transactionResult = TransactionData(result);
        const transactionArr = transactionResult.Transactions;

        // Calculate total amount
        const TOTAL = CalculateTotal(transactionResult.Total).toFixed(2);
        transactionArr.push({
            PO_No: '',
            Purchase_Type: '',
            Date: '',
            Name: '',
            Branch: '',
            Supplier: '',
            Payment_Mode: '',
            Purchase_Status: '',
            Payment_Status: 'Total',
            Total_Price: TOTAL
        });

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(transactionArr);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

        // Buffer the generated file
        const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // setting headers for res
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=TransactionReport_${SD}_${ED}.xlsx`);

        // send response
        return res.send(excelBuffer);

    } catch (err) {
        console.log(err);
        return res.status(500).send(`Unknown Error`);
    };
});

// ? Transaction report CSV download
router.get('/csv', async (req, res, next) => {
    try {
        const result = await auditTrailModel.getALLTransactions();  //? returns an array of all data

        // translates result into proper datasets
        const transactionResult = TransactionData(result);

        // Gets all transaction rows
        const transactionArr = transactionResult.Transactions;

        // Calculate total amount for last row in excel
        const TOTAL = CalculateTotal(transactionResult.Total).toFixed(2);
        transactionArr.push({
            PO_No: '',
            Purchase_Type: '',
            Date: '',
            Name: '',
            Branch: '',
            Supplier: '',
            Payment_Mode: '',
            Purchase_Status: '',
            Payment_Status: 'Total',
            Total_Price: TOTAL
        });

        // convert data to worksheet
        const worksheet = xlsx.utils.json_to_sheet(transactionArr);

        const csv = xlsx.utils.sheet_to_csv(worksheet);

        // setting headers for res
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=TransactionReport.csv');

        // send response
        return res.send(csv);

    } catch (err) {
        console.log(err);
        return res.status(500).send(`Unknown Error`);
    };
});

// ? Transaction report CSV download based on Date
router.get('/csv/Date', async (req, res, next) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    const SD = DateString(startDate);
    const ED = DateString(endDate);

    try {
        const result = await auditTrailModel.getTransactionsByDate(startDate, endDate);  //? returns an array of all data

        const transactionResult = TransactionData(result);
        const transactionArr = transactionResult.Transactions;

        // Calculate total amount
        const TOTAL = CalculateTotal(transactionResult.Total).toFixed(2);
        transactionArr.push({
            PO_No: '',
            Purchase_Type: '',
            Date: '',
            Name: '',
            Branch: '',
            Supplier: '',
            Payment_Mode: '',
            Purchase_Status: '',
            Payment_Status: 'Total',
            Total_Price: TOTAL
        });

        // convert data to worksheet
        const worksheet = xlsx.utils.json_to_sheet(transactionArr);

        const csv = xlsx.utils.sheet_to_csv(worksheet);

        // setting headers for res
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=TransactionReport_${SD}_${ED}.csv`);

        // send response
        return res.send(csv);

    } catch (err) {
        console.log(err);
        return res.status(500).send(`Unknown Error`);
    };
});

// Transaction Data
function TransactionData(resultArr) {
    const transactionArr = [];
    const totalAmountArr = [];

    resultArr.forEach((item, index) => {
        const transactionObj = {
            PO_No: '',
            Purchase_Type: '',
            Date: '',
            Name: '',
            Branch: '',
            Supplier: '',
            Payment_Mode: '',
            Purchase_Status: '',
            Payment_Status: '',
            Total_Price: ''
        };

        const reqDate = moment(item.requestDate).format('YYMMDD');
        const poID = item.prID.toString().padStart(5, '0');

        const BranchPrefix = [];
        if (item.branchPrefix !== null) {
            if (item.branchPrefix.match(",") !== null) {
                BranchPrefix.push(item.branchPrefix.substring(0, item.branchPrefix.indexOf(',')));
            } else {
                BranchPrefix.push(item.branchPrefix);
            };
        };

        if (item.purchaseTypeID === 2) {
            transactionObj.PO_No = '#' + reqDate + poID;
            transactionObj.Purchase_Status = 'N/A';
            transactionObj.Branch = 'N/A';
            transactionObj.Supplier = 'N/A';
            transactionObj.Payment_Mode = 'Cash';
        } else {
            transactionObj.PO_No = '#' + BranchPrefix + reqDate + poID;
            transactionObj.Purchase_Status = item.purchaseStatus;
            transactionObj.Branch = item.branchName;
            transactionObj.Supplier = item.supplierName;
            transactionObj.Payment_Mode = item.paymentMode;
        };

        transactionObj.Date = moment(item.requestDate).format('YYYY-MM-DD');
        transactionObj.Name = item.name;
        transactionObj.Purchase_Type = item.purchaseType;
        transactionObj.Payment_Status = item.paymentStatus;
        transactionObj.Total_Price = item.totalPrice;

        totalAmountArr.push(item.totalPrice);
        transactionArr.push(transactionObj);
    });

    return { Total: totalAmountArr, Transactions: transactionArr };
};

// Calculate Total
function CalculateTotal(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        let num = +array[i]
        total = total + num
    };

    return total;
};

// convert date into number string
function DateString(date){
    const momentDate = moment(date).format(`YYYY-MM-DD`);
    return momentDate;
};

module.exports = router;