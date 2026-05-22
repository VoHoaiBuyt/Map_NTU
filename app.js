// Main Orchestrator for NTU Campus Map

// Localization Strings
const TRANSLATIONS = {
    vi: {
        appTitle: "NTU Campus Map",
        appSubtitle: "Đại học Nha Trang - Đồi La San",
        searchPlaceholder: "Tìm giảng đường, phòng học, khoa...",
        tabSearch: "Tìm kiếm",
        tabRoute: "Chỉ đường",
        tabLayers: "Lớp bản đồ",
        filterAll: "Tất cả địa điểm",
        filterBuilding: "Giảng đường / Tòa nhà",
        filterUtility: "Tiện ích / Dịch vụ",
        filterParking: "Bãi giữ xe",
        filterLandscape: "Cảnh quan / Check-in",
        optStart: "-- Chọn điểm xuất phát --</option>",
        optEnd: "-- Chọn điểm đến --</option>",
        gpsStart: "Bắt đầu GPS giả lập",
        gpsStop: "Dừng GPS giả lập",
        instructionsPlaceholder: "Vui lòng chọn điểm xuất phát và điểm đến để hiển thị đường đi ngắn nhất.",
        layerBuildings: "Tòa nhà & Giảng đường",
        layerUtilities: "Tiện ích sinh viên",
        layerParking: "Nhà giữ xe máy",
        layerLandscapes: "Cảnh quan chụp ảnh",
        layerRoads: "Hiển thị đường nối (Graph Paths)",
        legendTitle: "Chú giải bản đồ",
        legendBuilding: "Giảng đường G",
        legendUtility: "Tiện ích / Căng tin",
        legendParking: "Nhà giữ xe",
        legendLandscape: "Cảnh quan hồ nước",
        legendGate: "Cổng trường",
        btnRouteTo: "Dẫn đường đến đây",
        btnIndoor: "Xem sơ đồ tầng",
        sectionDepts: "Khoa & Bộ môn",
        sectionRooms: "Danh sách phòng học",
        indoorTitle: "Sơ đồ tầng ",
        indoorPlaceholder: "Nhấp chọn một phòng học trên sơ đồ để xem thông tin chi tiết.",
        indoorDetailsTitle: "Chi tiết phòng học",
        labelFrom: "Điểm xuất phát",
        labelTo: "Điểm đến",
        min: " phút",
        sec: " giây",
        m: " m"
    },
    en: {
        appTitle: "NTU Campus Map",
        appSubtitle: "Nha Trang University - La San Hill",
        searchPlaceholder: "Search lecture halls, classrooms, faculties...",
        tabSearch: "Search",
        tabRoute: "Directions",
        tabLayers: "Map Layers",
        filterAll: "All Locations",
        filterBuilding: "Lecture Halls & Buildings",
        filterUtility: "Utilities & Services",
        filterParking: "Parking Lots",
        filterLandscape: "Landmarks & Check-ins",
        optStart: "-- Select starting point --</option>",
        optEnd: "-- Select destination --</option>",
        gpsStart: "Start GPS Simulator",
        gpsStop: "Stop GPS Simulator",
        instructionsPlaceholder: "Please select start and destination to calculate the shortest path.",
        layerBuildings: "Buildings & Lecture Halls",
        layerUtilities: "Student Services",
        layerParking: "Motorbike Parking",
        layerLandscapes: "Landscapes & Photo spots",
        layerRoads: "Show Routing Paths Network",
        legendTitle: "Map Legend",
        legendBuilding: "Lecture Hall G",
        legendUtility: "Services / Cafeteria",
        legendParking: "Parking Area",
        legendLandscape: "Pond / Landscape",
        legendGate: "Gate",
        btnRouteTo: "Directions to here",
        btnIndoor: "View Floor Plan",
        sectionDepts: "Faculties & Departments",
        sectionRooms: "Classrooms List",
        indoorTitle: "Floor Plan - ",
        indoorPlaceholder: "Click on a room in the map layout to inspect its details.",
        indoorDetailsTitle: "Room Details",
        labelFrom: "Starting Point",
        labelTo: "Destination",
        min: " min",
        sec: " sec",
        m: " m"
    }
};

