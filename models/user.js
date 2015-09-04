'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING(60)
        },
        remember_token: {
            type: DataTypes.STRING(60)
        },
        token: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                //User.hasMany(models.Post);
            }
        },
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        instanceMethods: {
            toJSON: function() {
                var values = this.get();

                delete values.password;
                delete values.token;
                delete values.remember_token;
                return values;
            }
        },
        timestamps: true,
        privateColumns: ['password'],
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return User;
};