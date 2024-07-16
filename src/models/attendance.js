'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        static associate(models) {
            // Define associations here
            Attendance.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    };
    Attendance.init({
        userId: DataTypes.INTEGER,
        status: DataTypes.ENUM('present', 'absent', 'late', 'permission'),
        timestamp: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Attendance',
    });
    return Attendance;
};