// Global App State
let currentLanguage = 'vi';
let map = null;
let currentTileLayer = null;
let currentActiveTab = 'search';
let currentActivePOI = null;
let selectedRoomId = null;
let currentIndoorFloor = 0;

// Layers & Markers Groups
const markersGroup = L.layerGroup();
const routesGroup = L.layerGroup();
const roadNetworkGroup = L.layerGroup();
const polygonsGroup = L.layerGroup();
const walkwaysGroup = L.layerGroup();

// Tile URLs for Light, Dark, and Satellite mode (with Google Maps roadmap and hybrid layers)
const TILES = {
    light: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
};
const ATTRIBUTION = '&copy; Google Maps';
const SATELLITE_ATTRIBUTION = '&copy; Google Maps';

// Map style configurations
const ROUTE_LINE_OPTIONS = {
    color: '#20C997', // teal
    weight: 6,
    opacity: 0.85,
    className: 'route-glow-path'
};

const NETWORK_LINE_OPTIONS = {
    color: '#8b5cf6', // violet
    weight: 2,
    opacity: 0.35,
    dashArray: '4, 4'
};

// GPS Simulation instance
let gpsSim = null;

// Initialize when DOM loads
window.addEventListener('DOMContentLoaded', () => {
    initMap();
    initUI();
    updateCounts();
});

// 1. Initialize Leaflet Map
function initMap() {
    map = L.map('map', {
        center: CAMPUS_CENTER,
        zoom: 17,
        minZoom: 16,
        maxZoom: 20,
        maxBounds: MAP_BOUNDS,
        maxBoundsViscosity: 0.8
    });

    // Default light tiles
    currentTileLayer = L.tileLayer(TILES.light, {
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: ATTRIBUTION
    }).addTo(map);

    // Add layer groups
    markersGroup.addTo(map);
    routesGroup.addTo(map);
    polygonsGroup.addTo(map);
    walkwaysGroup.addTo(map);
    
    // Draw markers
    renderPOIMarkers();

    // Draw routing network paths for preview (can toggle on/off)
    renderRoadNetwork();
    roadNetworkGroup.addTo(map); // ON by default

    // Draw building polygons and detailed walkways
    renderBuildingPolygons();
    renderDetailedWalkways();

    // Bind zoomend listener to handle transitions
    map.on('zoomend', handleZoomChange);

    // Initialize GPS Simulator
    gpsSim = new GPSSimulator(map);

    // Initial check for zoom level settings
    handleZoomChange();
}

// 2. Initialize UI Interactions
function initUI() {
    // Populate Dropdown Selects for Route Planner
    populateRouteDropdowns();

    // Bind Search Input listener
    const searchInput = document.getElementById('map-search-input');
    const resultsDropdown = document.getElementById('search-results-list');

    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.style.display = 'none';
        }
    });

    // Double click or click on map clears current selection details
    map.on('click', () => {
        // Only clear if not clicking a marker (handled in marker click)
    });

    // Theme Toggle Button
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn.addEventListener('click', toggleTheme);

    // Language Toggle Button
    const langBtn = document.getElementById('lang-toggle-btn');
    langBtn.addEventListener('click', toggleLanguage);

    // Setup Start/End routing selects listeners
    document.getElementById('route-start-select').addEventListener('change', calculateRoute);
    document.getElementById('route-end-select').addEventListener('change', calculateRoute);

    // Mobile Header Drag Toggle
    const mobileHeader = document.getElementById('sidebar-toggle-header');
    mobileHeader.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.toggle('expanded');
        }
    });
}

// 3. Render Custom Markers for POIs
function renderPOIMarkers() {
    markersGroup.clearLayers();

    POIS.forEach(poi => {
        // Select custom marker color based on category
        const catMeta = CATEGORIES[poi.category] || CATEGORIES.building;
        
        // Define Custom DivIcon for Leaflet
        const iconHtml = `<div class="custom-leaflet-marker" style="background-color: ${catMeta.color}; width: 32px; height: 32px;">
            <i class="fa-solid ${poi.icon}"></i>
        </div>`;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        // Add Marker
        const marker = L.marker(poi.coords, { icon: customIcon });
        
        // Tooltip showing name - dynamically set permanent if zoom is >= 18
        const tooltipName = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
        const isPermanent = map ? (map.getZoom() >= 18) : false;
        marker.bindTooltip(tooltipName, {
            permanent: isPermanent,
            direction: 'top',
            offset: [0, -10],
            className: isPermanent 
                ? 'font-semibold text-xs border-none shadow custom-permanent-tooltip' 
                : 'font-semibold text-xs border-none shadow'
        });

        // Click Handler: View Details
        marker.on('click', () => {
            selectPOI(poi.id);
        });

        // Save reference to marker in POI object for quick zoom/pan
        poi.marker = marker;

        markersGroup.addLayer(marker);
    });
}

