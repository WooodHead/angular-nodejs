'use strict';

module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.import('./post');
	var Category = sequelize.import('./category');
	var PostCategory = sequelize.define('PostCategory', {
		category_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			references: {
				model: Category,
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: Post,
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}
	}, {
		tableName: 'post_categories',
		classMethods: {
			associate: function(models) {
				// associations can be defined here
			}
		}
	});
	return PostCategory;
};