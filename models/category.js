'use strict';
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('category', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Category;
};