// Draw interactive building footprint polygons
function renderBuildingPolygons() {
    polygonsGroup.clearLayers();

    POIS.forEach(poi => {
        if (poi.polygon) {
            const catMeta = CATEGORIES[poi.category] || CATEGORIES.building;
            const poly = L.polygon(poi.polygon, {
                color: catMeta.color,
                weight: 1.5,
                opacity: 0.8,
                fillColor: catMeta.color,
                fillOpacity: 0.18,
                className: 'building-polygon-glow'
            });

            // Clicking on polygon selects the POI
            poly.on('click', (e) => {
                L.DomEvent.stopPropagation(e);
                selectPOI(poi.id);
            });

            // Tooltip on hover
            const tooltipName = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
            poly.bindTooltip(tooltipName, {
                direction: 'center',
                className: 'polygon-hover-tooltip'
            });

            polygonsGroup.addLayer(poly);
        }
    });
}

// Draw detailed walkways network
function renderDetailedWalkways() {
    walkwaysGroup.clearLayers();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    GRAPH_EDGES.forEach(([u, v]) => {
        const uCoords = GRAPH_NODES[u];
        const vCoords = GRAPH_NODES[v];
        if (uCoords && vCoords) {
            const line = L.polyline([uCoords, vCoords], {
                color: isDark ? '#334155' : '#cbd5e1',
                weight: 8,
                opacity: 0.55,
                lineCap: 'round',
                lineJoin: 'round',
                className: 'detailed-walkway-line'
            });
            walkwaysGroup.addLayer(line);
        }
    });
}

// Handles zoom-triggered details and transitions
function handleZoomChange() {
    if (!map) return;
    const currentZoom = map.getZoom();
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';

    if (currentZoom >= 18) {
        // Transition to Satellite imagery
        if (currentTileLayer._url !== TILES.satellite) {
            map.removeLayer(currentTileLayer);
            currentTileLayer = L.tileLayer(TILES.satellite, {
                maxZoom: 20,
                maxNativeZoom: 18,
                attribution: SATELLITE_ATTRIBUTION
            }).addTo(map);
        }

        // Add detailed layouts
        if (!map.hasLayer(polygonsGroup)) polygonsGroup.addTo(map);
        if (!map.hasLayer(walkwaysGroup)) walkwaysGroup.addTo(map);

        // Make labels permanent
        POIS.forEach(poi => {
            if (poi.marker) {
                const tooltipName = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
                poi.marker.unbindTooltip();
                poi.marker.bindTooltip(tooltipName, {
                    permanent: true,
                    direction: 'top',
                    offset: [0, -10],
                    className: 'font-semibold text-xs border-none shadow custom-permanent-tooltip'
                });
            }
        });
    } else {
        // Return to standard theme map (light or dark)
        const expectedTileUrl = TILES[currentTheme];
        if (currentTileLayer._url === TILES.satellite) {
            map.removeLayer(currentTileLayer);
            currentTileLayer = L.tileLayer(expectedTileUrl, {
                maxZoom: 20,
                maxNativeZoom: 19,
                attribution: ATTRIBUTION
            }).addTo(map);
        }

        // Remove detailed layouts
        if (map.hasLayer(polygonsGroup)) map.removeLayer(polygonsGroup);
        if (map.hasLayer(walkwaysGroup)) map.removeLayer(walkwaysGroup);

        // Return labels to hover-only
        POIS.forEach(poi => {
            if (poi.marker) {
                const tooltipName = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
                poi.marker.unbindTooltip();
                poi.marker.bindTooltip(tooltipName, {
                    permanent: false,
                    direction: 'top',
                    offset: [0, -10],
                    className: 'font-semibold text-xs border-none shadow'
                });
            }
        });
    }
}

