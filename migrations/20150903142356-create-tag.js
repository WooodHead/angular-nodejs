'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable('tags', {
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

        queryInterface.createTable('tag_gables', {
            tag_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: "tags",
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
        queryInterface.dropTable('tag_gables');
        queryInterface.dropTable('tags');
    }
};