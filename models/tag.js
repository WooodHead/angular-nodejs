'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        tableName: 'tags',
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Tag.belongsToMany(models.Post, {
                    through: models.PostTag,
                    as: 'posts',
                    constraints: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    foreignKey: 'tag_id'
                });
            }
        }
    });
    return Tag;
};