// Draw the walk/road network lines
function renderRoadNetwork() {
    roadNetworkGroup.clearLayers();
    GRAPH_EDGES.forEach(([u, v]) => {
        const uCoords = GRAPH_NODES[u];
        const vCoords = GRAPH_NODES[v];
        if (uCoords && vCoords) {
            const line = L.polyline([uCoords, vCoords], NETWORK_LINE_OPTIONS);
            roadNetworkGroup.addLayer(line);
        }
    });
}

// 4. Tab Management
function switchTab(tabName) {
    currentActiveTab = tabName;
    
    // Update active tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}-btn`).classList.add('active');

    // Update active content panels
    document.querySelectorAll('.tab-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    // If switching to routing tab, reset GPS simulation to avoid leaks
    if (tabName !== 'route' && gpsSim.isSimulating) {
        toggleGpsSimulation();
    }
}

// 5. Select a Place of Interest (POI) & Slide Details Card
function selectPOI(poiId) {
    const poi = POIS.find(p => p.id === poiId);
    if (!poi) return;

    currentActivePOI = poi;
    
    // Zoom and Center on marker
    map.setView(poi.coords, 18, { animate: true });

    // Populate details panel
    const panel = document.getElementById('poi-detail-panel');
    const title = document.getElementById('poi-detail-title');
    const desc = document.getElementById('poi-detail-desc');
    const catBadge = document.getElementById('poi-detail-category');
    
    title.textContent = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
    desc.textContent = currentLanguage === 'vi' ? poi.descriptionVi : poi.descriptionEn;
    
    const catMeta = CATEGORIES[poi.category];
    catBadge.textContent = currentLanguage === 'vi' ? catMeta.vi : catMeta.en;
    catBadge.style.backgroundColor = catMeta.color;

    // Show/Hide Departments
    const deptsContainer = document.getElementById('poi-detail-departments-container');
    const deptsList = document.getElementById('poi-detail-departments-list');
    deptsList.innerHTML = '';
    
    if (poi.departments && poi.departments.length > 0) {
        poi.departments.forEach(dept => {
            const deptText = currentLanguage === 'vi' ? dept.vi : dept.en;
            const badge = document.createElement('span');
            badge.className = 'tag-badge';
            badge.textContent = deptText;
            deptsList.appendChild(badge);
        });
        deptsContainer.classList.remove('hidden');
    } else {
        deptsContainer.classList.add('hidden');
    }

    // Show/Hide Rooms
    const roomsContainer = document.getElementById('poi-detail-rooms-container');
    const roomsList = document.getElementById('poi-detail-rooms-list');
    roomsList.innerHTML = '';

    if (poi.rooms && poi.rooms.length > 0) {
        poi.rooms.forEach(rm => {
            const badge = document.createElement('span');
            badge.className = 'tag-badge';
            badge.style.borderColor = 'var(--accent)';
            badge.style.color = 'var(--text-primary)';
            badge.innerHTML = `<i class="fa-solid fa-chalkboard-user mr-1 text-teal-500"></i>${rm}`;
            roomsList.appendChild(badge);
        });
        roomsContainer.classList.remove('hidden');
    } else {
        roomsContainer.classList.add('hidden');
    }

    // Toggle Indoor floor map button visibility
    const indoorBtn = document.getElementById('btn-action-indoor');
    if (poi.hasIndoorMap) {
        indoorBtn.classList.remove('hidden');
    } else {
        indoorBtn.classList.add('hidden');
    }

    // Slide up panel
    panel.classList.add('active');
}

function closeDetailPanel() {
    document.getElementById('poi-detail-panel').classList.remove('active');
    currentActivePOI = null;
}

// 6. Search Autocomplete Handler
function handleSearch(query) {
    const list = document.getElementById('search-results-list');
    list.innerHTML = '';

    if (!query || query.trim() === '') {
        list.style.display = 'none';
        return;
    }

    const cleanQuery = query.toLowerCase().trim();

    // Find matches across POIs
    const matches = POIS.filter(poi => {
        const nameMatch = poi.nameVi.toLowerCase().includes(cleanQuery) || poi.nameEn.toLowerCase().includes(cleanQuery);
        const descMatch = (poi.descriptionVi && poi.descriptionVi.toLowerCase().includes(cleanQuery)) || (poi.descriptionEn && poi.descriptionEn.toLowerCase().includes(cleanQuery));
        
        // Match departments
        const deptMatch = poi.departments.some(d => d.vi.toLowerCase().includes(cleanQuery) || d.en.toLowerCase().includes(cleanQuery));
        
        // Match rooms
        const roomMatch = poi.rooms.some(r => r.toLowerCase().includes(cleanQuery));

        return nameMatch || descMatch || deptMatch || roomMatch;
    });

    if (matches.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'result-item';
        emptyItem.innerHTML = `<span style="font-size: 13px; color: var(--text-muted);">No results found / Không tìm thấy kết quả</span>`;
        list.appendChild(emptyItem);
    } else {
        matches.slice(0, 5).forEach(poi => {
            const item = document.createElement('div');
            item.className = 'result-item';
            
            const title = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
            const subtitle = CATEGORIES[poi.category][currentLanguage];
            
            item.innerHTML = `
                <i class="fa-solid ${poi.icon}"></i>
                <div class="result-text">
                    <span class="result-title">${title}</span>
                    <span class="result-subtitle">${subtitle}</span>
                </div>
            `;

            item.addEventListener('click', () => {
                list.style.display = 'none';
                document.getElementById('map-search-input').value = title;
                selectPOI(poi.id);
            });

            list.appendChild(item);
        });
    }

    list.style.display = 'block';
}

// 7. Categories filter
function filterPOIs(category) {
    // Reset all filter badges to inactive
    document.querySelectorAll('.filter-badge').forEach(b => b.classList.remove('active'));
    document.getElementById(`filter-${category}`).classList.add('active');

    if (category === 'all') {
        // Show all markers
        POIS.forEach(p => {
            if (!map.hasLayer(p.marker)) {
                map.addLayer(p.marker);
            }
        });
    } else {
        // Filter markers
        POIS.forEach(p => {
            if (p.category === category) {
                if (!map.hasLayer(p.marker)) map.addLayer(p.marker);
            } else {
                if (map.hasLayer(p.marker)) map.removeLayer(p.marker);
            }
        });
    }
}

// Update counts on filter badges
function updateCounts() {
    document.getElementById('count-all').textContent = POIS.length;
    
    const types = ['building', 'utility', 'parking', 'landscape'];
    types.forEach(type => {
        const count = POIS.filter(p => p.category === type).length;
        document.getElementById(`count-${type}`).textContent = count;
    });
}

// 8. Routing Actions
function populateRouteDropdowns() {
    const startSelect = document.getElementById('route-start-select');
    const endSelect = document.getElementById('route-end-select');

    // Clear previous
    startSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLanguage].optStart}`;
    endSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLanguage].optEnd}`;

    // Sort POIs alphabetically in selected language
    const sortedPois = [...POIS].sort((a, b) => {
        const nameA = currentLanguage === 'vi' ? a.nameVi : a.nameEn;
        const nameB = currentLanguage === 'vi' ? b.nameVi : b.nameEn;
        return nameA.localeCompare(nameB);
    });

    sortedPois.forEach(poi => {
        const title = currentLanguage === 'vi' ? poi.nameVi : poi.nameEn;
        
        const optStart = document.createElement('option');
        optStart.value = poi.id;
        optStart.textContent = title;
        startSelect.appendChild(optStart);

        const optEnd = document.createElement('option');
        optEnd.value = poi.id;
        optEnd.textContent = title;
        endSelect.appendChild(optEnd);
    });
}

