'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('categories', {
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
            slug: {
                type: Sequelize.STRING,
                allowNull: false
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
        //queryInterface.dropTable('post_categories');
        return queryInterface.dropTable('categories');

    }
};