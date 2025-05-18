const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storageName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bucketName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isClean: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  scanResult: {
    type: DataTypes.TEXT,
  },
  uploadedBy: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = File;
