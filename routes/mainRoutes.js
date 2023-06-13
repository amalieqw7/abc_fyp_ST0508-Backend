const express = require('express');

const router = express.Router();

// for each routes file, add a const & router.use

const DBTableRoutes = require('./DBTableRoutes');
const purchaseReqRoutes = require('./idvRoutes/purchaseReqRoutes');
const inventoryRoutes = require('./idvRoutes/inventoryRoutes');
const purchaseOrderRoutes = require('./idvRoutes/purchaseOrderRoutes');
const supplierRoutes = require('./idvRoutes/supplierRoutes');
const paymentTrackRoutes = require('./idvRoutes/paymentTrackRoutes');
const trackOrderRoutes = require('./idvRoutes/trackOrderRoutes');

// Database Route
router.use('/DBTable', DBTableRoutes);

// Individual Routes
router.use('/purchaseReq', purchaseReqRoutes);
router.use('/inventory', inventoryRoutes)
router.use('/purchaseOrder', purchaseOrderRoutes);
router.use('/supplier', supplierRoutes);
router.use('/paymentTrack', paymentTrackRoutes);
router.use('/trackOrder', trackOrderRoutes);


module.exports = router;