const { Account, User, Event, Theme, Category, ThemeCategory, Company } = require("./models");

module.exports = async function init() {
    try {
        let account = null;
        if (!await Account.findOne({ where: { email: "admin@admin.com" } }))
            account = await Account.create(
                {
                    email: "admin@admin.com",
                    password: '$2b$05$TwLgpsljDaetcWvxbB6gcuZhhi8cwLf4G6HMuN5FMtgCRLA.fFAsm',
                    type: 'USER',
                    confirmed: true,
                }
            );
        let account_2 = null;
        if (!await Account.findOne({ where: { email: "com@com.com" } }))
            account_2 = await Account.create(
                {
                    email: "com@com.com",
                    password: '$2b$05$TwLgpsljDaetcWvxbB6gcuZhhi8cwLf4G6HMuN5FMtgCRLA.fFAsm',
                    type: 'COMPANY',
                    confirmed: true,
                }
            );
        let user = null;
        if (!await User.findOne({ where: { name: 'admin' } }))
            user = await User.create(
                {
                    name: "admin",
                    picture: "default.jpg",
                    role: 'ADMIN',
                    accountId: account.id,
                }
            );
        let company = null;
        if (!await Company.findOne({ where: { name: 'company' } }))
            company = await User.create(
                {
                    name: "company",
                    picture: "default.jpg",
                    location: JSON.stringify({ name: 'Dnipro, dnipro obl, Ukraine', location: { lat: -34.397, lng: 150.644 } }),
                    description: "Company",
                    accountId: account_2.id,
                }
            );
        let theme = null;
        if (await Theme.count() < 1)
            theme = await Theme.bulkCreate([
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
        let category = null;
        if (await Category.count() < 1)
            category = await Category.bulkCreate([
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

        if (await Event.count() < 1)
            await Event.bulkCreate([
                {
                    title: 'Alpha',
                    picture: "header.jpg",
                    description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
                    date: Date.now(),
                    location: JSON.stringify({ name: 'Dnipro, dnipro obl, Ukraine', location: { lat: -34.397, lng: 150.644 } }),
                    price: 1000,
                    tickets_count: 250,
                    companyId: company.companyId,
                    themeId: theme[0].id,
                    categoryId: category[0].id,
                },
                {
                    title: 'Omega',
                    picture: "header.jpg",
                    description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
                    date: Date.now(),
                    location: JSON.stringify({ name: 'Dnipro, dnipro obl, Ukraine', location: { lat: -34.397, lng: 150.644 } }),
                    price: 1000,
                    tickets_count: 250,
                    companyId: company.companyId,
                    themeId: theme[0].id,
                    categoryId: category[0].id,
                }
            ]);

        if (await ThemeCategory.count() < 1)
            await ThemeCategory.bulkCreate([
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
}
