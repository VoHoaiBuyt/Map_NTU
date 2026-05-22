// Indoor Floor Plan Viewer for NTU Map

// Custom floor plans metadata
const INDOOR_DATA = {
    g7: {
        nameVi: "Giảng đường G7",
        nameEn: "Lecture Hall G7",
        floors: [
            { level: 0, nameVi: "Tầng trệt", nameEn: "Ground Floor" },
            { level: 1, nameVi: "Lầu 1", nameEn: "1st Floor" },
            { level: 2, nameVi: "Lầu 2", nameEn: "2nd Floor" }
        ],
        rooms: {
            0: [
                { id: "g7_101", x: 20, y: 20, w: 80, h: 60, nameVi: "G7.101 (Phòng học)", nameEn: "G7.101 (Classroom)", type: "classroom", cap: 80, detailsVi: "Phòng học lý thuyết được trang bị máy chiếu và điều hòa.", detailsEn: "Lecture room equipped with projector and air conditioning." },
                { id: "g7_102", x: 110, y: 20, w: 80, h: 60, nameVi: "G7.102 (Phòng học)", nameEn: "G7.102 (Classroom)", type: "classroom", cap: 80, detailsVi: "Phòng học lý thuyết lớn với hệ thống loa và bảng tương tác.", detailsEn: "Large classroom with sound system and interactive board." },
                { id: "g7_wc_m", x: 200, y: 20, w: 40, h: 30, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "g7_wc_f", x: 200, y: 50, w: 40, h: 30, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "g7_elevator", x: 250, y: 20, w: 30, h: 60, nameVi: "Thang máy", nameEn: "Elevator", type: "stairs" },
                { id: "g7_lobby", x: 290, y: 20, w: 100, h: 120, nameVi: "Sảnh chính G7", nameEn: "G7 Main Lobby", type: "hallway" },
                { id: "g7_stairs", x: 400, y: 20, w: 50, h: 60, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "g7_admin", x: 460, y: 20, w: 120, h: 60, nameVi: "Phòng Quản lý Giảng đường", nameEn: "Lecture Hall Mgmt Office", type: "office", cap: 10, detailsVi: "Nơi liên hệ mượn micro, trang thiết bị dạy học.", detailsEn: "Office for micro rental and teaching equipment assistance." },
                { id: "g7_corridor", x: 20, y: 90, w: 260, h: 20, nameVi: "Hành lang Tây", nameEn: "West Corridor", type: "hallway" },
                { id: "g7_corridor_e", x: 400, y: 90, w: 180, h: 20, nameVi: "Hành lang Đông", nameEn: "East Corridor", type: "hallway" }
            ],
            1: [
                { id: "g7_201", x: 20, y: 20, w: 90, h: 60, nameVi: "G7.201 (Phòng học)", nameEn: "G7.201 (Classroom)", type: "classroom", cap: 70, detailsVi: "Phòng học tiêu chuẩn của Khoa Ngoại ngữ.", detailsEn: "Standard classroom for the Faculty of Foreign Languages." },
                { id: "g7_202", x: 120, y: 20, w: 90, h: 60, nameVi: "G7.202 (Phòng học)", nameEn: "G7.202 (Classroom)", type: "classroom", cap: 70, detailsVi: "Phòng học chuyên dụng được lắp đặt thiết bị nghe nhìn.", detailsEn: "Dedicated classroom with audio-visual equipment installed." },
                { id: "g7_wc_m1", x: 220, y: 20, w: 30, h: 30, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "g7_wc_f1", x: 220, y: 50, w: 30, h: 30, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "g7_elevator1", x: 260, y: 20, w: 30, h: 60, nameVi: "Thang máy", nameEn: "Elevator", type: "stairs" },
                { id: "g7_hall1", x: 300, y: 20, w: 80, h: 120, nameVi: "Sảnh Lầu 1", nameEn: "1st Floor Hall", type: "hallway" },
                { id: "g7_stairs1", x: 390, y: 20, w: 55, h: 60, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "g7_foreign_office", x: 455, y: 20, w: 125, h: 60, nameVi: "Văn phòng Khoa Ngoại ngữ", nameEn: "Faculty of Foreign Languages Office", type: "office", cap: 15, detailsVi: "Nơi tiếp nhận hồ sơ, giải quyết thủ tục học vụ ngành Ngoại ngữ.", detailsEn: "Office handling academic procedures for foreign languages." },
                { id: "g7_corridor1_w", x: 20, y: 90, w: 270, h: 20, nameVi: "Hành lang Tây", nameEn: "West Corridor", type: "hallway" },
                { id: "g7_corridor1_e", x: 390, y: 90, w: 190, h: 20, nameVi: "Hành lang Đông", nameEn: "East Corridor", type: "hallway" }
            ],
            2: [
                { id: "g7_301", x: 20, y: 20, w: 85, h: 60, nameVi: "G7.301 (Lab Ngoại ngữ)", nameEn: "G7.301 (Language Lab)", type: "classroom", cap: 50, detailsVi: "Phòng thực hành ngoại ngữ trang bị tai nghe chuyên dụng và máy tính.", detailsEn: "Language lab equipped with dedicated headphones and computers." },
                { id: "g7_302", x: 115, y: 20, w: 85, h: 60, nameVi: "G7.302 (Phòng học)", nameEn: "G7.302 (Classroom)", type: "classroom", cap: 60, detailsVi: "Phòng học lý thuyết tiêu chuẩn.", detailsEn: "Standard theoretical classroom." },
                { id: "g7_303", x: 210, y: 20, w: 85, h: 60, nameVi: "G7.303 (Phòng học)", nameEn: "G7.303 (Classroom)", type: "classroom", cap: 60, detailsVi: "Phòng học có hệ thống âm thanh giảng dạy chất lượng.", detailsEn: "Classroom with high-quality teaching sound system." },
                { id: "g7_wc_m2", x: 305, y: 20, w: 30, h: 30, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "g7_wc_f2", x: 305, y: 50, w: 30, h: 30, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "g7_elevator2", x: 345, y: 20, w: 35, h: 60, nameVi: "Thang máy", nameEn: "Elevator", type: "stairs" },
                { id: "g7_hall2", x: 390, y: 20, w: 70, h: 120, nameVi: "Sảnh Lầu 2", nameEn: "2nd Floor Hall", type: "hallway" },
                { id: "g7_stairs2", x: 470, y: 20, w: 50, h: 60, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "g7_club", x: 530, y: 20, w: 50, h: 60, nameVi: "CLB Ngoại ngữ", nameEn: "English Club Room", type: "office", cap: 25, detailsVi: "Không gian sinh hoạt ngoại khóa và trao đổi tiếng Anh.", detailsEn: "Space for extracurricular activities and English exchange." },
                { id: "g7_corridor2", x: 20, y: 90, w: 360, h: 20, nameVi: "Hành lang", nameEn: "Corridor", type: "hallway" },
                { id: "g7_corridor2_e", x: 470, y: 90, w: 110, h: 20, nameVi: "Hành lang Đông", nameEn: "East Corridor", type: "hallway" }
            ]
        }
    },
    library: {
        nameVi: "Thư viện NTU",
        nameEn: "NTU Library",
        floors: [
            { level: 0, nameVi: "Tầng trệt", nameEn: "Ground Floor" },
            { level: 1, nameVi: "Lầu 1", nameEn: "1st Floor" },
            { level: 2, nameVi: "Lầu 2", nameEn: "2nd Floor" }
        ],
        rooms: {
            0: [
                { id: "lib_reception", x: 20, y: 20, w: 120, h: 50, nameVi: "Quầy Tiếp tân & Mượn trả", nameEn: "Reception & Circulation Desk", type: "office", cap: 10, detailsVi: "Nơi làm thẻ thư viện, đăng ký mượn sách mang về và trả sách.", detailsEn: "Desk for library card services, checking out and returning books." },
                { id: "lib_bookstore", x: 150, y: 20, w: 180, h: 65, nameVi: "Nhà sách & Quầy Lưu niệm", nameEn: "Bookstore & Souvenirs", type: "classroom", cap: 40, detailsVi: "Nơi bán giáo trình NTU, tài liệu tham khảo và đồ lưu niệm của trường.", detailsEn: "Selling NTU textbooks, reference materials, and campus souvenirs." },
                { id: "lib_wc_m0", x: 340, y: 20, w: 40, h: 30, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "lib_wc_f0", x: 340, y: 50, w: 40, h: 30, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "lib_stairs0", x: 390, y: 20, w: 50, h: 60, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "lib_elobby0", x: 450, y: 20, w: 130, h: 120, nameVi: "Thư viện điện tử (Phòng Máy tính)", nameEn: "E-Library / Computer Room", type: "office", cap: 60, detailsVi: "Hơn 50 máy tính kết nối internet tốc độ cao phục vụ tra cứu dữ liệu số.", detailsEn: "Over 50 high-speed computers for digital database searches." },
                { id: "lib_corridor0", x: 20, y: 95, w: 420, h: 25, nameVi: "Sảnh đợi trung tâm", nameEn: "Central Lobby", type: "hallway" }
            ],
            1: [
                { id: "lib_read_101", x: 20, y: 20, w: 220, h: 100, nameVi: "Phòng đọc Tổng hợp (101)", nameEn: "General Reading Room (101)", type: "classroom", cap: 120, detailsVi: "Phòng đọc sách tự chọn quy mô lớn với nhiều tài liệu KH&CN, Kinh tế.", detailsEn: "Large open-access reading room with Science, Tech and Economics literature." },
                { id: "lib_stairs1", x: 250, y: 20, w: 50, h: 50, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "lib_wc_m1", x: 250, y: 75, w: 25, h: 45, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "lib_wc_f1", x: 280, y: 75, w: 25, h: 45, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "lib_group", x: 310, y: 20, w: 150, h: 100, nameVi: "Khu vực Học nhóm & Thảo luận", nameEn: "Group Study & Discussion Area", type: "office", cap: 50, detailsVi: "Không gian mở thảo luận thoải mái, có bảng di động và ổ cắm sạc.", detailsEn: "Open collaborative space, featuring mobile whiteboards and sockets." },
                { id: "lib_office1", x: 470, y: 20, w: 110, h: 100, nameVi: "Phòng nghiệp vụ Thư viện", nameEn: "Library Operations Office", type: "office", cap: 12, detailsVi: "Văn phòng làm việc của thủ thư và xử lý kỹ thuật sách.", detailsEn: "Administrative office for librarians and book processing." }
            ],
            2: [
                { id: "lib_seminar", x: 20, y: 20, w: 180, h: 100, nameVi: "Phòng Hội thảo chuyên đề (301)", nameEn: "Seminar Room (301)", type: "classroom", cap: 80, detailsVi: "Phòng tổ chức các buổi tọa đàm khoa học, tập huấn sử dụng thư viện.", detailsEn: "Room for scientific seminars, workshops, and database training." },
                { id: "lib_stairs2", x: 210, y: 20, w: 45, h: 50, nameVi: "Cầu thang bộ", nameEn: "Stairs", type: "stairs" },
                { id: "lib_wc_m2", x: 210, y: 75, w: 20, h: 45, nameVi: "WC Nam", nameEn: "WC Men", type: "restroom" },
                { id: "lib_wc_f2", x: 235, y: 75, w: 20, h: 45, nameVi: "WC Nữ", nameEn: "WC Women", type: "restroom" },
                { id: "lib_read_102", x: 260, y: 20, w: 200, h: 100, nameVi: "Phòng đọc Tài liệu Đặc biệt (102)", nameEn: "Special Collections Room (102)", type: "office", cap: 60, detailsVi: "Nơi lưu trữ luận văn tốt nghiệp, luận án tiến sĩ và sách cổ quý hiếm.", detailsEn: "Archiving graduation theses, doctoral dissertations, and rare books." },
                { id: "lib_digital", x: 470, y: 20, w: 110, h: 100, nameVi: "Phòng Số hóa Tài liệu", nameEn: "Document Digitization Room", type: "office", cap: 8, detailsVi: "Khu vực quét sách, tài liệu để cập nhật lên kho tài nguyên số.", detailsEn: "Scanning and scanning operations for digital library cataloging." }
            ]
        }
    }
};

