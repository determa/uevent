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
    description: { type: DataTypes.TEXT, allowNull: false },
})

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, defaultValue: "header.jpg" },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    date_publish: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    tickets_count: { type: DataTypes.INTEGER, allowNull: false },
    members_visibility: { type: DataTypes.ENUM('all', 'members'), allowNull: false },
    notification: { type: DataTypes.BOOLEAN, allowNull: false },
});

const Media = sequelize.define('media', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('video', 'photo'), allowNull: false }
})

const Theme = sequelize.define('theme', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
}, { hierarchy: true });

const Ticket = sequelize.define('ticket', {
    seat: { type: DataTypes.INTEGER },
    transaction_id: { type: DataTypes.BIGINT, allowNull: false },
})

const EventNotification = sequelize.define('event_notification');

const CompanyNotification = sequelize.define('company_notification');

const UserMedia = sequelize.define('user_media');

const CompanyMedia = sequelize.define('company_media');

const EventMedia = sequelize.define('event_media');

const ThemeCategory = sequelize.define('theme_category');

const AccountFavorite = sequelize.define('account_favorite');

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

Theme.belongsToMany(Category, { through: ThemeCategory });
Category.belongsToMany(Theme, { through: ThemeCategory });

Theme.hasMany(Event);
Event.belongsTo(Theme);

Category.hasMany(Event);
Event.belongsTo(Category);

Account.hasMany(Comment);
Comment.belongsTo(Account);

Event.hasMany(Comment);
Comment.belongsTo(Event);

Account.hasMany(Ticket);
Ticket.belongsTo(Account);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

User.belongsToMany(Event, { through: EventNotification });
Event.belongsToMany(User, { through: EventNotification });

User.hasMany(EventNotification);
EventNotification.belongsTo(User);

Event.hasMany(EventNotification);
EventNotification.belongsTo(Event);

User.belongsToMany(Company, { through: CompanyNotification });
Company.belongsToMany(User, { through: CompanyNotification });

User.hasMany(CompanyNotification);
CompanyNotification.belongsTo(User);

Company.hasMany(CompanyNotification);
CompanyNotification.belongsTo(Company);

Account.belongsToMany(Event, { through: AccountFavorite });
Event.belongsToMany(Account, { through: AccountFavorite });

Account.hasMany(AccountFavorite);
AccountFavorite.belongsTo(Account);

Event.hasMany(AccountFavorite);
AccountFavorite.belongsTo(Event);

module.exports = {
    Account,
    User,
    Company,
    Event,
    Media,
    Category,
    Theme,
    ThemeCategory,
    Comment,
    Ticket,
    EventNotification,
    CompanyNotification,
    AccountFavorite,
}