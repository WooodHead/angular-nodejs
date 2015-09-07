'use strict';
module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.import('./post');
	var User = sequelize.import('./user');
	var Comment = sequelize.define('Comment', {
		content: DataTypes.TEXT,
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			}
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Post,
				key: 'id',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			}
		}
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				// associations can be defined here
				/*
								Comment.hasOne(models.User, {
									as: 'user',
									constraints: false,
									onUpdate: 'CASCADE',
									onDelete: 'CASCADE',
									foreignKey: 'user_id'
								});


								Comment.hasOne(models.Post, {
									as: 'post',
									constraints: false,
									onUpdate: 'CASCADE',
									onDelete: 'CASCADE',
									foreignKey: 'post_id'
								});
				*/
			}
		}
	});
	return Comment;
};