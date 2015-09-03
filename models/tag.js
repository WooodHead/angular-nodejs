'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('tag', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Tag;
};