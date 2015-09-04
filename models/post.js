'use strict';

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        content: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        },
        status: DataTypes.BOOLEAN
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Post.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        },
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Post;
};