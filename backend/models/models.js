const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Account = sequelize.define('account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('NONE', 'USER', 'COMPANY'), defaultValue: 'NONE' },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    picture: { type: DataTypes.STRING, defaultValue: "default.jpg" },
    role: { type: DataTypes.ENUM('USER', 'MODERATOR', 'ADMIN'), defaultValue: "USER" },
});

const Company = sequelize.define('company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    picture: { type: DataTypes.STRING, defaultValue: "default.jpg" },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    location: { type: DataTypes.STRING, unique: false, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, defaultValue: "default.jpg" },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    tickets_count: { type: DataTypes.INTEGER, allowNull: false },
});

const Media = sequelize.define('media', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('video', 'photo'), allowNull: false }
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
})

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
});

const Ticket = sequelize.define('ticket', {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    seat: { type: DataTypes.INTEGER, allowNull: false },
})

const UserMedia = sequelize.define('user_media');

const CompanyMedia = sequelize.define('company_media');

const EventMedia = sequelize.define('event_media');

const EventCategory = sequelize.define('event_category');

const UserFavorite = sequelize.define('user_favorite');

Account.hasOne(User);
User.belongsTo(Account);

Account.hasOne(Company);
Company.belongsTo(Account);

Company.hasMany(Event);
Event.belongsTo(Company);

User.belongsToMany(Media, { through: UserMedia });
Media.belongsToMany(User, { through: UserMedia });

Company.belongsToMany(Media, { through: CompanyMedia });
Media.belongsToMany(Company, { through: CompanyMedia });

Event.belongsToMany(Media, { through: EventMedia });
Media.belongsToMany(Event, { through: EventMedia });

Event.belongsToMany(Category, { through: EventCategory });
Category.belongsToMany(Event, { through: EventCategory });

Account.hasMany(Comment);
Comment.belongsTo(Account);

Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parent_comment_id' });

User.hasMany(Ticket);
Ticket.belongsTo(User);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

User.belongsToMany(Event, { through: UserFavorite });
Event.belongsToMany(User, { through: UserFavorite });

module.exports = {
    Account,
    User,
    Company,
    Event,
    Media,
    Category,
    Comment,
    Ticket,
}