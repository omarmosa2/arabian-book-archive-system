
export const books = [
  {
    id: 1,
    title: "مقدمة ابن خلدون",
    author: "عبد الرحمن ابن خلدون",
    category: "فلسفة",
    publishYear: "1377",
    cover: "https://i.imgur.com/kOvfhQu.jpg",
    available: true,
    description: "من أهم الكتب في التاريخ الإسلامي، يتناول ابن خلدون فيه أسس علم الاجتماع والعمران البشري.",
    isbn: "9789777950206",
    pages: 824,
    language: "العربية",
    publisher: "دار الكتب المصرية",
    ratings: 4.8,
    reviewCount: 156
  },
  {
    id: 2,
    title: "كتاب البخلاء",
    author: "أبو عثمان الجاحظ",
    category: "أدب",
    publishYear: "869",
    cover: "https://i.imgur.com/ksYzX03.jpg",
    available: true,
    description: "كتاب طريف يسرد فيه الجاحظ قصصًا عن البخلاء بأسلوب ساخر، يعد من أروع وأمتع ما كتب في الأدب العربي.",
    isbn: "9789776641822",
    pages: 312,
    language: "العربية",
    publisher: "مؤسسة هنداوي",
    ratings: 4.6,
    reviewCount: 98
  },
  {
    id: 3,
    title: "الكامل في التاريخ",
    author: "ابن الأثير",
    category: "تاريخ",
    publishYear: "1231",
    cover: "https://i.imgur.com/OLFcwPL.jpg",
    available: false,
    description: "موسوعة تاريخية كبرى تسرد تاريخ العالم منذ بداية الخليقة وحتى سنة 628هـ.",
    isbn: "9789953345123",
    pages: 1589,
    language: "العربية",
    publisher: "دار الكتب العلمية",
    ratings: 4.9,
    reviewCount: 75
  },
  {
    id: 4,
    title: "طوق الحمامة",
    author: "ابن حزم الأندلسي",
    category: "أدب",
    publishYear: "1022",
    cover: "https://i.imgur.com/7SzqRhy.jpg",
    available: true,
    description: "كتاب في الحب والعشق وأحوالهما، من أشهر المؤلفات التي تتناول الحب وفلسفته في التراث العربي.",
    isbn: "9789771456789",
    pages: 276,
    language: "العربية",
    publisher: "مكتبة الخانجي",
    ratings: 4.7,
    reviewCount: 112
  },
  {
    id: 5,
    title: "كليلة ودمنة",
    author: "ابن المقفع",
    category: "أدب",
    publishYear: "750",
    cover: "https://i.imgur.com/XFt9G21.jpg",
    available: true,
    description: "كتاب من الأدب السياسي المترجم عن الفارسية، يضم قصصًا على لسان الحيوان تحمل حكمًا وعبرًا وإرشادات.",
    isbn: "9789777950456",
    pages: 328,
    language: "العربية",
    publisher: "دار الشروق",
    ratings: 4.5,
    reviewCount: 203
  },
  {
    id: 6,
    title: "الأغاني",
    author: "أبو الفرج الأصفهاني",
    category: "أدب",
    publishYear: "967",
    cover: "https://i.imgur.com/nTVahx7.jpg",
    available: false,
    description: "موسوعة أدبية وتاريخية تضم أخبار الشعراء والمغنين والقصص والنوادر والأشعار.",
    isbn: "9789957123456",
    pages: 1200,
    language: "العربية",
    publisher: "دار صادر",
    ratings: 4.4,
    reviewCount: 67
  }
];

export const users = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    type: "admin",
    joinDate: "2023-01-15",
    borrowedBooks: 0
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    type: "user",
    joinDate: "2023-02-25",
    borrowedBooks: 2
  },
  {
    id: 3,
    name: "خالد عبد الله",
    email: "khalid@example.com",
    type: "user",
    joinDate: "2023-03-10",
    borrowedBooks: 1
  },
  {
    id: 4,
    name: "فاطمة علي",
    email: "fatima@example.com", 
    type: "user",
    joinDate: "2023-04-05",
    borrowedBooks: 3
  }
];

export const borrowings = [
  {
    id: 1,
    bookId: 2,
    userId: 2,
    borrowDate: "2024-04-10",
    dueDate: "2024-04-24",
    returned: false
  },
  {
    id: 2,
    bookId: 4,
    userId: 2,
    borrowDate: "2024-04-15",
    dueDate: "2024-04-29", 
    returned: false
  },
  {
    id: 3,
    bookId: 5,
    userId: 3,
    borrowDate: "2024-04-12",
    dueDate: "2024-04-26",
    returned: false
  },
  {
    id: 4,
    bookId: 1,
    userId: 4,
    borrowDate: "2024-04-05",
    dueDate: "2024-04-19",
    returned: false
  },
  {
    id: 5,
    bookId: 3,
    userId: 4,
    borrowDate: "2024-04-06",
    dueDate: "2024-04-20",
    returned: true,
    returnDate: "2024-04-18"
  },
  {
    id: 6,
    bookId: 6,
    userId: 4,
    borrowDate: "2024-04-08",
    dueDate: "2024-04-22",
    returned: false
  }
];

export const reviews = [
  {
    id: 1,
    bookId: 1,
    userId: 2,
    rating: 5,
    reviewText: "كتاب رائع يحمل قيمة علمية عالية، استفدت منه الكثير في فهم طبيعة المجتمعات البشرية.",
    date: "2024-02-15"
  },
  {
    id: 2,
    bookId: 1,
    userId: 3,
    rating: 4,
    reviewText: "من أمهات الكتب التي لا غنى عنها لفهم التاريخ الإسلامي والاجتماع البشري.",
    date: "2024-03-10"
  },
  {
    id: 3,
    bookId: 2,
    userId: 4,
    rating: 5,
    reviewText: "أسلوب ساخر رائع، ووصف دقيق لشخصيات البخلاء. استمتعت كثيراً بقراءته.",
    date: "2024-01-20"
  },
  {
    id: 4,
    bookId: 3,
    userId: 2,
    rating: 5,
    reviewText: "موسوعة تاريخية متكاملة، مرجع أساسي لا يمكن الاستغناء عنه.",
    date: "2024-02-28"
  }
];

export const statistics = {
  totalBooks: 145,
  availableBooks: 112,
  totalUsers: 78,
  activeLoans: 23,
  completedLoans: 156,
  mostBorrowedBooks: [
    {id: 1, title: "مقدمة ابن خلدون", count: 32},
    {id: 5, title: "كليلة ودمنة", count: 28},
    {id: 2, title: "كتاب البخلاء", count: 26},
    {id: 4, title: "طوق الحمامة", count: 23}
  ],
  popularCategories: [
    {category: "أدب", count: 52},
    {category: "تاريخ", count: 34},
    {category: "فلسفة", count: 27},
    {category: "علوم", count: 18}
  ]
};
