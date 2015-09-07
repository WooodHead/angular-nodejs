'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                isLowercase: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(60)
        },
        remember_token: {
            type: DataTypes.STRING(60)
        },
        token: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function(models) {

                User.hasMany(models.Post, {
                    as: 'posts',
                    constraints: true,
                    foreignKey: 'user_id'
                });
            }
        },
        instanceMethods: {
            toJSON: function() {
                var values = this.get();

                delete values.password;
                delete values.token;
                delete values.remember_token;
                return values;
            }
        },
        underscored: true,
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return User;
};