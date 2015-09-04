'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
            remember_token: {
                type: Sequelize.STRING(60)
            },
            token: {
                type: Sequelize.STRING
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};