'use strict';
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Category.belongsToMany(models.Post, {
                    through: 'post_categories',
                    as: 'posts',
                    constraints: true,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    foreignKey: 'category_id'
                });
            }
        }
    });
    return Category;
};