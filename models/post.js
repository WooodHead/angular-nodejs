'use strict';

module.exports = function(sequelize, DataTypes) {
    var moment = require('moment');
    //moment.lang('vi');
    var User = sequelize.import('./user');
    var Post = sequelize.define('Post', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        content: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        status: DataTypes.BOOLEAN
    }, {
        defaultScope: {
            order: 'id DESC'
        },
        scopes: {
            isActive: {
                where: {
                    status: true
                }
            },
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here

                Post.belongsTo(models.User, {
                    as: 'user',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                    //foreignKey: 'user_id'
                });

                Post.hasMany(models.Comment, {
                    as: 'comments',
                    constraints: false,
                    //foreignKey: 'post_id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                });

                Post.belongsToMany(models.Category, {
                    through: {
                        model: models.PostCategory,
                        unique: true
                    },
                    as: 'categories',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    foreignKey: 'post_id',
                    otherKey: 'category_id'
                });

                Post.belongsToMany(models.Tag, {
                    through: {
                        model: models.PostTag,
                        unique: true
                    },
                    as: 'tags',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    foreignKey: 'post_id',
                    otherKey: 'tag_id'
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

    return Post;
};