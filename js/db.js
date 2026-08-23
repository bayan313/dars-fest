// THANAFUS Dars Fest 2026 - Shared Database System

const DEFAULT_DB = {
  teams: [
    { id: "team-1", name: "Sabha", captain: "Unais", viceCaptain: "Mukthar", members: ["Unais", "Mukthar", "Shahin Ali", "Ashraf", "Sadeed", "Aadil"], totalScore: 0, rank: 1, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-2", name: "Lizaz", captain: "Adnan", viceCaptain: "Rasmil", members: ["Adnan", "Rasmil", "Basith", "Marvan", "Amjad", "Nihad"], totalScore: 0, rank: 2, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-3", name: "Laheef", captain: "Sinan vp", viceCaptain: "Syd mushab", members: ["Sinan vp", "Syd mushab", "Muheenudheen", "Ajmal nasim", "Rasheq", "Rashid p"], totalScore: 0, rank: 3, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-4", name: "Murthajiz", captain: "Rishad MP", viceCaptain: "Junaid", members: ["Rishad MP", "Junaid", "Nashan", "Sayyid Dilshan", "Jamal", "Sayyid Shafeeh", "Shabeeb"], totalScore: 0, rank: 4, grades: { A: 0, B: 0, C: 0 }, wins: [] }
  ],
  students: [
    // --- TEAM 1: SABHA ---
    // Senior (101-106)
    { id: "stud-101", chestNo: "101", name: "Unais", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-102", chestNo: "102", name: "Mukthar", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-103", chestNo: "103", name: "Shahin Ali", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-104", chestNo: "104", name: "Ashraf", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-105", chestNo: "105", name: "Sadeed", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-106", chestNo: "106", name: "Aadil", teamId: "team-1", category: "Senior", photo: "" },
    // Junior (107-116)
    { id: "stud-107", chestNo: "107", name: "Shuhaib", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-108", chestNo: "108", name: "Farhan CH", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-109", chestNo: "109", name: "Farhan PK", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-110", chestNo: "110", name: "Shabeeb M", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-111", chestNo: "111", name: "A. Basith", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-112", chestNo: "112", name: "Suhail", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-113", chestNo: "113", name: "Sahad", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-114", chestNo: "114", name: "Ahnaf", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-115", chestNo: "115", name: "Al Ameen", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-116", chestNo: "116", name: "Midlaj K", teamId: "team-1", category: "Junior", photo: "" },
    // Sub Junior (117-122)
    { id: "stud-117", chestNo: "117", name: "Thahseen", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-118", chestNo: "118", name: "A. Saeed", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-119", chestNo: "119", name: "Razi", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-120", chestNo: "120", name: "Mahmood", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-121", chestNo: "121", name: "Shafas", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-122", chestNo: "122", name: "Rahman", teamId: "team-1", category: "Sub Junior", photo: "" },

    // --- TEAM 2: LIZAZ ---
    // Senior (201-206)
    { id: "stud-201", chestNo: "201", name: "Adnan", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-202", chestNo: "202", name: "Rasmil", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-203", chestNo: "203", name: "Basith", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-204", chestNo: "204", name: "Marvan", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-205", chestNo: "205", name: "Amjad", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-206", chestNo: "206", name: "Nihad", teamId: "team-2", category: "Senior", photo: "" },
    // Junior (207-215)
    { id: "stud-207", chestNo: "207", name: "Muheenudheen km", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-209", chestNo: "209", name: "Hisham", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-210", chestNo: "210", name: "Jamshiyas", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-211", chestNo: "211", name: "Shamveel", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-212", chestNo: "212", name: "Muhaimin", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-213", chestNo: "213", name: "Mishal", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-214", chestNo: "214", name: "Fayas", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-215", chestNo: "215", name: "Swalih", teamId: "team-2", category: "Junior", photo: "" },
    // Sub Junior (216-222)
    { id: "stud-216", chestNo: "216", name: "Shibili .p.", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-217", chestNo: "217", name: "Sahad . N", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-218", chestNo: "218", name: "Ishan . Pn", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-219", chestNo: "219", name: "Muhammadali", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-220", chestNo: "220", name: "Yaseen", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-221", chestNo: "221", name: "Shaheem", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-222", chestNo: "222", name: "Abdul hadi", teamId: "team-2", category: "Sub Junior", photo: "" },

    // --- TEAM 3: LAHEEF ---
    // Senior (301-306)
    { id: "stud-301", chestNo: "301", name: "Sinan vp", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-302", chestNo: "302", name: "Syd mushab", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-303", chestNo: "303", name: "Muheenudheen", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-304", chestNo: "304", name: "Ajmal nasim", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-305", chestNo: "305", name: "Rasheq", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-306", chestNo: "306", name: "Rashid p", teamId: "team-3", category: "Senior", photo: "" },
    // Junior (307-316)
    { id: "stud-307", chestNo: "307", name: "Irshad vp", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-308", chestNo: "308", name: "Muhsin pv", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-309", chestNo: "309", name: "Swalahudheen ayyoobi", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-310", chestNo: "310", name: "Anshif", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-311", chestNo: "311", name: "Naveed", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-312", chestNo: "312", name: "Yaseen", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-313", chestNo: "313", name: "Salim", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-314", chestNo: "314", name: "Hashir", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-315", chestNo: "315", name: "Abdu rhman", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-316", chestNo: "316", name: "Salman N", teamId: "team-3", category: "Junior", photo: "" },
    // Sub Junior (317-322)
    { id: "stud-317", chestNo: "317", name: "Ibrahim", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-318", chestNo: "318", name: "Rizvan", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-319", chestNo: "319", name: "Fahad", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-320", chestNo: "320", name: "Ameen", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-321", chestNo: "321", name: "Abdulla umar", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-322", chestNo: "322", name: "Aadil", teamId: "team-3", category: "Sub Junior", photo: "" },

    // --- TEAM 4: MURTHAJIZ ---
    // Senior (401-407)
    { id: "stud-401", chestNo: "401", name: "Rishad MP", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-402", chestNo: "402", name: "Junaid", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-403", chestNo: "403", name: "Nashan", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-404", chestNo: "404", name: "Sayyid Dilshan", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-405", chestNo: "405", name: "Jamal", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-406", chestNo: "406", name: "Sayyid Shafeeh", teamId: "team-4", category: "Senior", photo: "" },
    { id: "stud-407", chestNo: "407", name: "Shabeeb", teamId: "team-4", category: "Senior", photo: "" },
    // Junior (408-415)
    { id: "stud-408", chestNo: "408", name: "Bishr", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-409", chestNo: "409", name: "Ajsal", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-410", chestNo: "410", name: "Sinan kk", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-411", chestNo: "411", name: "Nishan", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-412", chestNo: "412", name: "Sadiq ali", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-413", chestNo: "413", name: "Rabeeh", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-414", chestNo: "414", name: "Arshad", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-415", chestNo: "415", name: "Uvais", teamId: "team-4", category: "Junior", photo: "" },
    // Sub Junior (416-422)
    { id: "stud-416", chestNo: "416", name: "Shadin", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-417", chestNo: "417", name: "Fasmil", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-418", chestNo: "418", name: "Muhyidheen ct", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-419", chestNo: "419", name: "Shahid", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-420", chestNo: "420", name: "Arshad", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-421", chestNo: "421", name: "Saeed K", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-422", chestNo: "422", name: "Anas", teamId: "team-4", category: "Sub Junior", photo: "" }
  ],
  programmes: [
    // --- GENERAL (GROUP / OFF STAGE) ---
    { id: "prog-g1", name: "Newspaper Making", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g2", name: "Burda Recitation", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g3", name: "Islamic Song", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g4", name: "Madh Mashup", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g5", name: "Programme Setting", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g6", name: "Group Quiz", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g7", name: "Live Translation ENG", category: "General", type: "individual", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g8", name: "Live Translation ARB", category: "General", type: "individual", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g9", name: "Conversation", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g10", name: "Munazara", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g11", name: "Debate", category: "General", type: "group", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-g12", name: "Padipparayal", category: "General", type: "individual", venue: "Stage 1", judge: "Panel", resultsPublished: false, results: [] },

    // --- SENIOR STAGE ---
    { id: "prog-ss1", name: "Qirath", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss2", name: "Hifz", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss3", name: "Baang", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss4", name: "Class Presentation", category: "Senior", type: "group", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss5", name: "Wa'z", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss6", name: "Speech Malayalam", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss7", name: "Speech Arabic", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss8", name: "Speech Urdu", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss9", name: "Speech English", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss10", name: "Khutba", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss11", name: "Prose Reading", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss12", name: "Poem Writing & Recitation MLM", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss13", name: "Announcement", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss14", name: "Malayalam Song", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss15", name: "Mappila Song", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss16", name: "Musha'ara", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-ss17", name: "Spelling Bee", category: "Senior", type: "individual", venue: "Main Stage", judge: "Panel", resultsPublished: false, results: [] },

    // --- SENIOR OFF STAGE ---
    { id: "prog-so1", name: "Khat Naskh", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so2", name: "Khat Ruq'a", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so3", name: "Translation ARB-MLM", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so4", name: "Translation MLM-ARB", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so5", name: "Translation ARB-ENG", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so6", name: "Essay Arabic", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so7", name: "Essay English", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so8", name: "Essay Malayalam", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so9", name: "Slogan Writing", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so10", name: "Reporting", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so11", name: "Poem Writing Arabic", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so12", name: "Dictionary Making ARB", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so13", name: "Word Building", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so14", name: "Arabic Calligraphy", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so15", name: "Tashkeel", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so16", name: "Quiz", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so17", name: "Digital Poster", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so18", name: "Title Writing", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-so19", name: "Caption Writing", category: "Senior", type: "individual", venue: "Class Room 1", judge: "Panel", resultsPublished: false, results: [] },

    // --- JUNIOR STAGE ---
    { id: "prog-js1", name: "Qirath", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js2", name: "Hifz", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js3", name: "Baang", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js4", name: "Speech Malayalam", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js5", name: "Speech Arabic", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js6", name: "Speech Urdu", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js7", name: "Speech English", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js8", name: "Book Reading", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js9", name: "Arabic Song", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js10", name: "Mappila Song", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js11", name: "Maala Song", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js12", name: "Urdu Song", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js13", name: "Arabic Poem Recitation", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js14", name: "Musha'ara", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js15", name: "English Poem Recitation", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js16", name: "Arabic Poem Recitation", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js17", name: "Madhunnabi", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js18", name: "Arabic Group Song", category: "Junior", type: "group", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js19", name: "Malayalam Group Song", category: "Junior", type: "group", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js20", name: "Thasreef", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-js21", name: "Wa'z", category: "Junior", type: "individual", venue: "Stage 2", judge: "Panel", resultsPublished: false, results: [] },

    // --- JUNIOR OFF STAGE ---
    { id: "prog-jo1", name: "Water Color Painting", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo2", name: "Sudoku", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo3", name: "Memory Test", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo4", name: "Khat Naskh", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo5", name: "Dictation Malayalam", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo6", name: "Poster Designing", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo7", name: "Dictionary Making", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo8", name: "Tashkeel", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo9", name: "Essay Malayalam", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo10", name: "Quiz", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo11", name: "Title Making", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo12", name: "Caption Writing", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo13", name: "Word Building", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo14", name: "Poem Writing Malayalam", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-jo15", name: "Arabic Calligraphy", category: "Junior", type: "individual", venue: "Class Room 2", judge: "Panel", resultsPublished: false, results: [] },

    // --- SUB JUNIOR STAGE ---
    { id: "prog-sub1", name: "Qirath", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub2", name: "Hifz", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub3", name: "Story Telling Malayalam", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub4", name: "Arabic Poem Recitation", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub5", name: "English Poem Recitation", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub6", name: "Madhunnabi", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub7", name: "Sweet Malayalam", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub8", name: "Arabic Song", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub9", name: "Speech Malayalam", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub10", name: "Urdu Song", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub11", name: "Baang", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub12", name: "Pic and Talk", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub13", name: "Prose Reading MLM", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-sub14", name: "Prose Reading Arabic", category: "Sub Junior", type: "individual", venue: "Stage 3", judge: "Panel", resultsPublished: false, results: [] },

    // --- SUB JUNIOR OFF STAGE ---
    { id: "prog-subo1", name: "Hand Writing ARB", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-subo2", name: "Hand Writing MLM", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-subo3", name: "Hand Writing ENG", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-subo4", name: "Memory Test", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-subo5", name: "Rubik's Cube", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] },
    { id: "prog-subo6", name: "Pencil Drawing", category: "Sub Junior", type: "individual", venue: "Class Room 3", judge: "Panel", resultsPublished: false, results: [] }
  ],
  notifications: [
    { id: "notif-1", title: "THANAFUS Dars Fest 2026 Live", content: "Welcome to THANAFUS Dars Fest 2026. Live stage evaluations and event announcements will appear here in real time.", type: "info", date: "2026-07-03T09:00:00Z" },
    { id: "notif-2", title: "Appeal Panel Active", content: "All appeals regarding published results must be submitted within 1 hour of the official announcement.", type: "warning", date: "2026-07-03T11:30:00Z" },
    { id: "notif-3", title: "Venue Schedule Announced", content: "Events are taking place across Imam Bukhari Stage, Imam Malik Stage, and designated classrooms.", type: "info", date: "2026-07-03T13:00:00Z" }
  ],
  appeals: [
    { id: "appl-1", studentName: "Shamil V.P.", team: "Al Buruj", category: "Sub Junior", programme: "Speech", phoneNumber: "9876543210", description: "Requesting re-evaluation of my speech. I believe there was a calculation mismatch in the scoring sheet.", status: "Approved", response: "Re-evaluation completed. The rank remains unchanged, but points corrected.", date: "2026-07-03T14:00:00Z" }
  ],
  gallery: [
    { id: "gal-1", type: "image", title: "Inauguration Ceremony", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop", day: "Day 1", category: "General", event: "Inaugural Session" },
    { id: "gal-2", type: "image", title: "Quran Recitation Sub Junior", url: "https://images.unsplash.com/photo-1584281729055-df13fb254bfb?w=800&auto=format&fit=crop", day: "Day 1", category: "Sub Junior", event: "Quran Recitation" },
    { id: "gal-3", type: "image", title: "Senior Speech Stage", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop", day: "Day 1", category: "Senior", event: "Speech" },
    { id: "gal-4", type: "video", title: "Fest Highlights Day 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", day: "Day 1", category: "General", event: "Overall Highlights" }
  ],
  contact: {
    coordinatorName: "Usthad Musthafa Baqavi",
    coordinatorPhone: "+91 9744597387",
    techSupportName: "Thanafus IT Support Team",
    techSupportPhone: "+91 9526919218",
    email: "info@thanafusfest.com",
    address: "THANAFUS Dars Fest Committee Office, Bayan Uloom Dars, Muttichira"
  },
  messages: [],
  settings: {
    prospectusUrl: "", // Base64 or standard URL
    adminPassword: "bayanadmin"
  }
};

class Database {
  constructor() {
    this.loadedFromServer = false;
    this._saving = false;
    this._dirty = false;
    
    // Fast local cache hydration for zero-lag instant rendering
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem('thanafus_fest_db_cache');
        if (cached) {
          this.db = JSON.parse(cached);
        }
      }
    } catch (e) { /* silent */ }

    if (!this.db || !this.db.teams) {
      this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    }
    this._ensureDbDefaults();

    this._loadPromise = this.load();
    this._loadPromise.then(() => {
      this.calculateLeaderboard();
      this.startAutoSync(6000);
    });

    // Cross-tab real-time sync with BroadcastChannel
    try {
      if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
        this._channel = new BroadcastChannel('thanafus_fest_channel');
        this._channel.onmessage = (event) => {
          if (event && event.data && event.data.type === 'DB_UPDATED' && event.data.db) {
            this.db = event.data.db;
            this._ensureDbDefaults();
            this.calculateLeaderboard();
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('thanafus_fest_db_cache', JSON.stringify(this.db));
              }
            } catch (e) {}
            window.dispatchEvent(new CustomEvent('thanafus:db-updated', { detail: { source: 'broadcast-channel' } }));
          }
        };
      }
    } catch (e) {}
  }

  _ensureDbDefaults() {
    if (!this.db || typeof this.db !== 'object') this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    this.db.teams = Array.isArray(this.db.teams) ? this.db.teams : [];
    this.db.students = Array.isArray(this.db.students) ? this.db.students : [];
    this.db.programmes = Array.isArray(this.db.programmes) ? this.db.programmes : [];
    this.db.notifications = Array.isArray(this.db.notifications) ? this.db.notifications : [];
    this.db.appeals = Array.isArray(this.db.appeals) ? this.db.appeals : [];
    this.db.gallery = Array.isArray(this.db.gallery) ? this.db.gallery : [];
    this.db.messages = Array.isArray(this.db.messages) ? this.db.messages : [];
    this.db.penalties = Array.isArray(this.db.penalties) ? this.db.penalties : [];
    this.db.contact = (this.db.contact && typeof this.db.contact === 'object') ? this.db.contact : JSON.parse(JSON.stringify(DEFAULT_DB.contact));
    this.db.settings = (this.db.settings && typeof this.db.settings === 'object') ? this.db.settings : JSON.parse(JSON.stringify(DEFAULT_DB.settings));
    if (!this.db.settings.adminPassword) this.db.settings.adminPassword = "bayanadmin";
  }

  async load() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      const response = await fetch('/api/all', { 
        cache: 'no-store',
        signal: controller.signal 
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const serverData = await response.json();
        if (serverData && typeof serverData === 'object' && !serverData.isOffline) {
          // Keep any local collections still mid-save (unsent marks etc.) from
          // being clobbered by the fresher server snapshot.
          const protectedCols = this._activeLocalCollections();
          const mergedData = { ...serverData };
          protectedCols.forEach(col => {
            if (col === 'contact' || col === 'settings') {
              if (this.db[col] !== undefined) mergedData[col] = this.db[col];
            } else if (Array.isArray(this.db[col])) {
              mergedData[col] = this._mergeDocs(serverData[col], this.db[col]);
            }
          });
          // The server's revision only wins if we are not about to retry a save;
          // otherwise keep our (merged) revision so the retry is not rejected.
          if (this._pendingCollections.size > 0 || this._dirty || this._saving) {
            mergedData.revision = this.db.revision;
          }
          this.db = mergedData;
          this._ensureDbDefaults();
          if (typeof this.db.revision !== 'number') this.db.revision = 0;
          this.loadedFromServer = true;
          this.calculateLeaderboard();
          this._persistLocal();
          return;
        }
      }
    } catch (e) {
      console.warn("Database sync notice:", e ? (e.message || e) : 'fetch notice');
    }
    this._loadFromCache();
    this._ensureDbDefaults();
    this.calculateLeaderboard();
  }

  _loadFromCache() {
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem('thanafus_fest_db_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object') {
            this.db = parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Cache load notice:", e);
    }
  }

  _persistLocal() {
    try {
      if (typeof localStorage !== 'undefined' && this.db) {
        localStorage.setItem('thanafus_fest_db_cache', JSON.stringify(this.db));
      }
    } catch (e) { /* storage quota or restricted */ }
    try {
      if (this._channel && this.db) {
        this._channel.postMessage({ type: 'DB_UPDATED', db: this.db });
      }
    } catch (e) {}
  }

  async ready() {
    try {
      // Wait for the real server fetch to finish (it has its own 12s timeout
      // and falls back to the cache on failure) so pages never render the
      // demo/sample DEFAULT_DB data instead of the site's actual data.
      await this._loadPromise;
    } catch (e) {}
  }

  isSaving() {
    return !!this._saving;
  }

  verifyAdminPassword(password) {
    const entered = (password || "").trim();
    if (!entered) return false;
    const stored = ((this.db && this.db.settings && this.db.settings.adminPassword) ? this.db.settings.adminPassword : "").trim();
    
    if (!stored) return false;
    
    // Direct match only
    if (entered === stored || entered.toLowerCase() === stored.toLowerCase()) return true;

    return false;
  }

  save(isReset, collectionName) {
    if (collectionName) {
      this._dirtyCollections = this._dirtyCollections || new Set();
      this._dirtyCollections.add(collectionName);
      this._pendingCollections = this._pendingCollections || new Set();
      this._pendingCollections.add(collectionName);
    }
    this._persistLocal();
    if (isReset || this._allowUnpublishAll) this._pendingReset = true;
    this._dirty = true;
    this._flushSave();
  }

  // Serializes saves so writes remain consistent across server and local client.
  _flushSave() {
    if (this._saving) return;
    if (!this._dirty) return;

    // Always rebuild the payload from the LATEST local db, including any
    // collections that previously failed and are queued for retry.
    const collections = new Set([
      ...Array.from(this._dirtyCollections || []),
      ...Array.from(this._pendingCollections || [])
    ]);
    const changedCollections = [...collections];
    this._dirty = false;
    this._saving = true;

    const payload = {
      ...this.db,
      collections: changedCollections,
      revision: this.db.revision || 0,
      clientVerified: true,
      allowUnpublishAll: true,
      allowUnpublish: true
    };

    if (this._pendingReset) {
      payload.reset = true;
      this._pendingReset = false;
    }
    this._allowUnpublishAll = false;
    this._dirtyCollections = new Set();
    // Keep the collections marked so a failed send is retried automatically.
    this._pendingCollections = collections;

    this._sendSave(payload, changedCollections, 0);
  }

  // Collections that are still being saved/retried and must not be silently
  // overwritten by a polling load.
  _activeLocalCollections() {
    return new Set([
      ...Array.from(this._dirtyCollections || []),
      ...Array.from(this._pendingCollections || [])
    ]);
  }

  // Merge two doc lists by id. Local docs win for ids present locally; any doc
  // only on the server (added by another device) is preserved.
  _mergeDocs(freshDocs, localDocs) {
    const fresh = Array.isArray(freshDocs) ? freshDocs : [];
    const local = Array.isArray(localDocs) ? localDocs : [];
    const map = new Map();
    fresh.forEach(d => { if (d && d.id != null) map.set(String(d.id), d); });
    local.forEach(d => { if (d && d.id != null) map.set(String(d.id), d); });
    return Array.from(map.values());
  }

  async _sendSave(payload, changedCollections, attempt) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || ('Server error (HTTP ' + res.status + ')'));
        error.status = res.status;
        throw error;
      }

      const data = await res.json();
      this._retries = 0;
      this._mergeAttempts = 0;
      this._pendingCollections = new Set();
      if (data && typeof data === 'object' && !data.isOffline) {
        if (typeof data.revision === 'number') this.db.revision = data.revision;
        this.loadedFromServer = true;
        this.calculateLeaderboard();
        this._persistLocal();
      }
      this._saving = false;
      if (typeof window !== 'undefined' && typeof window.__onDbSaved === 'function') {
        window.__onDbSaved();
      }
      if (this._dirty) {
        this._flushSave();
      }
    } catch (e) {
      clearTimeout(timeoutId);

      if (e && e.status === 409) {
        // Another device saved first. Merge the local changes into the freshest
        // server data and retry, so the marks entered here are never discarded.
        if (typeof window !== 'undefined' && typeof window.__onDbSaveError === 'function') {
          window.__onDbSaveError(e);
        }
        const mergeCollections = Array.isArray(payload.collections) ? payload.collections : changedCollections;
        this._mergeAttempts = (this._mergeAttempts || 0) + 1;
        if (this._mergeAttempts <= 5) {
          try {
            const fresh = await this._fetchFresh();
            if (fresh && !fresh.isOffline) {
              const merged = { ...fresh };
              mergeCollections.forEach(col => {
                if (col === 'contact' || col === 'settings') {
                  if (this.db[col] !== undefined) merged[col] = this.db[col];
                } else if (Array.isArray(this.db[col])) {
                  merged[col] = this._mergeDocs(fresh[col], this.db[col]);
                }
              });
              merged.revision = fresh.revision || 0;
              this.db = merged;
              this._persistLocal();
              this._pendingCollections = new Set(mergeCollections);
              // Wait a moment for concurrent saves to settle, then retry with
              // the fresh revision and merged data.
              this._saving = false;
              setTimeout(() => {
                this._dirty = true;
                this._flushSave();
              }, 800);
              return;
            }
          } catch (mergeErr) {
            console.warn('Conflict merge failed:', mergeErr.message || mergeErr);
          }
        }
        this._saving = false;
        console.warn('Conflict retries exhausted; changes kept locally.', e.message || e);
        this._persistLocal();
        return;
      }

      this._saving = false;
      console.warn('API sync notice (saved locally):', e.message || e);
      this._persistLocal();

      // Retry transient failures (network / 503 / merge-then-post) automatically
      // so the data eventually reaches the server without a manual refresh.
      if (attempt < 6 && (this._pendingCollections.size > 0 || this._dirty)) {
        setTimeout(() => {
          if (!this._saving && (this._pendingCollections.size > 0 || this._dirty)) {
            this._dirty = true;
            this._flushSave();
          }
        }, 5000 * (attempt + 1));
      }
    }
  }

  async _fetchFresh() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch('/api/all?_t=' + Date.now(), { 
        cache: 'no-store', 
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      clearTimeout(timeoutId);
      return null;
    }
  }

  startAutoSync(intervalMs = 1500) {
    if (typeof window === 'undefined') return;
    if (this._syncTimer) clearInterval(this._syncTimer);
    
    this._syncTimer = setInterval(async () => {
      // Don't poll while saving or dirty
      if (this._saving || this._dirty) return;
      try {
        const fresh = await this._fetchFresh();
        if (fresh && typeof fresh === 'object' && !fresh.isOffline) {
          const freshRev = typeof fresh.revision === 'number' ? fresh.revision : 0;
          const currentRev = typeof this.db.revision === 'number' ? this.db.revision : 0;
          
          if (freshRev === 0 && currentRev > 0) {
            // Server DB was reset or migrated. Upload our full local state to initialize it.
            this.save(true);
            return;
          }

          if (freshRev !== currentRev || !this.loadedFromServer) {
            const protectedCols = this._activeLocalCollections();
            const mergedData = { ...fresh };
            protectedCols.forEach(col => {
              if (col === 'contact' || col === 'settings') {
                if (this.db[col] !== undefined) mergedData[col] = this.db[col];
              } else if (Array.isArray(this.db[col])) {
                mergedData[col] = this._mergeDocs(fresh[col], this.db[col]);
              }
            });
            this.db = mergedData;
            this._ensureDbDefaults();
            this.loadedFromServer = true;
            this.calculateLeaderboard();
            this._persistLocal();
            
            window.dispatchEvent(new CustomEvent('thanafus:db-updated', { detail: { source: 'auto-sync', revision: freshRev } }));
          }
        }
      } catch (e) {
        // silent background sync failure
      }
    }, intervalMs);
  }

  reset() {
    this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    this._persistLocal();
    this.save(true);
    this.calculateLeaderboard();
  }

  // Calculate points according to rule:
  // Individual: 1+A=10, 1+B=8, 1+C=6 | 2+A=8, 2+B=6, 2+C=4 | 3+A=6, 3+B=4, 3+C=2
  // Rank only (no grade): 1st=5, 2nd=3, 3rd=1
  // Grade only (no rank): A=5, B=3, C=1
  calculatePoints(rank, grade) {
    const r = parseInt(rank) || null;
    const g = grade ? grade.toUpperCase().trim() : null;

    if (r === 1) {
      if (g === 'A') return 10;
      if (g === 'B') return 8;
      if (g === 'C') return 6;
      return 5;
    } else if (r === 2) {
      if (g === 'A') return 8;
      if (g === 'B') return 6;
      if (g === 'C') return 4;
      return 3;
    } else if (r === 3) {
      if (g === 'A') return 6;
      if (g === 'B') return 4;
      if (g === 'C') return 2;
      return 1;
    } else {
      if (g === 'A') return 5;
      if (g === 'B') return 3;
      if (g === 'C') return 1;
      return 0;
    }
  }

  // Group/General event scoring:
  // 1+A=15, 1+B=13, 1+C=11 | 2+A=13, 2+B=11, 2+C=9 | 3+A=11, 3+B=9, 3+C=7
  // Rank only (no grade): 1st=10, 2nd=8, 3rd=6
  // Grade only (no rank): A=5, B=3, C=1
  calculateGroupPoints(rank, grade) {
    const r = parseInt(rank) || null;
    const g = grade ? grade.toUpperCase().trim() : null;

    if (r === 1) {
      if (g === 'A') return 15;
      if (g === 'B') return 13;
      if (g === 'C') return 11;
      return 10;
    } else if (r === 2) {
      if (g === 'A') return 13;
      if (g === 'B') return 11;
      if (g === 'C') return 9;
      return 8;
    } else if (r === 3) {
      if (g === 'A') return 11;
      if (g === 'B') return 9;
      if (g === 'C') return 7;
      return 6;
    } else {
      if (g === 'A') return 5;
      if (g === 'B') return 3;
      if (g === 'C') return 1;
      return 0;
    }
  }

  // Programme points by type (individual vs group)
  programmePoints(prog, rank, grade) {
    const isGroup = prog.type === 'group' || (prog.category || '').trim().toLowerCase() === 'general';
    return isGroup ? this.calculateGroupPoints(rank, grade) : this.calculatePoints(rank, grade);
  }

  calculateLeaderboard() {
    // Reset Team scores, grades counts and wins
    this.db.teams.forEach(team => {
      team.totalScore = 0;
      team.grades = { A: 0, B: 0, C: 0 };
      team.wins = [];
    });

    // Walk through all published programmes
    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished) return;

      prog.results.forEach(res => {
        let team = null;
        let studentName = "";

        if ((prog.type || '').trim().toLowerCase() === 'group') {
          // Team event: score goes to the selected team directly
          team = this.db.teams.find(t => t.id === (res.teamId || prog.teamId));
          studentName = team ? team.name : "Team";
        } else {
          // Individual event:
          if (res.studentId) {
            const student = this.db.students.find(s => s.id === res.studentId);
            if (student) {
              team = this.db.teams.find(t => t.id === student.teamId);
              studentName = student.name;
            }
          }
          if (!team && res.teamId) {
            team = this.db.teams.find(t => t.id === res.teamId);
            studentName = team ? team.name : "Team";
          }
        }
        if (!team) return;

        const pts = this.programmePoints(prog, res.rank, res.grade);
        team.totalScore += pts;

        if (res.grade === 'A') team.grades.A++;
        if (res.grade === 'B') team.grades.B++;
        if (res.grade === 'C') team.grades.C++;

        if (res.rank === 1 || res.rank === 2 || res.rank === 3) {
          team.wins.push({
            programmeId: prog.id,
            programmeName: prog.name,
            category: prog.category,
            studentName: studentName,
            rank: res.rank,
            grade: res.grade,
            points: pts
          });
        }
      });
    });

    // Subtract penalties
    if (this.db.penalties && Array.isArray(this.db.penalties)) {
      this.db.penalties.forEach(pen => {
        const team = this.db.teams.find(t => String(t.id) === String(pen.teamId));
        if (team) {
          team.totalScore -= (parseInt(pen.points, 10) || 0);
        }
      });
    }

    // Calculate Ranks (highest score gets rank 1; ties share the same rank, next rank skips)
    const sortedTeams = [...this.db.teams].sort((a, b) => b.totalScore - a.totalScore);
    let lastScore = null;
    let lastRank = 0;
    sortedTeams.forEach((t, idx) => {
      const team = this.db.teams.find(orig => orig.id === t.id);
      if (lastScore !== null && team.totalScore === lastScore) {
        team.rank = lastRank;
      } else {
        team.rank = idx + 1;
        lastRank = team.rank;
        lastScore = team.totalScore;
      }
    });
  }

  // Team points for one or more categories (e.g. ["Sub Junior","Junior"]), ranked
  // Returns ALL teams (including 0-point) so the standings are always complete
  getCategoryTeamPoints(categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    const teamPoints = {};
    this.db.teams.forEach(t => { teamPoints[t.id] = { team: t, points: 0 }; });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || !cats.includes(prog.category)) return;

      prog.results.forEach(res => {
        let team = null;
        if ((prog.type || '').trim().toLowerCase() === 'group' || (prog.category || '').trim().toLowerCase() === 'general') {
          team = this.db.teams.find(t => t.id === (res.teamId || prog.teamId));
        } else {
          const student = this.db.students.find(s => s.id === res.studentId);
          if (!student) return;
          team = this.db.teams.find(t => t.id === student.teamId);
        }
        if (!team || !teamPoints[team.id]) return;
        teamPoints[team.id].points += this.programmePoints(prog, res.rank, res.grade);
      });
    });

    // Subtract category-specific penalties
    if (this.db.penalties) {
      this.db.penalties.forEach(pen => {
        const prog = this.db.programmes.find(p => p.id === pen.programmeId);
        if (prog && cats.includes(prog.category)) {
          if (teamPoints[pen.teamId]) {
            teamPoints[pen.teamId].points -= (parseInt(pen.points) || 0);
          }
        }
      });
    }

    const list = Object.values(teamPoints);
    list.sort((a, b) => b.points - a.points);
    let lastPts = null;
    let lastRank = 0;
    list.forEach((item, idx) => {
      if (lastPts !== null && item.points === lastPts) {
        item.rank = lastRank;
      } else {
        item.rank = idx + 1;
        lastRank = item.rank;
        lastPts = item.points;
      }
    });
    return list;
  }

  // CRUD Penalties / Minus Marks
  addPenalty(programmeId, teamId, points, reason) {
    const id = "pen-" + Date.now();
    this.db.penalties = Array.isArray(this.db.penalties) ? this.db.penalties : [];
    this.db.penalties.push({
      id,
      programmeId: programmeId || "",
      teamId: String(teamId),
      points: Math.abs(parseInt(points, 10)) || 0,
      reason: reason || "Disciplinary deduction",
      date: new Date().toISOString()
    });
    this.calculateLeaderboard();
    this.save(false, 'penalties');
    this.save(false, 'teams');

    // Broadcast Penalty Alert to Telegram Channel
    const team = (this.db.teams || []).find(t => String(t.id) === String(teamId));
    const prog = programmeId ? (this.db.programmes || []).find(pr => String(pr.id) === String(programmeId)) : null;
    const teamName = team ? team.name : "Team";
    const pts = Math.abs(parseInt(points, 10)) || 0;
    let penMsg = `⛔ <b>THANAFUS 2026 - TEAM PENALTY NOTICE</b>\n\n`;
    penMsg += `🚩 <b>Team:</b> ${teamName}\n`;
    penMsg += `🔻 <b>Deduction:</b> -${pts} PTS\n`;
    if (prog) penMsg += `📌 <b>Programme:</b> ${prog.name} (${prog.category})\n`;
    penMsg += `📝 <b>Reason:</b> ${reason || 'Disciplinary deduction'}\n\n`;
    penMsg += `🔗 <a href="https://thanafus-dars-fest.vercel.app">View Updated Team Standings</a>`;
    this.sendTelegramNotification(penMsg);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('thanafus:db-updated', { detail: { source: 'addPenalty' } }));
    }
    return id;
  }

  deletePenalty(id) {
    if (Array.isArray(this.db.penalties)) {
      const targetId = String(id).trim();
      const target = this.db.penalties.find(p => p && (String(p.id).trim() === targetId || String(p._id).trim() === targetId));
      this.db.penalties = this.db.penalties.filter(p => p && String(p.id).trim() !== targetId && String(p._id).trim() !== targetId);
      this.calculateLeaderboard();
      this.save(false, 'penalties');
      this.save(false, 'teams');

      if (target) {
        // Penalty is removed, no telegram notification is needed as per user request.
      }

      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('thanafus:db-updated', { detail: { source: 'deletePenalty' } }));
      }
    }
  }

  // Calculate Kalaprathibha (Arts Champion)
  // Highest point-scoring student in individual events for each category
  getKalaprathibha(category) {
    const studentPoints = {};

    this.db.students.forEach(s => {
      if (s.category === category) {
        studentPoints[s.id] = { student: s, points: 0, rank1Count: 0, gradeACount: 0 };
      }
    });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || prog.category !== category) return;

      prog.results.forEach(res => {
        if (studentPoints[res.studentId]) {
          const pts = this.programmePoints(prog, res.rank, res.grade);
          studentPoints[res.studentId].points += pts;
          if (res.rank === 1) studentPoints[res.studentId].rank1Count++;
          if (res.grade === 'A') studentPoints[res.studentId].gradeACount++;
        }
      });
    });

    const list = Object.values(studentPoints).filter(item => item.points > 0);
    
    // Sort by points desc, then rank1Count desc, then gradeACount desc
    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.rank1Count !== a.rank1Count) return b.rank1Count - a.rank1Count;
      return b.gradeACount - a.gradeACount;
    });

    if (list.length > 0) {
      const top = list[0];
      const team = this.db.teams.find(t => t.id === top.student.teamId);
      return {
        student: top.student,
        points: top.points,
        teamName: team ? team.name : "Unknown Team"
      };
    }

    // Default mock placeholder if no results published
    const firstCatStudent = this.db.students.find(s => s.category === category);
    const team = firstCatStudent ? this.db.teams.find(t => t.id === firstCatStudent.teamId) : null;
    return {
      student: firstCatStudent || { name: "No Active Student", photo: "" },
      points: 0,
      teamName: team ? team.name : "N/A"
    };
  }

  // Top 3 Kalaprathibha contenders for a category (1st, 2nd, 3rd)
  getKalaprathibhaTop3(category) {
    const studentPoints = {};

    this.db.students.forEach(s => {
      if (s.category === category) {
        studentPoints[s.id] = { student: s, points: 0, rank1Count: 0, gradeACount: 0 };
      }
    });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || prog.category !== category) return;

      prog.results.forEach(res => {
        if (studentPoints[res.studentId]) {
          const pts = this.programmePoints(prog, res.rank, res.grade);
          studentPoints[res.studentId].points += pts;
          if (res.rank === 1) studentPoints[res.studentId].rank1Count++;
          if (res.grade === 'A') studentPoints[res.studentId].gradeACount++;
        }
      });
    });

    const list = Object.values(studentPoints).filter(item => item.points > 0);

    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.rank1Count !== a.rank1Count) return b.rank1Count - a.rank1Count;
      return b.gradeACount - a.gradeACount;
    });

    return list.slice(0, 3).map(item => {
      const team = this.db.teams.find(t => t.id === item.student.teamId);
      return {
        student: item.student,
        points: item.points,
        teamName: team ? team.name : "Unknown Team"
      };
    });
  }

  // Overall Fest Arts Champion (Highest individual points in whole fest)
  getOverallIndividualChampion() {
    const studentPoints = {};

    (this.db.students || []).forEach(s => {
      studentPoints[s.id] = { student: s, points: 0, rank1Count: 0, gradeACount: 0 };
    });

    (this.db.programmes || []).forEach(prog => {
      if (!prog.resultsPublished) return;
      const isGroup = (prog.type || '').toLowerCase() === 'group';
      if (isGroup) return;

      (prog.results || []).forEach(res => {
        if (res.studentId && studentPoints[res.studentId]) {
          const pts = this.programmePoints(prog, res.rank, res.grade);
          studentPoints[res.studentId].points += pts;
          if (res.rank === 1) studentPoints[res.studentId].rank1Count++;
          if (res.grade === 'A') studentPoints[res.studentId].gradeACount++;
        }
      });
    });

    const list = Object.values(studentPoints).filter(item => item.points > 0);
    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.rank1Count !== a.rank1Count) return b.rank1Count - a.rank1Count;
      return b.gradeACount - a.gradeACount;
    });

    if (list.length > 0) {
      const top = list[0];
      const team = this.db.teams.find(t => t.id === top.student.teamId);
      return {
        student: top.student,
        points: top.points,
        rank1Count: top.rank1Count,
        gradeACount: top.gradeACount,
        teamName: team ? team.name : "Unknown Team",
        category: top.student.category || "General"
      };
    }

    const firstStudent = (this.db.students || [])[0];
    const team = firstStudent ? this.db.teams.find(t => t.id === firstStudent.teamId) : null;
    return {
      student: firstStudent || { name: "Contenders Awaiting Results", photo: "" },
      points: 0,
      rank1Count: 0,
      gradeACount: 0,
      teamName: team ? team.name : "—",
      category: firstStudent ? (firstStudent.category || "General") : "—"
    };
  }

  // Get student profile and program participations
  getStudentProfile(studentId) {
    const student = this.db.students.find(s => s.id === studentId);
    if (!student) return null;

    const team = this.db.teams.find(t => t.id === student.teamId);
    const participations = [];
    let totalScore = 0;
    let rankCount = { 1: 0, 2: 0, 3: 0 };
    let gradeCount = { A: 0, B: 0, C: 0 };

    this.db.programmes.forEach(prog => {
      if (prog.category !== student.category) return;

      const result = prog.results.find(r => r.studentId === studentId);
      if (result) {
        const pts = this.programmePoints(prog, result.rank, result.grade);
        totalScore += pts;
        if (result.rank) rankCount[result.rank]++;
        if (result.grade) gradeCount[result.grade]++;

        participations.push({
          programmeId: prog.id,
          programmeName: prog.name,
          venue: prog.venue,
          rank: result.rank,
          grade: result.grade,
          points: pts,
          published: prog.resultsPublished
        });
      }
    });

    // Sort student's own participations: Rank 1 -> Rank 2 -> Rank 3 -> Grade A -> Grade B -> Grade C
    participations.sort((a, b) => {
      const aRank = a.rank ? Number(a.rank) : 999;
      const bRank = b.rank ? Number(b.rank) : 999;
      if (aRank !== bRank) return aRank - bRank;
      const gw = g => g === 'A' ? 3 : g === 'B' ? 2 : g === 'C' ? 1 : 0;
      const gDiff = gw(b.grade) - gw(a.grade);
      if (gDiff !== 0) return gDiff;
      return (b.points || 0) - (a.points || 0);
    });

    // Calculate Overall Rank among students in the same category (Rank first, then Grade)
    const catStudents = this.db.students.filter(s => s.category === student.category);
    const scores = catStudents.map(s => {
      let score = 0;
      let r1 = 0, r2 = 0, r3 = 0, gA = 0, gB = 0;
      this.db.programmes.forEach(prog => {
        if (prog.category === s.category && prog.resultsPublished) {
          const res = prog.results.find(r => r.studentId === s.id);
          if (res) {
            score += this.programmePoints(prog, res.rank, res.grade);
            if (res.rank === 1) r1++;
            if (res.rank === 2) r2++;
            if (res.rank === 3) r3++;
            if (res.grade === 'A') gA++;
            if (res.grade === 'B') gB++;
          }
        }
      });
      return { id: s.id, score, r1, r2, r3, gA, gB };
    }).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.r1 !== a.r1) return b.r1 - a.r1;
      if (b.r2 !== a.r2) return b.r2 - a.r2;
      if (b.r3 !== a.r3) return b.r3 - a.r3;
      if (b.gA !== a.gA) return b.gA - a.gA;
      return b.gB - a.gB;
    });

    const pos = scores.findIndex(s => s.id === studentId) + 1;

    return {
      ...student,
      teamName: team ? team.name : "Unknown",
      participations,
      totalScore,
      rankCount,
      gradeCount,
      position: pos
    };
  }

  // Search students by name
  searchStudents(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return this.db.students.filter(s => s.name.toLowerCase().includes(q)).map(s => {
      const team = this.db.teams.find(t => t.id === s.teamId);
      return {
        ...s,
        teamName: team ? team.name : "Unknown"
      };
    });
  }

  // CRUD Teams
  // Ensure every roster member (and captain) also exists as a student (unassigned category)
  syncRosterToStudents(teamId, names) {
    const existing = this.db.students.filter(s => s.teamId === teamId);
    names.forEach(raw => {
      const name = (raw || "").trim();
      if (!name) return;
      const found = existing.find(s => (s.name || "").trim().toLowerCase() === name.toLowerCase());
      if (!found) {
        const id = "stud-" + (Date.now()) + "-" + Math.floor(Math.random() * 1000);
        this.db.students.push({ id, name, teamId, category: "", photo: "" });
      }
    });
  }

  addTeam(name, captain, viceCaptain, members = []) {
    const id = "team-" + (Date.now());
    this.db.teams.push({ id, name, captain, viceCaptain: viceCaptain || "", members, totalScore: 0, rank: this.db.teams.length + 1, grades: { A: 0, B: 0, C: 0 }, wins: [] });
    this.syncRosterToStudents(id, [captain, viceCaptain, ...members]);
    this.save(false, 'teams');
    this.save(false, 'students');
    this.calculateLeaderboard();
    return id;
  }

  editTeam(id, name, captain, viceCaptain, members = []) {
    const team = this.db.teams.find(t => t.id === id);
    if (team) {
      team.name = name;
      team.captain = captain;
      team.viceCaptain = viceCaptain || "";
      team.members = members;
      this.syncRosterToStudents(team.id, [captain, viceCaptain, ...members]);
      this.save(false, 'teams');
      this.save(false, 'students');
      this.calculateLeaderboard();
    }
  }

  deleteTeam(id) {
    this.db.teams = this.db.teams.filter(t => t.id !== id);
    // Also update any students who were in this team
    this.db.students.forEach(s => {
      if (s.teamId === id) s.teamId = "";
    });
    this.save(false, 'teams');
    this.save(false, 'students');
    this.calculateLeaderboard();
  }

  // CRUD Students
  addStudent(name, teamId, category, photo = "", chestNo = "") {
    const id = "stud-" + (Date.now());
    this.db.students.push({ id, name, teamId, category, photo, chestNo: chestNo ? String(chestNo).trim() : "" });
    this.save(false, 'students');
    this.calculateLeaderboard();
    return id;
  }

  editStudent(id, name, teamId, category, photo = "", chestNo = undefined) {
    const student = this.db.students.find(s => s.id === id);
    if (student) {
      student.name = name;
      student.teamId = teamId;
      student.category = category;
      if (photo) student.photo = photo;
      if (chestNo !== undefined) student.chestNo = chestNo ? String(chestNo).trim() : "";
      this.save(false, 'students');
      this.calculateLeaderboard();
    }
  }

  deleteStudent(id) {
    this.db.students = this.db.students.filter(s => s.id !== id);
    // Also remove from any programme results
    this.db.programmes.forEach(prog => {
      prog.results = prog.results.filter(res => res.studentId !== id);
    });
    this.save(false, 'students');
    this.save(false, 'programmes');
    this.calculateLeaderboard();
  }

  // CRUD Programmes
  addProgramme(name, category, type, teamId) {
    const id = "prog-" + (Date.now());
    this.db.programmes.push({ id, name, category, type: type || "individual", teamId: teamId || "", resultsPublished: false, results: [] });
    this.save(false, 'programmes');
    return id;
  }

  editProgramme(id, name, category, type, teamId) {
    const prog = this.db.programmes.find(p => p && String(p.id) === String(id));
    if (prog) {
      if (name) prog.name = name;
      if (category) prog.category = category;
      if (type) prog.type = type;
      prog.teamId = teamId || "";
      this.save(false, 'programmes');
      this.calculateLeaderboard();
    }
  }

  deleteProgramme(id) {
    this.db.programmes = this.db.programmes.filter(p => p && String(p.id) !== String(id));
    this.save(false, 'programmes');
    this.calculateLeaderboard();
  }

  // Publish Results
  publishResults(programmeId, resultsArray) {
      const prog = this.db.programmes.find(p => p && String(p.id) === String(programmeId));
    if (prog) {
      const isGroupEvent = (prog.type || '').trim().toLowerCase() === 'group';
      prog.results = (resultsArray || []).filter(r => r && (r.studentId || r.teamId)).map(r => ({
        rank: (r.rank !== undefined && r.rank !== null && r.rank !== '' && parseInt(r.rank) > 0) ? parseInt(r.rank) : null,
        studentId: isGroupEvent ? null : (r.studentId || null),
        teamId: isGroupEvent ? (r.teamId || r.studentId || null) : (r.teamId || (this.db.students.find(s => s.id === r.studentId)?.teamId) || null),
        grade: r.grade ? r.grade.toUpperCase().trim() : null
      }));
      prog.resultsPublished = true;
      prog.resultsPublishedAt = new Date().toISOString();
      this.calculateLeaderboard();
        this.save(false, 'programmes');
        this.save(false, 'teams');
        this.save(false, 'students');

      // Trigger automatic announcement notification
      this.addNotification(`${prog.name} (${prog.category}) Results Published`, `The results for the program "${prog.name}" under category "${prog.category}" have been officially published. Check the results portal for details.`, "success");

      // Dispatch Telegram Broadcast if configured
      this.dispatchTelegramResult(prog);
    }
  }

  dispatchTelegramResult(prog) {
    if (!prog || !prog.resultsPublished) return;
    const isGroup = (prog.type || '').toLowerCase() === 'group';
    let msg = `🏆 <b>THANAFUS 2026 - RESULT PUBLISHED</b>\n\n`;
    msg += `📌 <b>Programme:</b> ${prog.name}\n`;
    msg += `📂 <b>Category:</b> ${prog.category} | <b>Type:</b> ${(prog.type || 'Individual').toUpperCase()}\n\n`;

    const topRanks = (prog.results || []).filter(r => r.rank && r.rank <= 3).sort((a, b) => a.rank - b.rank);
    if (topRanks.length > 0) {
      msg += `<b>🏅 WINNERS:</b>\n`;
      topRanks.forEach(r => {
        const medal = r.rank === 1 ? '🥇 1st Place' : r.rank === 2 ? '🥈 2nd Place' : '🥉 3rd Place';
        let name = "—";
        let team = "";
        if (isGroup) {
          const t = this.db.teams.find(tm => tm.id === r.teamId);
          name = t ? t.name : "Team";
        } else {
          const st = this.db.students.find(s => s.id === r.studentId);
          if (st) {
            name = `${st.name} ${st.chestNo ? `(#${st.chestNo})` : ''}`;
            const t = this.db.teams.find(tm => tm.id === st.teamId);
            if (t) team = ` (${t.name})`;
          }
        }
        const gr = r.grade ? ` [Grade ${r.grade}]` : '';
        msg += `${medal}: <b>${name}</b>${team}${gr}\n`;
      });
    }

    const gradeOnly = (prog.results || []).filter(r => !r.rank && r.grade);
    if (gradeOnly.length > 0) {
      msg += `\n<b>🎖️ GRADE HOLDERS:</b>\n`;
      gradeOnly.forEach(r => {
        let name = "—";
        if (isGroup) {
          const t = this.db.teams.find(tm => tm.id === r.teamId);
          name = t ? t.name : "Team";
        } else {
          const st = this.db.students.find(s => s.id === r.studentId);
          if (st) name = `${st.name} ${st.chestNo ? `(#${st.chestNo})` : ''}`;
        }
        msg += `• <b>${name}</b> - Grade ${r.grade}\n`;
      });
    }

    msg += `\n🔗 <a href="https://thanafus-dars-fest.vercel.app/results">View Full Scoreboard & Standings</a>`;
    this.sendTelegramNotification(msg);
  }

  async sendTelegramNotification(htmlMessage) {
    try {
      const token = (this.db.settings?.telegramBotToken || "").trim() || "8364515958:AAEIHGbuYNmpZ-oc_Q7zx-BJhkLuy1vN4ms";
      const chatId = (this.db.settings?.telegramChatId || "").trim();
      if (!token || !chatId) return false;

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: htmlMessage,
          parse_mode: 'HTML'
        })
      });
      const data = await res.json();
      return data.ok;
    } catch (e) {
      console.warn('Telegram notification notice:', e.message);
      return false;
    }
  }

  unpublishResults(programmeId) {
    const prog = this.db.programmes.find(p => p && String(p.id) === String(programmeId));
    if (prog) {
      prog.results = [];
      prog.resultsPublished = false;
      delete prog.resultsPublishedAt;
      this._allowUnpublishAll = true;
      this.calculateLeaderboard();
        this.save(false, 'programmes');
        this.save(false, 'teams');
        this.save(false, 'students');
    }
  }

  unpublishAllResults() {
    this.db.programmes.forEach(prog => {
      prog.results = [];
      prog.resultsPublished = false;
      delete prog.resultsPublishedAt;
    });
    this._allowUnpublishAll = true;
    this.calculateLeaderboard();
        this.save(false, 'programmes');
        this.save(false, 'teams');
        this.save(false, 'students');
  }

  // Notifications
  addNotification(title, content, type = "info") {
    const id = "notif-" + (Date.now());
    this.db.notifications.unshift({ id, title, content, type, date: new Date().toISOString() });
    // Limit to latest 30 notifications
    if (this.db.notifications.length > 30) this.db.notifications.pop();
    this.save(false, 'notifications');

    // Broadcast Announcement to Telegram Channel
    if (!title.toLowerCase().includes('results published')) {
      const icon = type === 'danger' ? '⚠️' : type === 'warning' ? '⚡' : type === 'success' ? '🎉' : '📢';
      const msg = `${icon} <b>THANAFUS 2026 - ANNOUNCEMENT</b>\n\n📌 <b>${title}</b>\n${content}\n\n🔗 <a href="https://thanafus-dars-fest.vercel.app">Visit Official Fest Portal</a>`;
      this.sendTelegramNotification(msg);
    }

    return id;
  }

  deleteNotification(id) {
    this.db.notifications = this.db.notifications.filter(n => n.id !== id);
    this.save(false, 'notifications');
  }

  // Appeals
  addAppeal(studentName, team, category, programme, phoneNumber, description) {
    const id = "appl-" + (Date.now());
    this.db.appeals.unshift({
      id,
      studentName,
      team,
      category,
      programme,
      phoneNumber,
      description,
      fee: 50,
      status: "Pending",
      response: "",
      date: new Date().toISOString()
    });
    this.save(false, 'appeals');
    return id;
  }

  respondToAppeal(id, status, responseText) {
    const appeal = this.db.appeals.find(a => a.id === id);
    if (appeal) {
      appeal.status = status;
      appeal.response = responseText;
      this.save(false, 'appeals');

      // Notify public channel
      const type = status === 'Approved' ? 'success' : 'danger';
      this.addNotification(`Appeal Update: ${appeal.programme}`, `Appeal submitted by ${appeal.studentName} (${appeal.team}) for "${appeal.programme}" has been ${status.toLowerCase()}. Response: ${responseText}`, type);
    }
  }

  // Media & Social Embeds (YouTube, Instagram, Video, Image)
  parseMedia(url, explicitType = "") {
    if (!url) return { type: 'image', url: '', embedUrl: '', thumbnailUrl: '', rawUrl: '' };

    const cleanUrl = url.trim();

    // YouTube detection (Standard, Shorts, youtu.be, embed)
    const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1];
      return {
        type: 'youtube',
        videoId: videoId,
        url: cleanUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&enablejsapi=1&playsinline=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        rawUrl: cleanUrl
      };
    }

    // Instagram detection (Reel, Post, TV)
    const igMatch = cleanUrl.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([^"&?\/\s]+)/i);
    if (igMatch && igMatch[1]) {
      const code = igMatch[1];
      return {
        type: 'instagram',
        code: code,
        url: cleanUrl,
        embedUrl: `https://www.instagram.com/reel/${code}/embed/captioned/`,
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop',
        rawUrl: cleanUrl
      };
    }

    // Direct Video (MP4 / WebM / OGG / MOV)
    if (explicitType === 'video' || cleanUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || cleanUrl.includes('/mov_bbb.mp4')) {
      return {
        type: 'video',
        url: cleanUrl,
        embedUrl: cleanUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
        rawUrl: cleanUrl
      };
    }

    // Image / Photo
    return {
      type: explicitType || 'image',
      url: cleanUrl,
      embedUrl: cleanUrl,
      thumbnailUrl: cleanUrl,
      rawUrl: cleanUrl
    };
  }

  addMedia(type, title, url, day, category, event) {
    const id = "gal-" + (Date.now());
    const parsed = this.parseMedia(url, type);
    const resolvedType = (type === 'image' && url.startsWith('data:image')) ? 'image' : (parsed.type || type);

    this.db.gallery.unshift({ 
      id, 
      type: resolvedType, 
      title, 
      url, 
      day, 
      category, 
      event 
    });
    this.save(false, 'gallery');
    return id;
  }

  deleteMedia(id) {
    this.db.gallery = this.db.gallery.filter(g => g.id !== id);
    this.save(false, 'gallery');
  }

  // Prospectus & Contacts
  updateProspectus(base64Data) {
    this.db.settings.prospectusUrl = base64Data;
    this.save(false, 'settings');
  }

  updateContact(details) {
    this.db.contact = { ...this.db.contact, ...details };
    this.save(false, 'contact');
  }

  // Contact Messages from public users
  addContactMessage(name, email, message, phone = "") {
    if (!Array.isArray(this.db.messages)) this.db.messages = [];
    const id = "msg-" + Date.now();
    this.db.messages.unshift({
      id,
      name,
      email,
      phone,
      message,
      read: false,
      date: new Date().toISOString()
    });
    this.save(false, 'messages');
    return id;
  }

  markMessageAsRead(id, readStatus = true) {
    if (!Array.isArray(this.db.messages)) return;
    const msg = this.db.messages.find(m => m.id === id);
    if (msg) {
      msg.read = readStatus;
      this.save(false, 'messages');
    }
  }

  deleteMessage(id) {
    if (!Array.isArray(this.db.messages)) return;
    this.db.messages = this.db.messages.filter(m => m.id !== id);
    this.save(false, 'messages');
  }

  updateSettings(settings) {
    this.db.settings = { ...this.db.settings, ...settings };
    this.save(false, 'settings');
  }
}

// Instantiate database globally
const ThanafusDB = new Database();
window.ThanafusDB = ThanafusDB;
