'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			content: {
				type: Sequelize.TEXT
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				}
			},
			post_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'posts',
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
		return queryInterface.dropTable('comments');
	}
};