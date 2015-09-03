'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.import(__dirname + "/models/user");
    var Post = sequelize.define('post', {
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
        status: DataTypes.BOOLEAN,
        timestamps: DataTypes.TRUE
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    Post.hasOne(User, {
        foreignKey: 'user_id'
    });
    User.hasMany(Post);

    return Post;
};