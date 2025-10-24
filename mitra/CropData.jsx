import React from "react";

const CropData = [
  // 🌾 GRAINS & CEREALS
  { id: 1, name: 'Basmati Rice', category: 'Grains', price: 1.25, unit: 'per kg', image: 'https://cpimg.tistatic.com/11014135/b/4/Indian-Basmati-Rice..jpg' },
  { id: 2, name: 'Wheat Grain', category: 'Grains', price: 0.80, unit: 'per kg', image: 'https://goodineverygrain.ca/wp-content/uploads/2021/06/wheat-berries-bowl.png' },
  { id: 3, name: 'Jowar (Sorghum)', category: 'Grains', price: 1.10, unit: 'per kg', image: 'https://static.toiimg.com/thumb/msid-66847765,width-1280,height-720,resizemode-4/66847765.jpg' },
  { id: 4, name: 'Bajra (Pearl Millet)', category: 'Grains', price: 1.05, unit: 'per kg', image: 'https://www.shutterstock.com/image-photo/closeup-pile-dry-bajra-pearl-600nw-2493219333.jpg' },
  { id: 5, name: 'Maize (Corn)', category: 'Grains', price: 0.95, unit: 'per kg', image: 'https://foodieng.com/wp-content/uploads/2022/05/yellow-maiz.jpg' },
  { id: 6, name: 'Ragi (Finger Millet)', category: 'Grains', price: 1.20, unit: 'per kg', image: 'https://doctorrekha.com/wp-content/uploads/2023/10/rag.png' },
  { id: 7, name: 'Barley', category: 'Grains', price: 1.00, unit: 'per kg', image: 'https://cdn.viva.org.uk/wp-content/uploads/2024/10/Barley.webp' },

  // 🌿 VEGETABLES
  { id: 8, name: 'Tomato', category: 'Vegetables', price: 2.30, unit: 'per kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJE1nmUxtL9Pro_mAqQD4l-UKsbJjqSPapDg&s' },
  { id: 9, name: 'Potato', category: 'Vegetables', price: 1.25, unit: 'per kg', image: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_food_mistakes_slideshow/1800ss_thinkstock_rf_wooden_bowl_potatoes_on_table.jpg?resize=750px:*&output-quality=75' },
  { id: 10, name: 'Onion', category: 'Vegetables', price: 1.60, unit: 'per kg', image: 'https://vegipath.in/wp-content/uploads/2025/02/Main-onion1.jpg' },
  { id: 11, name: 'Cauliflower', category: 'Vegetables', price: 2.75, unit: 'per piece', image: 'https://thriftylesley.com/wp-content/uploads/2013/09/cauliflower.jpg' },
  { id: 12, name: 'Brinjal (Eggplant)', category: 'Vegetables', price: 2.20, unit: 'per kg', image: 'https://images.unsplash.com/photo-1560130839-1b39a4c0b8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 13, name: 'Okra (Lady Finger)', category: 'Vegetables', price: 2.49, unit: 'per kg', image: 'https://images.unsplash.com/photo-1623236772760-3b49c3622cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 14, name: 'Spinach', category: 'Vegetables', price: 2.10, unit: 'per bunch', image: 'https://images.unsplash.com/photo-1628178051792-747f3f156d9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 15, name: 'Cabbage', category: 'Vegetables', price: 1.80, unit: 'per piece', image: 'https://images.unsplash.com/photo-1615486364524-1d00f90e0c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 16, name: 'Carrots', category: 'Vegetables', price: 2.20, unit: 'per kg', image: 'https://images.unsplash.com/photo-1615486364255-04d9c25b6f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 17, name: 'Cucumber', category: 'Vegetables', price: 1.80, unit: 'per kg', image: 'https://images.unsplash.com/photo-1580462499550-0f94b84a21b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 18, name: 'Green Peas', category: 'Vegetables', price: 3.50, unit: 'per kg', image: 'https://images.unsplash.com/photo-1615486364513-b0f7b2f2b1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 19, name: 'Bitter Gourd (Karela)', category: 'Vegetables', price: 2.80, unit: 'per kg', image: 'https://images.unsplash.com/photo-1599058648338-2b44dc6f5b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 20, name: 'Bottle Gourd (Lauki)', category: 'Vegetables', price: 1.70, unit: 'per piece', image: 'https://images.unsplash.com/photo-1631456764754-c5e746b7e4dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 21, name: 'Coriander Leaves', category: 'Herbs', price: 0.50, unit: 'per bunch', image: 'https://images.unsplash.com/photo-1609692814971-65a72a2e9c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 22, name: 'Mint Leaves', category: 'Herbs', price: 0.60, unit: 'per bunch', image: 'https://images.unsplash.com/photo-1615484477999-5b4b64c7c1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },

  // 🍎 FRUITS
  { id: 23, name: 'Mango (Alphonso)', category: 'Fruits', price: 6.99, unit: 'per kg', image: 'https://images.unsplash.com/photo-1622920768133-bc548a3d0b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 24, name: 'Bananas', category: 'Fruits', price: 1.20, unit: 'per dozen', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 25, name: 'Apples', category: 'Fruits', price: 5.50, unit: 'per kg', image: 'https://images.unsplash.com/photo-1571047399553-5c1a63b5c89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 26, name: 'Pomegranates', category: 'Fruits', price: 4.99, unit: 'per kg', image: 'https://images.unsplash.com/photo-1603048297180-2c5f9c1475ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 27, name: 'Papaya', category: 'Fruits', price: 2.10, unit: 'per kg', image: 'https://images.unsplash.com/photo-1571771723080-4be87d0dd53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 28, name: 'Watermelon', category: 'Fruits', price: 0.90, unit: 'per kg', image: 'https://images.unsplash.com/photo-1590080875849-9f8d9a7f63f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 29, name: 'Guava', category: 'Fruits', price: 1.90, unit: 'per kg', image: 'https://images.unsplash.com/photo-1590419894954-21a5160e3bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 30, name: 'Oranges', category: 'Fruits', price: 2.49, unit: 'per kg', image: 'https://images.unsplash.com/photo-1557800636-8c1056a29f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 31, name: 'Pineapple', category: 'Fruits', price: 2.50, unit: 'per piece', image: 'https://images.unsplash.com/photo-1601918774946-badf8b08f6e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 32, name: 'Coconut', category: 'Fruits', price: 1.50, unit: 'per piece', image: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 33, name: 'Litchi', category: 'Fruits', price: 3.75, unit: 'per kg', image: 'https://images.unsplash.com/photo-1622207352542-f59a934fe23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },

  // 🌰 PULSES & OILSEEDS
  { id: 34, name: 'Chickpeas (Bengal Gram)', category: 'Pulses', price: 1.40, unit: 'per kg', image: 'https://images.unsplash.com/photo-1606814228535-73e3fefbedd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 35, name: 'Toor Dal (Pigeon Pea)', category: 'Pulses', price: 1.80, unit: 'per kg', image: 'https://images.unsplash.com/photo-1625484478025-8265cdb8e865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 36, name: 'Moong Dal (Green Gram)', category: 'Pulses', price: 2.00, unit: 'per kg', image: 'https://images.unsplash.com/photo-1606814228535-73e3fefbedd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 37, name: 'Urad Dal (Black Gram)', category: 'Pulses', price: 1.60, unit: 'per kg', image: 'https://images.unsplash.com/photo-1625484478025-8265cdb8e865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 38, name: 'Masoor Dal (Red Lentil)', category: 'Pulses', price: 1.70, unit: 'per kg', image: 'https://images.unsplash.com/photo-1625484478025-8265cdb8e865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 39, name: 'Mustard Seeds', category: 'Oilseeds', price: 3.50, unit: 'per kg', image: 'https://images.unsplash.com/photo-1622207352691-9b8b3d8f6b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 40, name: 'Sesame Seeds (Til)', category: 'Oilseeds', price: 4.25, unit: 'per kg', image: 'https://images.unsplash.com/photo-1615486364333-cd67a9f2ce02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 41, name: 'Groundnuts (Peanuts)', category: 'Oilseeds', price: 1.90, unit: 'per kg', image: 'https://images.unsplash.com/photo-1622207352768-9b2b8b4cc85e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 42, name: 'Soybeans', category: 'Oilseeds', price: 1.75, unit: 'per kg', image: 'https://images.unsplash.com/photo-1625484478025-8265cdb8e865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },

  // 🌶️ SPICES & SPECIALTY CROPS
  { id: 43, name: 'Turmeric Root', category: 'Spices', price: 8.00, unit: 'per kg', image: 'https://images.unsplash.com/photo-1621873492854-46aeb8d2fba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 44, name: 'Cardamom', category: 'Spices', price: 40.00, unit: 'per kg', image: 'https://images.unsplash.com/photo-1607416321413-b9d65dc3c573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 45, name: 'Black Peppercorns', category: 'Spices', price: 15.00, unit: 'per kg', image: 'https://images.unsplash.com/photo-1510257321683-1b9187a7d4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 46, name: 'Cumin Seeds', category: 'Spices', price: 10.50, unit: 'per kg', image: 'https://images.unsplash.com/photo-1589307000230-5e5d73a7fef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 47, name: 'Cloves', category: 'Spices', price: 25.00, unit
: 'per kg', image: 'https://images.unsplash.com/photo-1606814228535-73e3fefbedd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 48, name: 'Cinnamon Sticks', category: 'Spices', price: 30.00, unit: 'per kg', image: 'https://images.unsplash.com/photo-1606814228535-73e3fefbedd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 49, name: 'Saffron', category: 'Spices', price: 300.00, unit: 'per 100g', image: 'https://images.unsplash.com/photo-1606814228535-73e3fefbedd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];  

export default CropData;