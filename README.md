# 🗺️ Map_NTU - Giải pháp Bản đồ số và Chỉ đường Nội khu Đại học Nha Trang

**Map_NTU** là một ứng dụng web bản đồ tương tác (Interactive Web Map) được thiết kế chuyên biệt cho khuôn viên Trường Đại học Nha Trang (NTU) trên đồi La San. Dự án giải quyết bài toán tìm kiếm vị trí, số phòng học, giảng đường và tối ưu hóa tuyến đường di chuyển nội khu dành cho tân sinh viên, giảng viên và khách tham quan.

### 🚀 Tính năng cốt lõi
- **Tìm kiếm thông minh (Smart Search):** Tra cứu nhanh vị trí các tòa nhà (từ G1 đến G8, Nhà hiệu bộ, Thư viện...), số phòng học cụ thể (Ví dụ: G7.202), văn phòng khoa và các tiện ích nội khu (Căn tin, Nhà xe, ATM, Trạm y tế).
- **Chỉ đường tối ưu (Routing):** Tích hợp thuật toán tìm đường ngắn nhất (Dijkstra/A*) dành riêng cho lối đi bộ và đường nội bộ của NTU.
- **Định vị thời gian thực (GPS Localization):** Xác định vị trí hiện tại của người dùng trong khuôn viên trường để đưa ra hướng dẫn di chuyển trực quan (Yêu cầu quyền truy cập vị trí và kết nối HTTPS).
- **Bộ lọc danh mục (Category Filtering):** Hiển thị các lớp dữ liệu (Layers) theo nhu cầu như Khu học tập, Khu thể thao, Khu ký túc xá hoặc Điểm check-in chụp ảnh đẹp.

### 🛠️ Công nghệ sử dụng (Tech Stack)
- **Frontend:** React.js / Next.js, HTML5, Tailwind CSS.
- **Map Library:** Leaflet.js / Mapbox GL JS (Hiển thị bản đồ nền dựa trên OpenStreetMap và dữ liệu GeoJSON tùy biến).
- **Backend:** Node.js (Express) / Python (FastAPI).
- **Database:** PostgreSQL với extension **PostGIS** (Lưu trữ và tính toán dữ liệu không gian, hình học không gian).
- **Deployment:** Vercel (Frontend), Docker & Ubuntu VPS với Nginx + SSL Certbot (Backend).

### ⚙️ Hướng dẫn cài đặt nhanh (Local Setup)
*(Cung cấp vài dòng lệnh cơ bản để chạy dự án dưới máy cục bộ)*
