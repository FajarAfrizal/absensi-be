'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendances', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('hadir', 'terlambat', 'sakit', 'cuti', 'alpha'), 
        allowNull: false,
        defaultValue: 'alpha',
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checkOut: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workTime:{

      };
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('Attendances', {
      type: 'foreign key',
      fields: ['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendances');
  },
};
