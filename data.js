// Nha Trang University (NTU) Campus Data

const CAMPUS_CENTER = [12.2681437, 109.2023759];
const MAP_BOUNDS = [
    [12.2650, 109.1980], // Southwest
    [12.2720, 109.2060]  // Northeast
];

const CATEGORIES = {
    building: { vi: "Giảng đường & Tòa nhà", en: "Buildings & Lecture Halls", color: "#1e3a8a", icon: "fa-building" },
    utility: { vi: "Tiện ích & Dịch vụ", en: "Utilities & Services", color: "#10b981", icon: "fa-concierge-bell" },
    gate: { vi: "Cổng ra vào", en: "Gates", color: "#ef4444", icon: "fa-door-open" },
    parking: { vi: "Bãi giữ xe", en: "Parking Areas", color: "#f59e0b", icon: "fa-square-p" },
    landscape: { vi: "Cảnh quan & Điểm check-in", en: "Landmarks & Landscapes", color: "#8b5cf6", icon: "fa-tree" }
};

const POIS = [
    {
        id: "gate_main",
        nameVi: "Cổng chính NTU (Nguyễn Đình Chiểu)",
        nameEn: "NTU Main Gate (Nguyen Dinh Chieu)",
        category: "gate",
        coords: [12.26801, 109.20121],
        icon: "fa-door-open",
        descriptionVi: "Cổng chính của Trường Đại học Nha Trang nằm trên đường Nguyễn Đình Chiểu, hướng đi lên đồi La San.",
        descriptionEn: "The main gate of Nha Trang University located on Nguyen Dinh Chieu Street, leading up to La San Hill.",
        departments: [],
        rooms: []
    },
    {
        id: "gate_side",
        nameVi: "Cổng phụ NTU (Đường lên KTX)",
        nameEn: "NTU Side Gate (Dormitory Road)",
        category: "gate",
        coords: [12.26992, 109.20150],
        icon: "fa-door-open",
        descriptionVi: "Cổng phụ phía Bắc, lối đi chính dẫn vào khu ký túc xá và nhà thi đấu đa năng.",
        descriptionEn: "Northern side gate, main road leading into the dormitory area and multi-purpose sports complex.",
        departments: [],
        rooms: []
    },
    {
        id: "admin_building",
        nameVi: "Nhà Hiệu Bộ - Tòa nhà A1 (Phòng Đào tạo)",
        nameEn: "A1 Administration Building (Academic Affairs)",
        category: "building",
        coords: [12.2674119, 109.2020981],
        icon: "fa-building-columns",
        descriptionVi: "Trung tâm hành chính của trường, nơi làm việc của Ban Giám hiệu và các phòng ban chức năng như Phòng Đào tạo.",
        descriptionEn: "Administrative hub of the university, housing the Board of Rectors and functional departments like Academic Affairs.",
        departments: [
            { vi: "Ban Giám hiệu", en: "Board of Rectors" },
            { vi: "Phòng Đào tạo", en: "Academic Affairs Department" },
            { vi: "Phòng Công tác Sinh viên", en: "Student Affairs Department" },
            { vi: "Phòng Hợp tác Quốc tế", en: "International Cooperation Department" },
            { vi: "Phòng Tài chính - Kế hoạch", en: "Finance & Planning Department" }
        ],
        rooms: ["Phòng họp số 1", "Phòng tiếp khách", "Hội trường lớn Nhà Hiệu Bộ"],
        polygon: [[12.2673259,109.2016571],[12.2674451,109.2016544],[12.2674534,109.2020333],[12.2674893,109.2020325],[12.2674913,109.2021226],[12.2674649,109.2021232],[12.2674727,109.2024807],[12.2673783,109.2024829],[12.2673434,109.2024835],[12.2673411,109.2023514],[12.2673259,109.2016571]]
    },
    {
        id: "library",
        nameVi: "Thư viện NTU",
        nameEn: "NTU Library",
        category: "building",
        coords: [12.26945, 109.20300],
        icon: "fa-book-open-reader",
        descriptionVi: "Thư viện hiện đại 3 tòa nhà với hàng ngàn đầu sách, phòng đọc yên tĩnh, phòng đa phương tiện và phòng máy tính.",
        descriptionEn: "Modern library with thousands of books, quiet reading rooms, multimedia centers, and computer labs.",
        departments: [
            { vi: "Ban quản lý Thư viện", en: "Library Administration" },
            { vi: "Trung tâm Học liệu Số", en: "Digital Learning Center" }
        ],
        rooms: ["Phòng Đọc 101", "Phòng Đọc 102", "Phòng Máy tính 201", "Phòng Hội thảo 301"],
        hasIndoorMap: true
    },
    {
        id: "g1",
        nameVi: "Giảng đường G1",
        nameEn: "Lecture Hall G1",
        category: "building",
        coords: [12.2688812, 109.203873],
        icon: "fa-graduation-cap",
        descriptionVi: "Giảng đường G1 chuyên phục vụ các lớp học lý thuyết và văn phòng Khoa Kinh tế.",
        descriptionEn: "Lecture Hall G1 mainly used for theoretical classes and houses the Faculty of Economics.",
        departments: [
            { vi: "Khoa Kinh tế", en: "Faculty of Economics" },
            { vi: "Văn phòng Bộ môn Du lịch", en: "Tourism Department Office" }
        ],
        rooms: ["G1.101", "G1.102", "G1.201", "G1.202", "G1.301", "G1.302"],
        polygon: [[12.2688743,109.2036786],[12.2689739,109.2037359],[12.2689171,109.2038392],[12.269012,109.2038938],[12.2688807,109.204133],[12.2687809,109.2040756],[12.2688562,109.2039386],[12.2687614,109.2038841],[12.2688743,109.2036786]]
    },
    {
        id: "g2",
        nameVi: "Giảng đường G2",
        nameEn: "Lecture Hall G2",
        category: "building",
        coords: [12.2681021, 109.2041887],
        icon: "fa-graduation-cap",
        descriptionVi: "Giảng đường G2, nơi học tập của sinh viên các ngành Kỹ thuật và Công nghệ.",
        descriptionEn: "Lecture Hall G2, study area for Engineering and Technology students.",
        departments: [
            { vi: "Khoa Cơ khí", en: "Faculty of Mechanical Engineering" }
        ],
        rooms: ["G2.101", "G2.102", "G2.201", "G2.202", "G2.301"],
        polygon: [[12.2679527,109.2043533],[12.2679904,109.2039893],[12.2682914,109.204022],[12.268278,109.204151],[12.2681515,109.2041373],[12.2681438,109.2041589],[12.2681283,109.2041757],[12.2681035,109.2041867],[12.2680748,109.2041836],[12.2680561,109.2043645],[12.2679527,109.2043533]]
    },
    {
        id: "g3",
        nameVi: "Giảng đường G3",
        nameEn: "Lecture Hall G3",
        category: "building",
        coords: [12.2671797, 109.2036625],
        icon: "fa-graduation-cap",
        descriptionVi: "Tòa nhà giảng đường cao tầng hiện đại với hệ thống thang máy và các phòng học lớn.",
        descriptionEn: "Modern high-rise lecture hall equipped with elevators and large amphitheatres.",
        departments: [
            { vi: "Khoa Điện - Điện tử", en: "Faculty of Electrical & Electronic Engineering" }
        ],
        rooms: ["G3.101", "G3.102", "G3.201", "G3.202", "G3.301", "G3.302", "G3.401"],
        polygon: [[12.2671393,109.2033901],[12.2672282,109.2033864],[12.2672541,109.2040447],[12.2671652,109.2040484],[12.2671521,109.2037154],[12.2671393,109.2033901]]
    },
    {
        id: "g5",
        nameVi: "Giảng đường G5 (Mặt biển)",
        nameEn: "Lecture Hall G5 (Sea View)",
        category: "building",
        coords: [12.26711314, 109.20107678],
        icon: "fa-graduation-cap",
        descriptionVi: "Giảng đường biểu tượng nằm sát mép đồi La San, trên nóc có chữ 'TRƯỜNG ĐẠI HỌC NHA TRANG' hướng ra vịnh Nha Trang và cầu Trần Phú.",
        descriptionEn: "Iconic building on the edge of La San Hill, featuring the illuminated school name facing the beautiful Nha Trang ocean bay.",
        departments: [
            { vi: "Viện Khoa học và Công nghệ Khai thác Thủy sản", en: "Institute of Marine Science & Fisheries Technology" }
        ],
        rooms: ["G5.101", "G5.102", "G5.201", "G5.202", "Hội trường G5"],
        polygon: [[12.2670679,109.2008888],[12.2671743,109.2008872],[12.267181,109.2013588],[12.2670746,109.2013603],[12.2670679,109.2008888]]
    },
    {
        id: "g6",
        nameVi: "Giảng đường G6 (Khoa CNTT)",
        nameEn: "Lecture Hall G6 (IT Faculty)",
        category: "building",
        coords: [12.2671447, 109.2004771],
        icon: "fa-laptop-code",
        descriptionVi: "Tòa nhà 3 tầng, nơi đặt văn phòng Khoa Công nghệ Thông tin và các phòng thực hành máy tính cấu hình cao.",
        descriptionEn: "Three-storey building housing the Faculty of Information Technology and high-spec computer labs.",
        departments: [
            { vi: "Khoa Công nghệ Thông tin", en: "Faculty of Information Technology" },
            { vi: "Trung tâm Tin học NTU", en: "NTU IT Center" }
        ],
        rooms: ["G6.101 (Lab 1)", "G6.102 (Lab 2)", "G6.201", "G6.202", "Văn phòng Khoa CNTT"],
        polygon: [[12.2672778,109.2002579],[12.267174,109.2002551],[12.2671725,109.2003115],[12.2671306,109.2003104],[12.2671276,109.2004269],[12.2670728,109.2004645],[12.2670386,109.2004635],[12.2670355,109.2005851],[12.2669896,109.2005838],[12.2669849,109.2007648],[12.2670943,109.2007678],[12.2670974,109.2006501],[12.2671461,109.2006514],[12.2671488,109.2005481],[12.2671881,109.2005492],[12.2671901,109.2004728],[12.267235,109.200474],[12.2672376,109.2003728],[12.2672747,109.2003738],[12.2672778,109.2002579]]
    },
    {
        id: "g7",
        nameVi: "Giảng đường G7",
        nameEn: "Lecture Hall G7",
        category: "building",
        coords: [12.2675191, 109.2000072],
        icon: "fa-graduation-cap",
        descriptionVi: "Tòa nhà lớn với 22 phòng học đa năng, là nơi đặt văn phòng Khoa Ngoại ngữ và giảng dạy Ngoại ngữ toàn trường.",
        descriptionEn: "Large building with 22 multi-functional classrooms, housing the Faculty of Foreign Languages.",
        departments: [
            { vi: "Khoa Ngoại ngữ", en: "Faculty of Foreign Languages" }
        ],
        rooms: ["G7.101", "G7.102", "G7.201", "G7.202", "G7.301", "G7.302", "G7.303"],
        hasIndoorMap: true,
        polygon: [[12.2674233,109.2001097],[12.2674866,109.2001066],[12.2675098,109.2000452],[12.2674915,109.2000477],[12.2674667,109.2000468],[12.2674535,109.200039],[12.2674428,109.2000244],[12.2674391,109.2000059],[12.2674466,109.1999824],[12.2674562,109.1999726],[12.2674699,109.1999659],[12.2674863,109.1999649],[12.267501,109.19997],[12.2675127,109.1999802],[12.2675202,109.1999948],[12.2675191,109.2000109],[12.2675585,109.2000104],[12.2675374,109.1996915],[12.2675978,109.1996842],[12.2676002,109.1997324],[12.2676878,109.1997253],[12.2677124,109.2001056],[12.2676309,109.2001098],[12.267632,109.2001517],[12.267548,109.2001559],[12.2675511,109.200225],[12.2674294,109.2002323],[12.2674233,109.2001097]]
    },
    {
        id: "g8",
        nameVi: "Giảng đường G8",
        nameEn: "Lecture Hall G8",
        category: "building",
        coords: [12.2684704, 109.20147946],
        icon: "fa-graduation-cap",
        descriptionVi: "Giảng đường G8 nằm gần lối vào cổng chính, chủ yếu giảng dạy các môn Khoa học Cơ bản và Lý luận Chính trị.",
        descriptionEn: "Lecture Hall G8 located near the main entrance, used for Basic Sciences and Political Theory courses.",
        departments: [
            { vi: "Khoa Khoa học Cơ bản", en: "Faculty of Basic Sciences" }
        ],
        rooms: ["G8.101", "G8.102", "G8.201", "G8.202"],
        polygon: [[12.2684475,109.2012788],[12.2685607,109.2012769],[12.2685678,109.2017234],[12.2684551,109.2017252],[12.2684524,109.2015545],[12.2684269,109.2015549],[12.2684254,109.2014615],[12.2684503,109.2014611],[12.2684475,109.2012788]]
    },
    {
        id: "canteen",
        nameVi: "Căng tin Sinh viên NTU",
        nameEn: "NTU Student Cafeteria",
        category: "utility",
        coords: [12.26910, 109.20350],
        icon: "fa-utensils",
        descriptionVi: "Tòa nhà ăn uống, giải khát 4 tầng phục vụ cơm trưa, cà phê, thức ăn nhanh và các nhu yếu phẩm cho sinh viên.",
        descriptionEn: "4-storey catering and beverage building offering lunch, coffee, fast food, and convenience items.",
        departments: [],
        rooms: ["Khu ẩm thực Tầng 1", "Cửa hàng tiện lợi Tầng 1", "Cà phê Sân thượng Tầng 4"]
    },
    {
        id: "parking_main",
        nameVi: "Bãi giữ xe Cổng chính",
        nameEn: "Main Gate Parking Area",
        category: "parking",
        coords: [12.26785, 109.20160],
        icon: "fa-square-parking",
        descriptionVi: "Bãi giữ xe máy có mái che nằm cạnh cổng chính, thuận tiện cho sinh viên học tại G1, G2, G8.",
        descriptionEn: "Covered motorbike parking next to the main gate, convenient for students in G1, G2, G8.",
        departments: [],
        rooms: []
    },
    {
        id: "parking_g5",
        nameVi: "Bãi giữ xe Khu G5 - G6",
        nameEn: "G5 - G6 Parking Area",
        category: "parking",
        coords: [12.26870, 109.20340],
        icon: "fa-square-parking",
        descriptionVi: "Bãi giữ xe phục vụ cụm giảng đường phía Đông gồm G5, G6, G7 và Thư viện.",
        descriptionEn: "Parking area servicing the eastern campus buildings including G5, G6, G7, and the Library.",
        departments: [],
        rooms: []
    },
    {
        id: "sports_complex",
        nameVi: "Nhà Thi đấu Đa năng",
        nameEn: "Multi-purpose Sports Complex",
        category: "utility",
        coords: [12.26990, 109.20320],
        icon: "fa-volleyball",
        descriptionVi: "Nhà thi đấu phục vụ các môn thể thao trong nhà như cầu lông, bóng rổ, bóng bàn, bóng chuyền và các ngày hội lớn.",
        descriptionEn: "Indoor sports complex for badminton, basketball, table tennis, volleyball, and major campus events.",
        departments: [
            { vi: "Bộ môn Giáo dục Thể chất", en: "Physical Education Department" }
        ],
        rooms: ["Phòng Gym", "Sân Bóng rổ", "Sân Cầu lông"]
    },
    {
        id: "dorm_k1",
        nameVi: "Ký túc xá K1",
        nameEn: "Dormitory K1",
        category: "building",
        coords: [12.26985, 109.20240],
        icon: "fa-hotel",
        descriptionVi: "Khu ký túc xá dành cho sinh viên nội trú, yên tĩnh, an ninh cao và đầy đủ tiện ích sinh hoạt.",
        descriptionEn: "On-campus residential dormitory for students, featuring high security and lifestyle utilities.",
        departments: [],
        rooms: ["Ban Quản lý KTX"]
    },
    {
        id: "dorm_k2",
        nameVi: "Ký túc xá K2",
        nameEn: "Dormitory K2",
        category: "building",
        coords: [12.26990, 109.20270],
        icon: "fa-hotel",
        descriptionVi: "Khu nhà ở sinh viên K2, nằm cạnh nhà thi đấu và căng tin, rất tiện lợi.",
        descriptionEn: "Student residence K2, located next to the sports complex and cafeteria, highly convenient.",
        departments: [],
        rooms: []
    },
    {
        id: "lotus_pond",
        nameVi: "Hồ Súng cảnh quan",
        nameEn: "Lotus & Water Lily Pond",
        category: "landscape",
        coords: [12.26845, 109.20195],
        icon: "fa-water",
        descriptionVi: "Hồ súng tuyệt đẹp nằm trước Nhà Hiệu Bộ, địa điểm thư giãn và check-in chụp hình tốt nghiệp nổi tiếng của sinh viên NTU.",
        descriptionEn: "Beautiful water lily pond in front of the Administration Building, a famous campus photo spot.",
        departments: [],
        rooms: []
    },
    {
        id: "medical_center",
        nameVi: "Trạm Y tế học đường",
        nameEn: "Campus Medical Station",
        category: "utility",
        coords: [12.26790, 109.20240],
        icon: "fa-suitcase-medical",
        descriptionVi: "Trạm y tế của trường, hỗ trợ sơ cấp cứu, chăm sóc sức khỏe ban đầu cho cán bộ, giảng viên và sinh viên.",
        descriptionEn: "University health clinic, providing first aid and primary medical care for staff and students.",
        departments: [],
        rooms: ["Phòng khám bệnh", "Phòng sơ cứu"]
    }
];

