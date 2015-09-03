'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING(60),
        remember_token: DataTypes.STRING(60)
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return User;
};