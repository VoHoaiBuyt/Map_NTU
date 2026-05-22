# Nha Trang University (NTU) Campus Map & Routing

An interactive, premium single-page web application featuring custom maps, search indexing, routing, and indoor floor planning for Nha Trang University (Đại học Nha Trang) located on La San Hill, Nha Trang, Vietnam.

## Features

- **Interactive Base Map**: Renders the Nha Trang University campus with coordinates bounded precisely to NTU to optimize rendering.
- **Glassmorphic Navigation UI**: Beautiful sidebar controls featuring Light/Dark mode toggling, Language switcher (Vietnamese / English), search, directions, and layers filters.
- **POI Index & Search**: Custom marker overlays representing Lecture Halls, Student Services, Canteens, Parking Areas, and Landmarks. Search autocomplete resolves departments, classrooms, and buildings.
- **Dijkstra-based Route Finder**: Computes the shortest walkway path between any two locations on campus, displaying polyline paths, distance, walk times, and step-by-step navigation instructions.
- **Interactive Indoor Floor Plans**: Beautiful custom SVG plans with hover overlays and room info panels for **Giảng đường G7** and the **Thư viện (Library)**.
- **GPS Simulation Mode**: Simulates real-time GPS walking navigation. Moves the user marker along the path, dynamically updates directions, and recalculates paths dynamically.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox, Grid, Glassmorphic overlays), Vanilla JavaScript (ES6).
- **Mapping Library**: Leaflet.js (loaded via CDN) with CartoDB Voyager tiles.
- **Icons**: FontAwesome.

## How to Run

1. Open `index.html` directly in any web browser.
2. Alternatively, serve it via a local development server:
   ```bash
   npx http-server
   ```
3. Open `http://localhost:8080` in your browser.
