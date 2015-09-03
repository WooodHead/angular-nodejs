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
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        queryInterface.createTable('taggables', {
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
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        queryInterface.dropTable('taggables');
        queryInterface.dropTable('tags');
    }
};