// File to generste PDF for Purchase Orders
const express = require('express');
const router = express.Router();
const pdfService = require('../pdfGenerator/PurchaseOrderPDF');

const purchaseRequestModel = require('../model/purchaseRequest');

router.get('/PurchaseOrder/:id', async(req, res, next) => {
    const prID = parseInt(req.params.id);

    const POData = {};

    try{
        await purchaseRequestModel.getPRByPRID(prID)
        .then((result) => {
            POData.productDetails = result[0];
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });

        await purchaseRequestModel.getLineItemByPRID(prID)
        .then((result) => {
            POData.itemLines = result;
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
    }catch(err){
        console.log(err);
        res.status(500).send(`Unknown Error`);
    };

    // dowload as attachment
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=PurchaseOrder${prID}.pdf`
    });

    pdfService.buildPDF(
        POData,
        (chunk) => stream.write(chunk),
        () => stream.end()
    );

});

router.get('/PurchaseOrder/view/:id', async(req, res, next) => {
    const prID = parseInt(req.params.id);

    const POData = {};

    try{
        await purchaseRequestModel.getPRByPRID(prID)
        .then((result) => {
            POData.productDetails = result[0];
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });

        await purchaseRequestModel.getLineItemByPRID(prID)
        .then((result) => {
            POData.itemLines = result;
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
    }catch(err){
        console.log(err);
        res.status(500).send(`Unknown Error`);
    };

    // view on pdf viewer
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline;filename=PurchaseOrder${prID}.pdf`
    });

    pdfService.buildPDF(
        POData,
        (chunk) => stream.write(chunk),
        () => stream.end()
    );

});

module.exports = router;