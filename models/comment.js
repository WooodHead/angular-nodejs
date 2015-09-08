'use strict';
module.exports = function(sequelize, DataTypes) {
	var moment = require('moment');
	var Post = sequelize.import('./post');
	var User = sequelize.import('./user');
	var Comment = sequelize.define('Comment', {
		content: DataTypes.TEXT,
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Post,
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here

				Comment.belongsTo(models.User, {
					as: 'user',
					constraints: false,
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
					foreignKey: 'user_id',
					targetKey: 'id'
				});

				Comment.belongsTo(models.Post, {
					as: 'post',
					constraints: true,
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
					foreignKey: 'post_id'
				});

			}
		},
		instanceMethods: {
			toJSON: function() {
				var values = this.get();

				values.due_date = moment(values.created_at).fromNow();
				return values;
			}
		}
	});
	return Comment;
};