// Dijkstra Routing Engine for NTU Map

// Helper: Calculate distance between two lat-lng coordinates using Haversine formula (in meters)
function getDistance(coords1, coords2) {
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) *
            Math.cos(phi2) *
            Math.sin(deltaLambda / 2) *
            Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
}

// Friendly names for junctions to generate instructions
const NODE_NAMES = {
    "j_gate_pond": { vi: "Lối rẽ từ Cổng chính", en: "Main Gate junction" },
    "j_parking_pond": { vi: "Đoạn đường cạnh Bãi xe cổng chính", en: "Path near Main Parking" },
    "j_pond_g8": { vi: "Đoạn đường cạnh giảng đường G8", en: "Path near G8" },
    "j_g1_g2": { vi: "Đường đi bộ giữa G1 và G2", en: "Walkway between G1 and G2" },
    "j_g2_g3": { vi: "Đoạn đường nối G2 và G3", en: "Path between G2 and G3" },
    "j_g3_dorms": { vi: "Ngã rẽ lên khu Ký túc xá", en: "Fork to Dormitory area" },
    "j_dorms_sports": { vi: "Lối đi giữa KTX K2 và Nhà thi đấu", en: "Path between K2 and Sports Complex" },
    "j_sports_canteen": { vi: "Đường đi bộ từ Nhà thi đấu xuống Căng tin", en: "Walkway from Sports Complex to Cafeteria" },
    "j_canteen_library": { vi: "Đoạn dốc giữa Căng tin và Thư viện", en: "Slope between Cafeteria and Library" },
    "j_library_admin": { vi: "Lối đi nối Thư viện và Nhà Hiệu Bộ", en: "Walkway between Library and Administration" },
    "j_admin_g7": { vi: "Đoạn đường giữa Nhà Hiệu bộ và G7", en: "Path between Admin and G7" },
    "j_g7_g6": { vi: "Đường đi bộ giữa G7 và G6", en: "Walkway between G7 and G6" },
    "j_g6_g5": { vi: "Lối đi từ G6 qua G5", en: "Path from G6 to G5" },
    "j_g5_canteen": { vi: "Đoạn đường nối G5 và Căng tin", en: "Path connecting G5 and Cafeteria" },
    "j_admin_pond": { vi: "Đoạn đường phía trước Nhà Hiệu bộ", en: "Path in front of Administration" },
    "j_pond_g1": { vi: "Lối đi cạnh Hồ súng hướng về G1", en: "Path near Lotus Pond towards G1" }
};

// Get name of any node in selected language
function getNodeName(nodeId, lang) {
    // If it's a POI
    const poi = POIS.find(p => p.id === nodeId);
    if (poi) {
        return lang === "vi" ? poi.nameVi : poi.nameEn;
    }
    // If it's a junction
    if (NODE_NAMES[nodeId]) {
        return lang === "vi" ? NODE_NAMES[nodeId].vi : NODE_NAMES[nodeId].en;
    }
    return nodeId;
}

// Build adjacency list representation of the graph
function buildAdjacencyList() {
    const adj = {};
    
    // Initialize empty arrays for all nodes
    for (const nodeId in GRAPH_NODES) {
        adj[nodeId] = [];
    }

    // Add edges with computed distances
    GRAPH_EDGES.forEach(([u, v]) => {
        if (!GRAPH_NODES[u] || !GRAPH_NODES[v]) {
            console.error(`Edge references non-existent node: ${u} - ${v}`);
            return;
        }
        const dist = getDistance(GRAPH_NODES[u], GRAPH_NODES[v]);
        adj[u].push({ node: v, weight: dist });
        adj[v].push({ node: u, weight: dist }); // undirected graph
    });

    return adj;
}

// Dijkstra Shortest Path Algorithm
function findShortestPath(startId, endId) {
    const adj = buildAdjacencyList();
    const distances = {};
    const previous = {};
    const queue = new Set();

    // Initialize distances
    for (const nodeId in GRAPH_NODES) {
        distances[nodeId] = Infinity;
        previous[nodeId] = null;
        queue.add(nodeId);
    }
    distances[startId] = 0;

    while (queue.size > 0) {
        // Find node with minimum distance in the queue
        let minNode = null;
        let minDist = Infinity;
        queue.forEach(node => {
            if (distances[node] < minDist) {
                minDist = distances[node];
                minNode = node;
            }
        });

        if (minNode === null || minNode === endId) {
            break; // Destination reached or unreachable
        }

        queue.delete(minNode);

        // Update distances to neighbors
        adj[minNode].forEach(neighbor => {
            if (queue.has(neighbor.node)) {
                const alt = distances[minNode] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    previous[neighbor.node] = minNode;
                }
            }
        });
    }

    // Reconstruct the path
    const path = [];
    let current = endId;
    if (distances[endId] !== Infinity || startId === endId) {
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }
    }

    return {
        path: path,
        distance: distances[endId],
        coordinates: path.map(nodeId => GRAPH_NODES[nodeId])
    };
}

// Generate human-friendly step-by-step navigation instructions
function generateNavigationInstructions(path, lang = "vi") {
    const instructions = [];
    if (path.length < 2) {
        instructions.push({
            text: lang === "vi" ? "Bạn đã ở điểm đến." : "You are at your destination.",
            dist: 0
        });
        return instructions;
    }

    for (let i = 0; i < path.length - 1; i++) {
        const current = path[i];
        const next = path[i + 1];
        
        const currentName = getNodeName(current, lang);
        const nextName = getNodeName(next, lang);
        
        const dist = Math.round(getDistance(GRAPH_NODES[current], GRAPH_NODES[next]));

        let text = "";
        if (i === 0) {
            if (lang === "vi") {
                text = `Xuất phát từ **${currentName}**, đi tiếp khoảng **${dist}m** đến **${nextName}**.`;
            } else {
                text = `Start from **${currentName}**, walk about **${dist}m** to **${nextName}**.`;
            }
        } else if (i === path.length - 2) {
            if (lang === "vi") {
                text = `Từ **${currentName}**, đi tiếp **${dist}m** để đến điểm đích **${nextName}**.`;
            } else {
                text = `From **${currentName}**, walk **${dist}m** to reach your destination **${nextName}**.`;
            }
        } else {
            // General intermediate steps
            if (lang === "vi") {
                text = `Tiếp tục đi thẳng **${dist}m** qua **${currentName}** hướng về **${nextName}**.`;
            } else {
                text = `Continue walking **${dist}m** past **${currentName}** towards **${nextName}**.`;
            }
        }
        
        instructions.push({
            text: text,
            dist: dist
        });
    }

    return instructions;
}
