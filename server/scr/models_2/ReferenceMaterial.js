const mongoose = require('mongoose');

const referenceMaterialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Document', 'Video', 'Audio'], required: true },
    url: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ReferenceMaterial = mongoose.model('ReferenceMaterial', referenceMaterialSchema);

module.exports = ReferenceMaterial;
