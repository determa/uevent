const evnts = [
    {
        id: 1,
        name: "Dnipro Fest",
        href: "/events/1",
        picture:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",

        date: "Fri, 24.03.2022 19:00",
        price: "350",
        place: "Київ, Алея Героїв Небесної Сотні, 1",
        categories: ["рок", "поп", "джаз"],
        description:
            "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
    },
    {
        id: 2,
        name: "Dnipro Fest",
        href: "/events/2",
        picture:
            "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",

        date: "Fri, 24.03.2022 19:00",
        price: "350",
        place: "Київ, Алея Героїв Небесної Сотні, 1",
        categories: ["рок", "поп", "джаз"],
        description:
            "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
    },
    {
        id: 3,
        name: "Dnipro Fest",
        href: "/events/3",
        picture:
            "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",

        date: "Fri, 24.03.2022 19:00",
        price: "350",
        place: "Київ, Алея Героїв Небесної Сотні, 1",
        categories: ["рок", "поп", "джаз"],
        description:
            "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
    },
    {
        id: 4,
        name: "Dnipro Fest",
        href: "/events/4",
        picture:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",

        date: "Fri, 24.03.2022 19:00",
        price: "350 грн",
        place: "Київ, Алея Героїв Небесної Сотні, 1",
        categories: ["рок", "поп", "джаз"],
        description:
            "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
    },
];

const userProfile = [
    {
        id: 333,
        name: "Jonny",
        picture: "https://randomuser.me/api/portraits/men/99.jpg",
        createAt: "2023-04-05 16:17:45",
        email: "email123@gmail.com",
        role: "ADMIN",
    },
    {
        id: 777,
        name: "Den4ik",
        picture: "https://randomuser.me/api/portraits/men/77.jpg",
        createAt: "2023-04-05 16:17:45",
        email: "email123@gmail.com",
        role: "ADMIN",
    },
];

const companyProfile = [
    {
        id: 333,
        name: "Huggy Waggy",
        picture: "https://random.imagecdn.app/500/400",
        location: "Dnipro City",
        description: "Компания Huggy Waggy",
        role: "ADMIN",
    },
    {
        id: 777,
        name: "Den4ik",
        picture: "https://random.imagecdn.app/500/400",
        location: "Dnipro City",
        description: "",
        role: "ADMIN",
    },
];

const userComments = [
    {
        id: 1,
        content: "Крутой блог!",
        accountId: 1,
        createdAt: "2023-04-15T12:30:00Z",
        event: {
            id: 1,
            title: "Alpha",
        },
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
    },
    {
        id: 2,
        content: "Чучквл!",
        accountId: 1,
        createdAt: "2023-04-15T12:30:00Z",
        event: {
            id: 2,
            title: "Omega",
        },
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
    },
    {
        id: 3,
        content: "Тестовый комментарий для поста",
        accountId: 1,
        createdAt: "2023-04-15T12:30:00Z",
        event: {
            id: 3,
            title: "asd",
        },
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
    },
    {
        id: 4,
        content: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона.",
        accountId: 1,
        createdAt: "2023-04-15T12:30:00Z",
        event: {
            id: 4,
            title: "Tyasfka",
        },
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
    },
];

const comments = [
    {
        id: 1,
        content: "Крутой блог!",
        accountId: 1,
        parentId: null,
        createdAt: "2023-04-15T12:30:00Z",
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
        replies: [
            {
                id: 2,
                content: "Спасибо, рад, что вам понравилось!",
                accountId: 2,
                parentId: 1,
                createdAt: "2023-04-15T13:00:00Z",
                user: {
                    id: 2,
                    name: "Den4ik",
                    picture: "d4a8fe2f-f681-43dc-9a8b-0f4af7cfb091.jpg",
                },
            },
            {
                id: 3,
                content: "Не согласен, нужно больше работать над контентом",
                accountId: 3,
                parentId: 1,
                createdAt: "2023-04-15T14:00:00Z",
                user: {
                    id: 3,
                    name: "Bogdan",
                    picture: "bc01fe5e-ac03-4128-a839-ac9bc7e246aa.jpg",
                },
            },
        ],
    },
    {
        id: 4,
        content: "Какой интересный пост!",
        accountId: 2,
        parentId: null,
        createdAt: "2023-04-15T15:00:00Z",
        user: {
            id: 1,
            name: "Vladick",
            picture: "4f93204a-b9c0-4c2f-a95a-51b867d85cfb.jpg",
        },
        replies: [],
    },
    {
        id: 5,
        content: "Крутой блог!",
        accountId: 1,
        parentId: null,
        createdAt: "2023-04-15T12:30:00Z",
        user: {
            id: 1,
            name: "Jeka",
            picture: "e2aed0de-1b24-49b7-817d-fdff35310704.jpg",
        },
        replies: [
            {
                id: 6,
                content: "Спасибо, рад, что вам понравилось!",
                accountId: 2,
                parentId: 1,
                createdAt: "2023-04-15T13:00:00Z",
                user: {
                    id: 2,
                    name: "Den4ik",
                    picture: "d4a8fe2f-f681-43dc-9a8b-0f4af7cfb091.jpg",
                },
            },
            {
                id: 7,
                content: "Не согласен, нужно больше работать над контентом",
                accountId: 3,
                parentId: 1,
                createdAt: "2023-04-15T14:00:00Z",
                user: {
                    id: 3,
                    name: "Bogdan",
                    picture: "bc01fe5e-ac03-4128-a839-ac9bc7e246aa.jpg",
                },
            },
        ],
    },
    {
        id: 8,
        content: "Какой интересный пост!",
        accountId: 2,
        parentId: null,
        createdAt: "2023-04-15T15:00:00Z",
        user: {
            id: 1,
            name: "Vladick",
            picture: "4f93204a-b9c0-4c2f-a95a-51b867d85cfb.jpg",
        },
        replies: [],
    },
];

export { evnts, userProfile, companyProfile, comments, userComments };
