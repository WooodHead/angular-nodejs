'use strict';

module.exports = function(sequelize, DataTypes) {
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
                key: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        },
        status: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here

                Post.belongsTo(models.User, {
                    as: 'user',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                    foreignKey: 'user_id'
                });

                Post.belongsToMany(models.Category, {
                    through: {
                        model: 'post_categories',
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
                        model: 'post_tags',
                        unique: true
                    },
                    as: 'tags',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    foreignKey: 'post_id',
                    otherKey: 'tag_id'
                });

                Post.hasMany(models.Comment, {
                    as: 'comments',
                    constraints: false,
                    foreignKey: 'post_id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                });
            },
            getListCategoryId: function() {
                return this.categories.id;
            }
        },
        instanceMethods: {
            method2: function() {

            }
        }
    });

    return Post;
};