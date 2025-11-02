import React from "react";

const CropData = [
  // 🌾 GRAINS & CEREALS

  { id: 1, name: 'Basmati Rice', category: 'Grains', price: 120, unit: '₹ per kg', image: 'https://cpimg.tistatic.com/11014135/b/4/Indian-Basmati-Rice..jpg' },
  { id: 2, name: 'Wheat Grain', category: 'Grains', price: 28, unit: '₹ per kg', image: 'https://goodineverygrain.ca/wp-content/uploads/2021/06/wheat-berries-bowl.png' },
  { id: 3, name: 'Jowar (Sorghum)', category: 'Grains', price: 35, unit: '₹ per kg', image: 'https://static.toiimg.com/thumb/msid-66847765,width-1280,height-720,resizemode-4/66847765.jpg' },
  { id: 4, name: 'Bajra (Pearl Millet)', category: 'Grains', price: 30, unit: '₹ per kg', image: 'https://www.shutterstock.com/image-photo/closeup-pile-dry-bajra-pearl-600nw-2493219333.jpg' },
  { id: 5, name: 'Maize (Corn)', category: 'Grains', price: 25, unit: '₹ per kg', image: 'https://foodieng.com/wp-content/uploads/2022/05/yellow-maiz.jpg' },
  { id: 6, name: 'Ragi (Finger Millet)', category: 'Grains', price: 40, unit: '₹ per kg', image: 'https://doctorrekha.com/wp-content/uploads/2023/10/rag.png' },
  { id: 7, name: 'Barley', category: 'Grains', price: 32, unit: '₹ per kg', image: 'https://cdn.viva.org.uk/wp-content/uploads/2024/10/Barley.webp' },

  // 🌿 VEGETABLES
  { id: 8, name: 'Tomato', category: 'Vegetables', price: 25, unit: 'per kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJE1nmUxtL9Pro_mAqQD4l-UKsbJjqSPapDg&s' },
  { id: 9, name: 'Potato', category: 'Vegetables', price: 22, unit: 'per kg', image: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healthy_food_mistakes_slideshow/1800ss_thinkstock_rf_wooden_bowl_potatoes_on_table.jpg?resize=750px:*&output-quality=75' },
  { id: 10, name: 'Onion', category: 'Vegetables', price: 1.60, unit: 'per kg', image: 'https://vegipath.in/wp-content/uploads/2025/02/Main-onion1.jpg' },
  { id: 11, name: 'Cauliflower', category: 'Vegetables', price: 2.75, unit: 'per piece', image: 'https://thriftylesley.com/wp-content/uploads/2013/09/cauliflower.jpg' },
  { id: 12, name: 'Brinjal (Eggplant)', category: 'Vegetables', price: 2.20, unit: 'per kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1rM1X0aULTAvz_Q7HYUbCd2fIgl9jMFRhA&s' },
  { id: 13, name: 'Okra (Lady Finger)', category: 'Vegetables', price: 2.49, unit: 'per kg', image: 'https://images.jdmagicbox.com/quickquotes/images_main/ladies-finger-2034252462-5rom6k3e.jpg' },
  { id: 14, name: 'Spinach', category: 'Vegetables', price: 2.10, unit: 'per bunch', image: 'https://c.ndtvimg.com/2022-01/lkd3ua2g_spinach_625x300_31_January_22.jpg' },
  { id: 15, name: 'Cabbage', category: 'Vegetables', price: 1.80, unit: 'per piece', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDUN5SUsLMUAupeWKUS6iw_q_0fMGv6EPSg&s' },
  { id: 16, name: 'Carrots', category: 'Vegetables', price: 2.20, unit: 'per kg', image: 'https://www.trustbasket.com/cdn/shop/articles/Carrot.jpg?v=1688378789' },
  { id: 17, name: 'Cucumber', category: 'Vegetables', price: 1.80, unit: 'per kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9od4vDwkphzVCCljEyn6WBvKIy91v_lSdA&s' },
  { id: 18, name: 'Green Peas', category: 'Vegetables', price: 3.50, unit: 'per kg', image: 'https://cdn-ilbieip.nitrocdn.com/xqwDdPehmVtcySpgjQnaFLFbBZtNqOso/assets/images/optimized/rev-1562a4e/www.harvst.co.uk/wp-content/uploads/2022/05/peas-scaled.jpeg' },
  { id: 19, name: 'Bitter Gourd (Karela)', category: 'Vegetables', price: 2.80, unit: 'per kg', image: 'https://www.trustbasket.com/cdn/shop/articles/Bittergourd.webp?v=1687165171' },
  { id: 20, name: 'Bottle Gourd (Lauki)', category: 'Vegetables', price: 1.70, unit: 'per piece', image: 'https://m.media-amazon.com/images/I/51Uap7NMPnL._AC_UF1000,1000_QL80_.jpg' },
  { id: 21, name: 'Coriander Leaves', category: 'Herbs', price: 0.50, unit: 'per bunch', image: 'https://seedsnpots.com/wp-content/uploads/2017/10/coriander.jpg' },
  { id: 22, name: 'Mint Leaves', category: 'Herbs', price: 0.60, unit: 'per bunch', image: 'https://www.jiomart.com/images/product/original/590000532/mint-leaves-1-bunch-approx-80-g-130-g-product-images-o590000532-p590000532-0-202506101652.jpg?im=Resize=(1000,1000)' },

  // 🍎 FRUITS
  { id: 23, name: 'Mango (Alphonso)', category: 'Fruits', price: 6.99, unit: 'per kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkjG-19CTFIEd_FuauH8y4A1S2cZugQges4g&s' },
  { id: 24, name: 'Bananas', category: 'Fruits', price: 1.20, unit: 'per dozen', image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920-1024x683.jpg' },
  { id: 25, name: 'Apples', category: 'Fruits', price: 5.50, unit: 'per kg', image: 'https://assets.clevelandclinic.org/transform/LargeFeatureImage/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg' },
  { id: 26, name: 'Pomegranates', category: 'Fruits', price: 4.99, unit: 'per kg', image: 'https://toneopeats.com/_next/image?url=https%3A%2F%2Ftoneopeats-strapi-prod.s3.ap-south-1.amazonaws.com%2FPomegranate_Benefits_1c9932b0cc.jpg&w=1920&q=75' },
  { id: 27, name: 'Papaya', category: 'Fruits', price: 2.10, unit: 'per kg', image: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/other/papaya_and_mango_other/1800x1200_papaya_and_mango_other.jpg?resize=750px:*&output-quality=75' },
  { id: 28, name: 'Watermelon', category: 'Fruits', price: 0.90, unit: 'per kg', image: 'https://cdn.prod.website-files.com/63ed08484c069d0492f5b0bc/654152ab447a269cd2b3b4e9_6373b362b83b3552c43c4bdc_633611cb47a532196afa9e97_watermelon-weight-loss-hero.jpeg' },
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