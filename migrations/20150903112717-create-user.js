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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};