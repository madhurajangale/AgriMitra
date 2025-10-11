// FarmerData.js
export const FARMER_DATA = [
    { id: 101, name: 'Green Acres Farm', location: 'Pune', deliveryCost: 5.00, estimatedDelivery: '2-3 days' },
    { id: 102, name: 'Harvest Hub', location: 'Mumbai', deliveryCost: 8.50, estimatedDelivery: '1-2 days' },
    { id: 103, name: 'Shanti Organics', location: 'Nashik', deliveryCost: 4.00, estimatedDelivery: '3-4 days' },
    { id: 104, name: 'City Roots Produce', location: 'Mumbai', deliveryCost: 7.00, estimatedDelivery: '1 day' },
    { id: 105, name: 'Sun Valley Greens', location: 'Pune', deliveryCost: 6.00, estimatedDelivery: '2 days' },
];

export const DELIVERY_LOCATIONS = ['Select Location', 'Mumbai', 'Pune', 'Nashik', 'Bengaluru'];

// Sample description (you'd put this in your main CropData or fetch it)
export const PRODUCT_DESCRIPTIONS = {
    'Heirloom Tomatoes': "These non-GMO heirloom tomatoes are a vibrant mix of colors, each with a unique, rich, and complex flavor profile. Perfect for slicing in salads or creating a gourmet sandwich. Grown under direct sunlight and hand-picked at peak ripeness.",
    'Navel Oranges': "Sweet, juicy, and seedless, our navel oranges are a winter favorite. A perfect source of Vitamin C, they are great for snacking or making fresh juice. Grown in sun-drenched orchards using sustainable farming practices.",
    'Local Honey (Jar)': "A raw, unfiltered, and natural wildflower honey harvested from our local apiary. Its rich, floral notes are perfect for sweetening tea, drizzling over toast, or as a natural immunity booster. A true taste of the countryside.",
    // ... add descriptions for all your crops
};