'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable('categories', {
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

        queryInterface.createTable('post_categories', {
            category_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: "categories",
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            },
            post_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: "posts",
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
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
        queryInterface.dropTable('post_categories');
        queryInterface.dropTable('categories');

    }
};