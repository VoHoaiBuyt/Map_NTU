// GPS Real-time Simulator for NTU Map

class GPSSimulator {
    constructor(mapInstance) {
        this.map = mapInstance;
        this.marker = null;
        this.pathCoords = [];
        this.currentIndex = 0;
        this.intervalId = null;
        this.isSimulating = false;
        this.onStepCallback = null;
        this.onCompleteCallback = null;
        this.speed = 0.00004; // coordinate step increment per tick
    }

    // Initialize custom pulsing GPS marker
    initMarker(latlng) {
        if (this.marker) {
            this.marker.setLatLng(latlng);
            return;
        }

        // Custom pulsing dot icon using Leaflet DivIcon
        const gpsIcon = L.divIcon({
            className: 'gps-marker-container',
            html: `
                <div class="gps-pulse"></div>
                <div class="gps-dot"></div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        this.marker = L.marker(latlng, { icon: gpsIcon }).addTo(this.map);
    }

    // Start simulating along a given path (list of LatLng arrays)
    start(pathCoords, onStep, onComplete) {
        this.stop(); // Stop any running simulation

        if (!pathCoords || pathCoords.length === 0) {
            console.error("GPS Sim: Empty path coordinates.");
            return;
        }

        this.pathCoords = pathCoords;
        this.currentIndex = 0;
        this.onStepCallback = onStep;
        this.onCompleteCallback = onComplete;
        this.isSimulating = true;

        this.initMarker(this.pathCoords[0]);
        this.map.panTo(this.pathCoords[0]);

        this.simulateNextStep();
    }

    // Interpolate points between nodes to make the movement smooth
    simulateNextStep() {
        if (!this.isSimulating) return;

        if (this.currentIndex >= this.pathCoords.length - 1) {
            this.stop();
            if (this.onCompleteCallback) this.onCompleteCallback();
            return;
        }

        const startPt = this.pathCoords[this.currentIndex];
        const endPt = this.pathCoords[this.currentIndex + 1];
        
        let currentLatLng = L.latLng(startPt[0], startPt[1]);
        const targetLatLng = L.latLng(endPt[0], endPt[1]);
        
        const steps = 15; // sub-steps between node junctions
        let stepCount = 0;

        this.intervalId = setInterval(() => {
            if (!this.isSimulating) return;

            stepCount++;
            const t = stepCount / steps;
            
            // Linear interpolation
            const nextLat = startPt[0] + (endPt[0] - startPt[0]) * t;
            const nextLng = startPt[1] + (endPt[1] - startPt[1]) * t;
            
            const newPos = [nextLat, nextLng];
            this.marker.setLatLng(newPos);
            
            // Keep map centered on GPS icon
            this.map.panTo(newPos, { animate: true, duration: 0.1 });

            if (this.onStepCallback) {
                this.onStepCallback(newPos);
            }

            if (stepCount >= steps) {
                clearInterval(this.intervalId);
                this.currentIndex++;
                this.simulateNextStep();
            }
        }, 150); // move every 150ms
    }

    // Stop and clean up simulation
    stop() {
        this.isSimulating = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        // Do not remove marker immediately so user can see their simulated final position,
        // unless explicitly requested.
    }

    // Completely remove the GPS marker
    clear() {
        this.stop();
        if (this.marker) {
            this.map.removeLayer(this.marker);
            this.marker = null;
        }
    }
}