// Set Destination from bottom panel action
function setRouteDestination() {
    if (!currentActivePOI) return;

    switchTab('route');
    document.getElementById('route-end-select').value = currentActivePOI.id;
    
    // Automatically set starting point to Main Gate if it's empty
    const startSelect = document.getElementById('route-start-select');
    if (!startSelect.value) {
        startSelect.value = "gate_main";
    }

    closeDetailPanel();
    calculateRoute();
}

function swapStartEnd() {
    const startSelect = document.getElementById('route-start-select');
    const endSelect = document.getElementById('route-end-select');
    
    const temp = startSelect.value;
    startSelect.value = endSelect.value;
    endSelect.value = temp;

    calculateRoute();
}

// Compute path and draw polyline
function calculateRoute() {
    const startId = document.getElementById('route-start-select').value;
    const endId = document.getElementById('route-end-select').value;

    routesGroup.clearLayers();
    gpsSim.stop(); // Stop simulator if running

    const summaryPanel = document.getElementById('route-summary-panel');
    const instructionsPanel = document.getElementById('route-instructions-container');

    if (!startId || !endId) {
        summaryPanel.classList.add('hidden');
        instructionsPanel.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 13px;">${TRANSLATIONS[currentLanguage].instructionsPlaceholder}</p>`;
        return;
    }

    if (startId === endId) {
        summaryPanel.classList.add('hidden');
        instructionsPanel.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 13px;">${currentLanguage === 'vi' ? 'Điểm xuất phát và điểm đến trùng nhau!' : 'Start and destination are the same!'}</p>`;
        return;
    }

    // Call Dijkstra routing engine
    const routeData = findShortestPath(startId, endId);
    
    if (!routeData.path || routeData.path.length === 0) {
        instructionsPanel.innerHTML = `<p style="text-align: center; color: #ef4444; font-size: 13px;">${currentLanguage === 'vi' ? 'Không tìm thấy đường đi!' : 'No path found!'}</p>`;
        return;
    }

    // Draw route path line
    const routeLine = L.polyline(routeData.coordinates, ROUTE_LINE_OPTIONS);
    routesGroup.addLayer(routeLine);

    // Zoom map to fit the routing path line
    map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

    // Show statistics summary
    const distanceMeters = Math.round(routeData.distance);
    const speedMps = 1.2; // 1.2 m/s average walking speed
    const timeSecs = Math.round(distanceMeters / speedMps);
    const timeMins = Math.ceil(timeSecs / 60);

    document.getElementById('route-distance').textContent = distanceMeters + TRANSLATIONS[currentLanguage].m;
    document.getElementById('route-time').textContent = timeMins + TRANSLATIONS[currentLanguage].min;
    summaryPanel.classList.remove('hidden');

    // Populate step-by-step instructions
    const steps = generateNavigationInstructions(routeData.path, currentLanguage);
    instructionsPanel.innerHTML = '';
    
    steps.forEach((step, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'instruction-step';
        stepDiv.innerHTML = `
            <div class="instruction-step-num">${idx + 1}</div>
            <div>${step.text}</div>
        `;
        instructionsPanel.appendChild(stepDiv);
    });
}

