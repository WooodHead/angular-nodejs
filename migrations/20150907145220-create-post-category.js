'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('post_categories', {
            category_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'categories',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'posts',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
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
        return queryInterface.dropTable('post_categories');
    }
};