// Colors mapping for SVG room types
const ROOM_COLORS = {
    classroom: { fill: "#dbeafe", stroke: "#2563eb", text: "#1e40af" },
    office: { fill: "#d1fae5", stroke: "#059669", text: "#065f46" },
    restroom: { fill: "#fee2e2", stroke: "#dc2626", text: "#991b1b" },
    stairs: { fill: "#f3f4f6", stroke: "#4b5563", text: "#1f2937" },
    hallway: { fill: "#fafafa", stroke: "#d1d5db", text: "#4b5563" }
};

// Render the floor plan SVG into target container
function renderIndoorSVG(buildingId, floorLevel, lang = "vi") {
    const bld = INDOOR_DATA[buildingId];
    if (!bld) return "";

    const rooms = bld.rooms[floorLevel] || [];
    
    // Width and height of the layout
    const width = 600;
    const height = 150;

    let svgHtml = `<svg viewBox="0 0 ${width} ${height}" class="w-full h-auto border border-gray-300 rounded bg-white shadow-inner select-none" id="floor-svg">`;
    
    // Draw background grid
    svgHtml += `
        <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
    `;

    // Render rooms
    rooms.forEach(rm => {
        const style = ROOM_COLORS[rm.type] || ROOM_COLORS.hallway;
        const displayName = lang === "vi" ? rm.nameVi : rm.nameEn;
        
        svgHtml += `
            <g class="room-group cursor-pointer transition-all duration-200" 
               data-id="${rm.id}" 
               data-name="${displayName}" 
               data-capacity="${rm.cap || 0}"
               data-type="${rm.type}"
               data-details="${lang === 'vi' ? (rm.detailsVi || 'Tiện ích tòa nhà') : (rm.detailsEn || 'Building amenity')}"
               onclick="selectRoom('${rm.id}')">
                <rect x="${rm.x}" y="${rm.y}" width="${rm.w}" height="${rm.h}" 
                      fill="${style.fill}" stroke="${style.stroke}" stroke-width="1.5" rx="3"
                      class="room-rect hover:fill-blue-100 hover:stroke-blue-600 transition-all duration-150" />
                <text x="${rm.x + rm.w/2}" y="${rm.y + rm.h/2 + 4}" 
                      fill="${style.text}" font-size="8" font-weight="bold" font-family="sans-serif"
                      text-anchor="middle" class="pointer-events-none">
                    ${lang === "vi" ? truncateString(rm.nameVi, rm.w) : truncateString(rm.nameEn, rm.w)}
                </text>
            </g>
        `;
    });

    svgHtml += `</svg>`;
    return svgHtml;
}