// 9. GPS Simulation Handlers
function toggleGpsSimulation() {
    const btn = document.getElementById('gps-simulate-btn');
    const label = document.getElementById('gps-btn-label');

    if (gpsSim.isSimulating) {
        gpsSim.stop();
        gpsSim.clear();
        btn.classList.remove('simulating');
        label.textContent = TRANSLATIONS[currentLanguage].gpsStart;
        calculateRoute(); // Redraw static route
    } else {
        const startId = document.getElementById('route-start-select').value;
        const endId = document.getElementById('route-end-select').value;
        const routeData = findShortestPath(startId, endId);

        if (!routeData.coordinates || routeData.coordinates.length === 0) return;

        btn.classList.add('simulating');
        label.textContent = TRANSLATIONS[currentLanguage].gpsStop;

        // Start animation along coordinates
        gpsSim.start(routeData.coordinates, 
            // On Progress step callback: Recalculate route instructions from current GPS coordinate
            (currentLatLng) => {
                // Find closest node in network to GPS position
                let closestNode = null;
                let minDist = Infinity;
                
                for (const nodeId in GRAPH_NODES) {
                    const d = getDistance(currentLatLng, GRAPH_NODES[nodeId]);
                    if (d < minDist) {
                        minDist = d;
                        closestNode = nodeId;
                    }
                }

                // If user is moving, recalculate remaining route path from closest node to destination
                if (closestNode && closestNode !== endId) {
                    const remainingRoute = findShortestPath(closestNode, endId);
                    
                    // Clear and draw remaining route path line
                    routesGroup.clearLayers();
                    const remLine = L.polyline([currentLatLng, ...remainingRoute.coordinates], ROUTE_LINE_OPTIONS);
                    routesGroup.addLayer(remLine);

                    // Update stats
                    const distanceMeters = Math.round(remainingRoute.distance + minDist);
                    document.getElementById('route-distance').textContent = distanceMeters + TRANSLATIONS[currentLanguage].m;

                    // Update steps
                    const steps = generateNavigationInstructions([closestNode, ...remainingRoute.path], currentLanguage);
                    const container = document.getElementById('route-instructions-container');
                    container.innerHTML = '';
                    
                    // Add current GPS indicator step
                    const gpsStep = document.createElement('div');
                    gpsStep.className = 'instruction-step';
                    gpsStep.style.borderLeftColor = '#007aff';
                    gpsStep.innerHTML = `
                        <div class="instruction-step-num" style="background:#007aff;"><i class="fa-solid fa-location-crosshairs"></i></div>
                        <div>${currentLanguage === 'vi' ? 'Đang di chuyển bằng GPS giả lập...' : 'Simulating real-time walking...'}</div>
                    `;
                    container.appendChild(gpsStep);

                    steps.forEach((step, idx) => {
                        const stepDiv = document.createElement('div');
                        stepDiv.className = 'instruction-step';
                        stepDiv.innerHTML = `
                            <div class="instruction-step-num">${idx + 1}</div>
                            <div>${step.text}</div>
                        `;
                        container.appendChild(stepDiv);
                    });
                }
            }, 
            // On Complete callback
            () => {
                btn.classList.remove('simulating');
                label.textContent = TRANSLATIONS[currentLanguage].gpsStart;
                gpsSim.clear();
                alert(currentLanguage === 'vi' ? "Bạn đã đến nơi!" : "You have arrived at your destination!");
                calculateRoute();
            }
        );
    }
}