// Graph Nodes for Routing
const GRAPH_NODES = {
    // POI Nodes
    "gate_main": [12.26801, 109.20121],
    "gate_side": [12.26992, 109.20150],
    "admin_building": [12.2674119, 109.2020981],
    "library": [12.26945, 109.20300],
    "g1": [12.2688812, 109.203873],
    "g2": [12.2681021, 109.2041887],
    "g3": [12.2671797, 109.2036625],
    "g5": [12.26711314, 109.20107678],
    "g6": [12.2671447, 109.2004771],
    "g7": [12.2675191, 109.2000072],
    "g8": [12.2684704, 109.20147946],
    "canteen": [12.26910, 109.20350],
    "parking_main": [12.26785, 109.20160],
    "parking_g5": [12.26870, 109.20340],
    "sports_complex": [12.26990, 109.20320],
    "dorm_k1": [12.26985, 109.20240],
    "dorm_k2": [12.26990, 109.20270],
    "lotus_pond": [12.26845, 109.20195],
    "medical_center": [12.26790, 109.20240],

    // Intersections / Walkway Junctions
    "j_gate_pond": [12.26815, 109.20150],
    "j_parking_pond": [12.26790, 109.20170],
    "j_pond_g8": [12.26780, 109.20200],
    "j_g1_g2": [12.26850, 109.20400],
    "j_g2_g3": [12.26760, 109.20390],
    "j_g3_dorms": [12.26850, 109.20300],
    "j_dorms_sports": [12.26990, 109.20290],
    "j_sports_canteen": [12.26950, 109.20330],
    "j_canteen_library": [12.26930, 109.20320],
    "j_library_admin": [12.26900, 109.20270],
    "j_admin_g7": [12.26750, 109.20100],
    "j_g7_g6": [12.26730, 109.20025],
    "j_g6_g5": [12.26713, 109.20080],
    "j_g5_canteen": [12.26900, 109.20365],
    "j_admin_pond": [12.26760, 109.20210],
    "j_pond_g1": [12.26850, 109.20170]
};

