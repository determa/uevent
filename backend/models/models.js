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
    location: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    tickets_count: { type: DataTypes.INTEGER, allowNull: false },
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
});

const Ticket = sequelize.define('ticket', {
    seat: { type: DataTypes.INTEGER },
    transaction_id: { type: DataTypes.BIGINT, allowNull: false },
})

const UserMedia = sequelize.define('user_media');

const CompanyMedia = sequelize.define('company_media');

const EventMedia = sequelize.define('event_media');

const ThemeCategory = sequelize.define('theme_category');

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

Theme.belongsToMany(Category, { through: ThemeCategory });
Category.belongsToMany(Theme, { through: ThemeCategory });

Theme.hasMany(Event);
Category.hasMany(Event);

Account.hasMany(Comment);
Comment.belongsTo(Account);

Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parent_comment_id' });

Account.hasMany(Ticket);
Ticket.belongsTo(Account);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

User.belongsToMany(Event, { through: UserFavorite });
Event.belongsToMany(User, { through: UserFavorite });

try {
    Account.bulkCreate([
        {
            email: "admin@admin.com",
            password: '$2b$05$TwLgpsljDaetcWvxbB6gcuZhhi8cwLf4G6HMuN5FMtgCRLA.fFAsm',
            type: 'USER',
            confirmed: true,
        }
    ], { ignoreDuplicates: false });

    User.bulkCreate([
        {
            name: "admin",
            picture: "default.jpg",
            role: 'ADMIN',
            accountId: 1,
        }
    ]);

    Event.bulkCreate([
        {
            title: 'Alpha',
            picture: "header.jpg",
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
            date: Date.now(),
            location: `{ name: 'Dnipro, dnipro obl, Ukraine', location: { lat: -34.397, lng: 150.644 } }`,
            price: 1000,
            tickets_count: 250,
            themeId: 1,
            categoryId: 1,
        },
        {
            title: 'Omega',
            picture: "header.jpg",
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
            date: Date.now(),
            location: `{ name: 'Dnipro, dnipro obl, Ukraine', location: { lat: -34.397, lng: 150.644 } }`,
            price: 1000,
            tickets_count: 250,
            themeId: 1,
            categoryId: 1,
        }
    ]);

    Theme.bulkCreate([
        {
            name: 'Концерты',
        },
        {
            name: 'Театр'
        },
        {
            name: 'Stand-Up'
        },
        {
            name: 'Кино'
        },
        {
            name: 'Фестивали'
        },
        {
            name: 'Бизнес'
        },
        {
            name: 'Психология'
        }
    ]);

    Category.bulkCreate([
        { name: "Рок" },
        { name: "Поп" },
        { name: "Альтернативный рок" },
        { name: "Классика" },
        { name: "Фолк" },
        { name: "Опера" },
        { name: "Оркестр" },
        { name: "Эстрада" },
        { name: "Джаз" },
        { name: "Юмор" },
        { name: "Оперетта" },
        { name: "Инди" },
        { name: "Трагедия" },
        { name: "Комедия" },
        { name: "Сказка" },
        { name: "Сатира" },
        { name: "Ирония" },
        { name: "Сарказм" },
        { name: "Документальний" },
        { name: "Драма" },
        { name: "Боевик" },
        { name: "Триллер" },
        { name: "Приключения" },
        { name: "Комедия" },
        { name: "Фэнтези" },
        { name: "Фантастика" },
        { name: "Музыкальный" },
        { name: "Литература" },
        { name: "Историческая реконструкция" },
        { name: "Леции" },
        { name: "Тренинги" },
        { name: "Meetup" },
    ]);

    ThemeCategory.bulkCreate([
        { themeId: 1, categoryId: 1, },
        { themeId: 1, categoryId: 2, },
        { themeId: 1, categoryId: 3, },
        { themeId: 1, categoryId: 4, },
        { themeId: 1, categoryId: 5, },
        { themeId: 1, categoryId: 6, },
        { themeId: 1, categoryId: 7, },
        { themeId: 1, categoryId: 8, },
        { themeId: 1, categoryId: 9, },
        { themeId: 1, categoryId: 10, },
        { themeId: 1, categoryId: 11, },
        { themeId: 1, categoryId: 12, },
        { themeId: 2, categoryId: 13, },
        { themeId: 2, categoryId: 14, },
        { themeId: 2, categoryId: 15, },
        { themeId: 3, categoryId: 16, },
        { themeId: 3, categoryId: 17, },
        { themeId: 3, categoryId: 18, },
        { themeId: 4, categoryId: 19, },
        { themeId: 4, categoryId: 20, },
        { themeId: 4, categoryId: 21, },
        { themeId: 4, categoryId: 22, },
        { themeId: 4, categoryId: 23, },
        { themeId: 4, categoryId: 24, },
        { themeId: 4, categoryId: 25, },
        { themeId: 4, categoryId: 26, },
        { themeId: 5, categoryId: 27, },
        { themeId: 5, categoryId: 28, },
        { themeId: 5, categoryId: 29, },
        { themeId: 6, categoryId: 30, },
        { themeId: 6, categoryId: 31, },
        { themeId: 6, categoryId: 32, },
        { themeId: 7, categoryId: 30, },
        { themeId: 7, categoryId: 31, },
        { themeId: 7, categoryId: 32, }
    ])
} catch (error) {
    console.log(error)
}


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
}