// Utility: Truncate text labels if they exceed room width
function truncateString(str, width) {
    const maxChars = Math.floor(width / 5);
    // Remove detailed tags in parenthesis for short view
    let cleanStr = str.split(" (")[0];
    if (cleanStr.length > maxChars) {
        return cleanStr.slice(0, maxChars - 1) + "..";
    }
    return cleanStr;
}

// Room Selection Details Handler
function selectRoom(roomId) {
    const activeEl = document.querySelector(`.room-group[data-id="${roomId}"]`);
    if (!activeEl) return;

    // Reset all highlights
    document.querySelectorAll('.room-rect').forEach(rect => {
        const pType = rect.parentElement.getAttribute('data-type');
        const style = ROOM_COLORS[pType] || ROOM_COLORS.hallway;
        rect.setAttribute('fill', style.fill);
        rect.setAttribute('stroke', style.stroke);
        rect.setAttribute('stroke-width', '1.5');
    });

    // Highlight selected
    const activeRect = activeEl.querySelector('.room-rect');
    activeRect.setAttribute('fill', '#93c5fd'); // sky blue highlght
    activeRect.setAttribute('stroke', '#1d4ed8'); // dark blue border
    activeRect.setAttribute('stroke-width', '2.5');

    const name = activeEl.getAttribute('data-name');
    const details = activeEl.getAttribute('data-details');
    const cap = parseInt(activeEl.getAttribute('data-capacity'));

    // Populate Sidebar Detail Panel for Indoor Modal
    const detailTitle = document.getElementById('indoor-room-title');
    const detailDesc = document.getElementById('indoor-room-desc');
    const detailCap = document.getElementById('indoor-room-capacity');

    if (detailTitle && detailDesc && detailCap) {
        detailTitle.textContent = name;
        detailDesc.textContent = details;
        if (cap > 0) {
            detailCap.innerHTML = `<i class="fa-solid fa-users text-teal-500 mr-2"></i>Sức chứa: <strong>${cap} sinh viên</strong>`;
            detailCap.classList.remove('hidden');
        } else {
            detailCap.classList.add('hidden');
        }
        document.getElementById('indoor-room-info-card').classList.remove('hidden');
    }
}
