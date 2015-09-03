'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('posts', {
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
            image: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            content: {
                type: Sequelize.TEXT
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
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
        return queryInterface.dropTable('posts');
    }
};