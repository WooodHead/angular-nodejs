'use strict';
module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.import('./post');
	var Tag = sequelize.import('./tag');
	var PostTag = sequelize.define('PostTag', {
		tag_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			references: {
				model: Tag,
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
		tableName: 'post_tags',
		classMethods: {
			associate: function(models) {
				// associations can be defined here				
			}
		}
	});
	return PostTag;
};