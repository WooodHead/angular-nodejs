'use strict';
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Category;
};