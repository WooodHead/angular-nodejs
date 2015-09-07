'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('tags', {
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
                allowNull: false,
                field: 'created_at',
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                field: 'updated_at',
                type: Sequelize.DATE
            }
        });

    },
    down: function(queryInterface, Sequelize) {
        //queryInterface.dropTable('post_tags');
        return queryInterface.dropTable('tags');
    }
};