// Graph Connections (Edges)
// Edges are defined as bidirectional links. We will calculate distance weights in JS.
const GRAPH_EDGES = [
    // Gate and Parking connections
    ["gate_main", "j_gate_pond"],
    ["parking_main", "j_parking_pond"],
    ["j_parking_pond", "j_gate_pond"],
    ["j_gate_pond", "j_pond_g1"],
    ["j_gate_pond", "j_pond_g8"],
    ["j_parking_pond", "medical_center"],
    ["medical_center", "j_pond_g8"],
    ["medical_center", "j_admin_pond"],

    // Pond and G8, Admin
    ["j_pond_g1", "g8"],
    ["j_gate_pond", "g8"],
    ["j_pond_g8", "lotus_pond"],
    ["j_pond_g1", "lotus_pond"],
    ["lotus_pond", "j_admin_pond"],
    ["j_admin_pond", "admin_building"],

    // G1, G2, G3 chain (East Walkway)
    ["g1", "j_g1_g2"],
    ["j_g1_g2", "g2"],
    ["g2", "j_g2_g3"],
    ["j_g2_g3", "g3"],
    ["g3", "j_g3_dorms"],

    // Side Gate and Dorms
    ["gate_side", "j_g3_dorms"],
    ["j_g3_dorms", "dorm_k1"],
    ["dorm_k1", "dorm_k2"],
    ["dorm_k2", "j_dorms_sports"],
    ["j_dorms_sports", "sports_complex"],
    ["sports_complex", "j_sports_canteen"],

    // Admin, Library and G7
    ["admin_building", "j_library_admin"],
    ["j_library_admin", "library"],
    ["admin_building", "j_admin_g7"],
    ["j_admin_g7", "g7"],
    ["j_admin_g7", "j_pond_g8"], // connects admin side to pond/g8 side

    // G7, G6, G5 chain (West Walkway)
    ["g7", "j_g7_g6"],
    ["j_g7_g6", "g6"],
    ["g6", "j_g6_g5"],
    ["j_g6_g5", "g5"],
    ["g5", "j_admin_g7"],

    // East side parking, G1 and canteen connections
    ["g1", "j_g5_canteen"],
    ["j_g5_canteen", "canteen"],
    ["j_g5_canteen", "parking_g5"],
    ["parking_g5", "j_canteen_library"],
    ["canteen", "j_sports_canteen"],
    ["canteen", "j_canteen_library"],
    ["j_canteen_library", "library"],
    ["j_canteen_library", "j_library_admin"],
    
    // Internal loops for shortcut pathways
    ["j_g2_g3", "admin_building"],
    ["j_g3_dorms", "dorm_k2"],
    ["dorm_k1", "j_library_admin"]
];

// Add polygon coordinates dynamically for buildings to show details on zoom
POIS.forEach(poi => {
    if ((poi.category === 'building' || poi.category === 'utility' || poi.category === 'landscape') && !poi.polygon) {
        const [lat, lng] = poi.coords;
        let dLat = 0.00015; // approx 17 meters
        let dLng = 0.00022; // approx 22 meters
        
        // Custom dimensions for specific structures to make footprints realistic
        if (poi.id === 'library') {
            dLat = 0.00022;
            dLng = 0.00030;
        } else if (poi.id === 'lotus_pond') {
            dLat = 0.00012;
            dLng = 0.00018;
        } else if (poi.id === 'sports_complex') {
            dLat = 0.00024;
            dLng = 0.00032;
        }
        
        poi.polygon = [
            [lat + dLat/2, lng - dLng/2],
            [lat + dLat/2, lng + dLng/2],
            [lat - dLat/2, lng + dLng/2],
            [lat - dLat/2, lng - dLng/2]
        ];
    }
});