// 10. Map Layers control toggles
function toggleMapLayer(category) {
    const isChecked = document.getElementById(`layer-show-${category}s`).checked;
    POIS.forEach(p => {
        if (p.category === category) {
            if (isChecked) {
                if (!map.hasLayer(p.marker)) map.addLayer(p.marker);
            } else {
                if (map.hasLayer(p.marker)) map.removeLayer(p.marker);
            }
        }
    });
}

function toggleRoadNetwork() {
    const isChecked = document.getElementById('layer-show-roads').checked;
    if (isChecked) {
        if (!map.hasLayer(roadNetworkGroup)) map.addLayer(roadNetworkGroup);
    } else {
        if (map.hasLayer(roadNetworkGroup)) map.removeLayer(roadNetworkGroup);
    }
}

// 11. Theme Switcher (Dark/Light mode)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    
    // Switch map tile layer ONLY if zoom is < 18 (not in satellite mode)
    if (map && map.getZoom() < 18) {
        map.removeLayer(currentTileLayer);
        currentTileLayer = L.tileLayer(TILES[newTheme], {
            maxZoom: 20,
            maxNativeZoom: 19,
            attribution: ATTRIBUTION
        }).addTo(map);
    }

    // Redraw walkways to match the theme color
    renderDetailedWalkways();

    // Update theme icon
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    if (newTheme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

// 12. Language Switcher (VI/EN)
function toggleLanguage() {
    currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    
    // Update button text
    document.getElementById('lang-text').textContent = currentLanguage === 'vi' ? 'EN' : 'VI';
    
    // Update general texts
    const t = TRANSLATIONS[currentLanguage];
    document.getElementById('app-title').textContent = t.appTitle;
    document.getElementById('app-subtitle').textContent = t.appSubtitle;
    document.getElementById('map-search-input').placeholder = t.searchPlaceholder;
    
    document.getElementById('tab-label-search').textContent = t.tabSearch;
    document.getElementById('tab-label-route').textContent = t.tabRoute;
    document.getElementById('tab-label-layers').textContent = t.tabLayers;

    document.getElementById('filter-title-label').textContent = t.filterAll;
    document.getElementById('filter-label-all').textContent = t.filterAll;
    document.getElementById('filter-label-building').textContent = t.filterBuilding;
    document.getElementById('filter-label-utility').textContent = t.filterUtility;
    document.getElementById('filter-label-parking').textContent = t.filterParking;
    document.getElementById('filter-label-landscape').textContent = t.filterLandscape;

    document.getElementById('label-route-from').textContent = t.labelFrom;
    document.getElementById('label-route-to').textContent = t.labelTo;
    document.getElementById('gps-btn-label').textContent = gpsSim.isSimulating ? t.gpsStop : t.gpsStart;
    
    document.getElementById('layers-title-label').textContent = t.tabLayers;
    document.getElementById('layer-label-buildings').textContent = t.layerBuildings;
    document.getElementById('layer-label-utilities').textContent = t.layerUtilities;
    document.getElementById('layer-label-parking').textContent = t.layerParking;
    document.getElementById('layer-label-landscapes').textContent = t.layerLandscapes;
    document.getElementById('layer-label-roads').textContent = t.layerRoads;

    document.getElementById('legend-title-label').textContent = t.legendTitle;
    document.getElementById('legend-building').textContent = t.legendBuilding;
    document.getElementById('legend-utility').textContent = t.legendUtility;
    document.getElementById('legend-parking').textContent = t.legendParking;
    document.getElementById('legend-landscape').textContent = t.legendLandscape;
    document.getElementById('legend-gate').textContent = t.legendGate;

    document.getElementById('btn-label-route-to').textContent = t.btnRouteTo;
    document.getElementById('btn-label-indoor').textContent = t.btnIndoor;
    document.getElementById('section-label-departments').textContent = t.sectionDepts;
    document.getElementById('section-label-rooms').textContent = t.sectionRooms;
    
    document.getElementById('label-indoor-details-title').textContent = t.indoorDetailsTitle;
    document.getElementById('label-indoor-placeholder').textContent = t.indoorPlaceholder;

    // Refresh UI dropdown options and active selections
    const startSelect = document.getElementById('route-start-select');
    const endSelect = document.getElementById('route-end-select');
    const startVal = startSelect.value;
    const endVal = endSelect.value;
    
    populateRouteDropdowns();
    
    startSelect.value = startVal;
    endSelect.value = endVal;

    // Refresh map marker tooltips & polygons
    renderPOIMarkers();
    renderBuildingPolygons();

    // Recalculate route to translate instructions
    calculateRoute();

    // If detail panel is open, refresh detail texts
    if (currentActivePOI) {
        selectPOI(currentActivePOI.id);
    }
}

// 13. Indoor Floor Plan Modal Actions
function openIndoorMap() {
    if (!currentActivePOI || !currentActivePOI.hasIndoorMap) return;

    const modal = document.getElementById('indoor-map-modal');
    const modalTitle = document.getElementById('indoor-building-title');
    
    // Set title
    const bldName = currentLanguage === 'vi' ? currentActivePOI.nameVi : currentActivePOI.nameEn;
    modalTitle.textContent = TRANSLATIONS[currentLanguage].indoorTitle + bldName;

    // Set default floor to ground level (0)
    currentIndoorFloor = 0;

    // Build floor selector tabs
    const floorSelector = document.getElementById('indoor-floor-selector');
    floorSelector.innerHTML = '';
    
    const bldIndoor = INDOOR_DATA[currentActivePOI.id];
    if (bldIndoor) {
        bldIndoor.floors.forEach((fl, idx) => {
            const flTab = document.createElement('button');
            flTab.className = `floor-tab ${idx === 0 ? 'active' : ''}`;
            flTab.textContent = currentLanguage === 'vi' ? fl.nameVi : fl.nameEn;
            flTab.onclick = () => {
                // Remove active from all floor tabs
                document.querySelectorAll('.floor-tab').forEach(t => t.classList.remove('active'));
                flTab.classList.add('active');
                currentIndoorFloor = fl.level;
                renderFloorSVG();
            };
            floorSelector.appendChild(flTab);
        });
    }

    // Render SVG
    renderFloorSVG();

    // Reset details view in modal
    document.getElementById('indoor-room-info-card-empty').classList.remove('hidden');
    document.getElementById('indoor-room-info-card').classList.add('hidden');

    // Show modal
    modal.classList.add('active');
}

function closeIndoorMap() {
    document.getElementById('indoor-map-modal').classList.remove('active');
}

function renderFloorSVG() {
    if (!currentActivePOI) return;
    const svgContainer = document.getElementById('indoor-svg-container');
    
    // Generates SVG layout string from indoor.js and updates DOM
    svgContainer.innerHTML = renderIndoorSVG(currentActivePOI.id, currentIndoorFloor, currentLanguage);
}
