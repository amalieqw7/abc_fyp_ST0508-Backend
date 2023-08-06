const express = require('express');

const router = express.Router();

// for each routes file, add a const & router.use

const DBTableRoutes = require('./DBTableRoutes');
const userRoutes = require('./userRoutes');
const pdfGenerator = require('./pdfGenerator');
const xlsxGenerator = require('./xlsxGenerator');
const purchaseReqRoutes = require('./idvRoutes/purchaseReqRoutes');
const inventoryRoutes = require('./idvRoutes/inventoryRoutes');
const purchaseOrderRoutes = require('./idvRoutes/purchaseOrderRoutes');
const supplierRoutes = require('./idvRoutes/supplierRoutes');
const paymentTrackRoutes = require('./idvRoutes/paymentTrackRoutes');
const trackOrderRoutes = require('./idvRoutes/trackOrderRoutes');
const purchasePlanRoutes = require('./idvRoutes/purchasePlanRoutes');
const auditTrailRoutes = require('./idvRoutes/auditTrailRoutes');

// Database Route
router.use('/DBTable', DBTableRoutes);

// User Routes
router.use('/user', userRoutes);

// Individual Routes
router.use('/purchaseReq', purchaseReqRoutes);
router.use('/inventory', inventoryRoutes)
router.use('/purchaseOrder', purchaseOrderRoutes);
router.use('/supplier', supplierRoutes);
router.use('/paymentTrack', paymentTrackRoutes);
router.use('/trackOrder', trackOrderRoutes);
router.use('/purchasePlan', purchasePlanRoutes);
router.use('/auditTrail', auditTrailRoutes);

// PDF Generator Route
router.use('/pdf', pdfGenerator);

// XLSX Generator Route
router.use('/xlsx', xlsxGenerator);

module.exports = router;