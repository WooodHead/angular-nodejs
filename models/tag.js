'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Tag;
};