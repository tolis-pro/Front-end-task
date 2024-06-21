

    document.addEventListener('DOMContentLoaded', function() {
        const image = document.getElementById('responsive-image');
        const map = document.querySelector('map[name="image-map"]');
        const originalWidth = image.naturalWidth;

        function resizeMap() {
            const scaleFactor = image.clientWidth / originalWidth;
            const areas = map.getElementsByTagName('area');

            for (let area of areas) {
                const originalCoords = area.dataset.originalCoords.split(',').map(Number);
                const scaledCoords = originalCoords.map(coord => coord * scaleFactor);
                area.coords = scaledCoords.join(',');
            }
        }

        // Store original coordinates
        const areas = map.getElementsByTagName('area');
        for (let area of areas) {
            if (!area.dataset.originalCoords) {
                area.dataset.originalCoords = area.coords;
            }
        }

        // Initial resize
        resizeMap();

        // Resize on window resize
        window.addEventListener('resize', resizeMap);
    });

    function submitForm(event) {
        event.preventDefault();

        const form = document.getElementById('contactForm');
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7jjVErmFLOT63fXQNZNBHaUxv4pmedxc&libraries=maps,marker&v=beta`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
// });

function initMap() {
    const map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: 40.568893067553454, lng: 22.978151098916022 },
        zoom: 8,
    });

    const marker = new google.maps.Marker({
        position: { lat: 40.568893067553454, lng: 22.978151098916022 },
        map: map,
        title: 'Our Location',
    });
}
