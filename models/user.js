'use strict';
module.exports = function(sequelize, DataTypes) {
    var passwordHash = require('password-hash');
    var slugify = require('slug');
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
        hooks: {
            beforeCreate: function(user, next) {
                user.password = passwordHash.generate(user.password);
            }
        },
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
                values.slug = slugify(values.name, {
                    lower: true
                });
                delete values.password;
                delete values.token;
                delete values.remember_token;
                return values;
            },
            login: function(email, password, next) {
                if (!(email && password)) {
                    return next({
                        message: 'Not Authenticated - Please Provide a Username & Password'
                    });
                }

                this.find({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                    if (!user) {
                        return next({
                            message: 'Not Authenticated - Invalid Credentials'
                        });
                    }

                    if (!passwordHash.verify(password, user.password)) {
                        return next({
                            message: 'Not Authenticated - Invalid Credentials'
                        });
                    }

                    return next(null, user);
                });
            }
        }
    });
    return User;
};