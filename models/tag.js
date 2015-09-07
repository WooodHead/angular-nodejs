'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        underscored: true,
        timestamps: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Tag.belongsToMany(models.Post, {
                    through: 'post_tags',
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