     // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        // Display submitted information
        document.getElementById('display-name').textContent = 
            `${urlParams.get('first-name')} ${urlParams.get('last-name')}`;
        
        document.getElementById('display-email').textContent = urlParams.get('email');
        document.getElementById('display-phone').textContent = urlParams.get('phone');
        document.getElementById('display-org').textContent = urlParams.get('organization');
        
        // Format membership level
        const membershipLevels = {
            'np': 'NP Membership (Non-Profit)',
            'bronze': 'Bronze Membership',
            'silver': 'Silver Membership',
            'gold': 'Gold Membership'
        };
        document.getElementById('display-membership').textContent = 
            membershipLevels[urlParams.get('membership')] || urlParams.get('membership');
        
        // Format timestamp
        const timestamp = new Date(urlParams.get('timestamp'));
        document.getElementById('display-timestamp').textContent = 
            timestamp.toLocaleString();