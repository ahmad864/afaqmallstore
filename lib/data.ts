export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  stock: number
  totalPurchased: number
  totalSold: number
  rating: number
}

export type CategorySlug = "clothing" | "shoes" | "electronics" | "makeup" | "furniture" | "food"

export const CATEGORIES: { slug: CategorySlug; name: string }[] = [
  { slug: "clothing", name: "Clothing" },
  { slug: "shoes", name: "Shoes" },
  { slug: "electronics", name: "Electronics" },
  { slug: "makeup", name: "Makeup" },
  { slug: "furniture", name: "Furniture" },
  { slug: "food", name: "Food" },
]

export const categoryNames: Record<CategorySlug, string> = {
  clothing: "Clothing",
  shoes: "Shoes",
  electronics: "Electronics",
  makeup: "Makeup",
  furniture: "Furniture",
  food: "Food",
}

// Curated product images from Unsplash for each category - unique per product
const categoryImages: Record<CategorySlug, string[]> = {
  clothing: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", // Classic White T-Shirt
    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop", // Slim Fit Jeans
    "https://images.unsplash.com/photo-1625910513413-5fc421e0b6cd?w=400&h=400&fit=crop", // Cotton Polo Shirt
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop", // Wool Sweater
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", // Leather Jacket
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop", // Formal Dress Shirt
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", // Linen Summer Pants
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop", // Denim Jacket
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", // Casual Hoodie
    "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=400&fit=crop", // Silk Blouse
    "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&h=400&fit=crop", // Cargo Pants
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop", // Striped Blazer
    "https://images.unsplash.com/photo-1503341504253-dff4f8e20735?w=400&h=400&fit=crop", // Graphic Tee
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", // Chino Shorts
    "https://images.unsplash.com/photo-1434389677669-e08b4cda3a38?w=400&h=400&fit=crop", // Cashmere Cardigan
    "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400&h=400&fit=crop", // Flannel Shirt
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop", // Maxi Dress
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop", // Tailored Suit Jacket
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop", // Jogger Pants
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop", // Turtleneck Sweater
    "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=400&h=400&fit=crop", // Raincoat
    "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=400&fit=crop", // Puffer Vest
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop", // Corduroy Pants
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", // Hawaiian Shirt
    "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop", // Pleated Skirt
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=400&fit=crop", // Denim Overalls
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop", // V-Neck Tee
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop", // Bomber Jacket
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop", // Wide Leg Trousers
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop", // Knit Beanie Set
  ],
  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", // Running Sneakers
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop", // Leather Oxford Shoes
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop", // Canvas Slip-Ons
    "https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=400&h=400&fit=crop", // Hiking Boots
    "https://images.unsplash.com/photo-1614252234498-f0b70372292a?w=400&h=400&fit=crop", // Classic Loafers
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop", // High-Top Sneakers
    "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop", // Suede Chelsea Boots
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop", // Sports Sandals
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop", // Formal Derby Shoes
    "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400&h=400&fit=crop", // Basketball Shoes
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop", // Ankle Boots
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop", // Espadrilles
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop", // Platform Sneakers
    "https://images.unsplash.com/photo-1616406432452-07bc5938b381?w=400&h=400&fit=crop", // Moccasins
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", // Trail Running Shoes
    "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&h=400&fit=crop", // Boat Shoes
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop", // Combat Boots
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop", // Minimalist Sneakers
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&q=80", // Wedge Sandals
    "https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?w=400&h=400&fit=crop", // Driving Shoes
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop", // Cross-Training Shoes
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", // Monk Strap Shoes
    "https://images.unsplash.com/photo-1635436338828-9e8a868e5951?w=400&h=400&fit=crop", // Rain Boots
    "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400&h=400&fit=crop", // Skate Shoes
    "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=400&fit=crop", // Gladiator Sandals
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop", // Brogue Shoes
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop", // Slip-On Mules
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop", // Retro Trainers
    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop", // Desert Boots
    "https://images.unsplash.com/photo-1531185038189-41815d864f32?w=400&h=400&fit=crop", // Leather Flip Flops
  ],
  electronics: [
    "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop", // Wireless Earbuds
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", // Bluetooth Speaker
    "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop", // Smart Watch
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", // Tablet 10 inch
    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop", // Mechanical Keyboard
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", // Wireless Mouse
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop", // USB-C Hub
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", // Portable Charger
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop", // Action Camera
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop", // E-Reader
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", // Noise Cancelling Headphones
    "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop", // Smart Home Hub
    "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop", // Webcam HD
    "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop", // Drone Mini
    "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop", // Gaming Controller
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop", // Fitness Tracker
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop", // Portable SSD 1TB
    "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop", // LED Desk Lamp
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", // Smart Plug Set
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop", // Digital Photo Frame
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&q=80", // Streaming Stick
    "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&h=400&fit=crop", // Car Dash Camera
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop&q=80", // Robot Vacuum
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop", // Air Purifier
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop", // Smart Doorbell
    "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&h=400&fit=crop", // Wireless Charger Pad
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop", // Portable Projector
    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=400&fit=crop", // VR Headset
    "https://images.unsplash.com/photo-1559163499-413811fb2344?w=400&h=400&fit=crop", // Electric Toothbrush
    "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop", // Smart Scale
  ],
  makeup: [
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", // Matte Lipstick Set
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", // Foundation SPF 30
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop", // Eyeshadow Palette
    "https://images.unsplash.com/photo-1631214540553-ff44137abaa1?w=400&h=400&fit=crop", // Mascara Waterproof
    "https://images.unsplash.com/photo-1599733589146-1b3014e0ef47?w=400&h=400&fit=crop", // Setting Powder
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", // Blush Duo
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", // Primer Hydrating
    "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop", // Concealer Stick
    "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&h=400&fit=crop", // Brow Pencil
    "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop", // Lip Gloss Pack
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", // Contour Kit
    "https://images.unsplash.com/photo-1583241801134-4b4393d53e7f?w=400&h=400&fit=crop", // Highlighter Palette
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80", // Makeup Brush Set
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop", // Micellar Cleansing Water
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop", // BB Cream
    "https://images.unsplash.com/photo-1590156206657-89de4b23c712?w=400&h=400&fit=crop", // Eyeliner Liquid
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop", // Face Mist Spray
    "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop", // Makeup Sponge Set
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&q=80", // Lip Liner Collection
    "https://images.unsplash.com/photo-1599733594230-8dabe029aefb?w=400&h=400&fit=crop", // Bronzer Powder
    "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400&h=400&fit=crop", // Eye Cream
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", // Facial Serum
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop", // Sheet Mask Pack
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop", // Tinted Moisturizer
    "https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=400&h=400&fit=crop", // Setting Spray
    "https://images.unsplash.com/photo-1588006203159-3d09dcbb644e?w=400&h=400&fit=crop", // Nude Lipstick Trio
    "https://images.unsplash.com/photo-1590156206657-89de4b23c712?w=400&h=400&fit=crop&q=80", // Gel Eyeliner
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&q=80", // Vitamin C Serum
    "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400&h=400&fit=crop", // Night Cream
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop", // Makeup Remover Balm
  ],
  furniture: [
    "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop", // Ergonomic Office Chair
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop", // Standing Desk
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", // 3-Seat Sofa
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop", // Coffee Table
    "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop", // Bookshelf 5-Tier
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop", // Dining Table Set
    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop", // Bedside Nightstand
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop", // Wardrobe Cabinet
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=400&fit=crop", // TV Stand Modern
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop", // Bar Stool Set
    "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=400&h=400&fit=crop", // Floating Wall Shelf
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop", // Shoe Rack
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", // Kitchen Island Cart
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop", // Accent Armchair
    "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop&q=80", // Desk Lamp with Shelf
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop", // Outdoor Bench
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=400&fit=crop", // Storage Ottoman
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop", // Console Table
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop", // Bed Frame Queen
    "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop", // Vanity Mirror Table
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop&q=80", // Corner Desk
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop", // Recliner Chair
    "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400&h=400&fit=crop", // Side Table Set
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400&h=400&fit=crop", // Coat Rack Stand
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop&q=90", // Wine Rack Cabinet
    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop&q=80", // Nesting Tables Set
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=400&fit=crop", // Patio Lounge Chair
    "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&h=400&fit=crop", // Kids Study Desk
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&q=80", // Bean Bag Chair
    "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&h=400&fit=crop", // Entryway Bench
  ],
  food: [
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", // Organic Honey Jar
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", // Extra Virgin Olive Oil
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop", // Dark Chocolate Bar
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop", // Mixed Nuts Premium
    "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=400&fit=crop", // Green Tea Collection
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop", // Dried Fruit Mix
    "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=400&h=400&fit=crop", // Protein Granola
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", // Quinoa Grain Pack
    "https://images.unsplash.com/photo-1612187209234-3e8f771ca0fb?w=400&h=400&fit=crop", // Almond Butter
    "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop", // Coconut Water Pack
    "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=400&h=400&fit=crop", // Chia Seeds
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80", // Basmati Rice
    "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=400&fit=crop", // Instant Oatmeal
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop", // Maple Syrup Pure
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", // Coffee Beans 1kg
    "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=400&fit=crop", // Organic Pasta Pack
    "https://images.unsplash.com/photo-1518110925495-5fe2c8e6a5db?w=400&h=400&fit=crop", // Himalayan Pink Salt
    "https://images.unsplash.com/photo-1611575710253-aa3c54e14f69?w=400&h=400&fit=crop", // Avocado Oil
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop&q=80", // Trail Mix Snack
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop", // Herbal Tea Sampler
    "https://images.unsplash.com/photo-1612187209234-3e8f771ca0fb?w=400&h=400&fit=crop&q=80", // Peanut Butter Crunchy
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", // Rice Crackers
    "https://images.unsplash.com/photo-1622484211148-971a16293e7f?w=400&h=400&fit=crop", // Protein Bars Pack
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop", // Saffron Premium Grade
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80", // Balsamic Vinegar
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop", // Whole Wheat Flour
    "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop", // Matcha Powder
    "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop", // Tahini Paste
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80", // Manuka Honey
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80", // Gourmet Spice Set
  ],
}

function img(category: CategorySlug, idx: number) {
  const images = categoryImages[category]
  return images[idx] || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop`
}

function generateProducts(category: CategorySlug, startId: number): Product[] {
  const data: Record<CategorySlug, string[]> = {
    clothing: [
      "Classic White T-Shirt", "Slim Fit Jeans", "Cotton Polo Shirt", "Wool Sweater",
      "Leather Jacket", "Formal Dress Shirt", "Linen Summer Pants", "Denim Jacket",
      "Casual Hoodie", "Silk Blouse", "Cargo Pants", "Striped Blazer",
      "Graphic Tee", "Chino Shorts", "Cashmere Cardigan", "Flannel Shirt",
      "Maxi Dress", "Tailored Suit Jacket", "Jogger Pants", "Turtleneck Sweater",
      "Raincoat", "Puffer Vest", "Corduroy Pants", "Hawaiian Shirt",
      "Pleated Skirt", "Denim Overalls", "V-Neck Tee", "Bomber Jacket",
      "Wide Leg Trousers", "Knit Beanie Set",
    ],
    shoes: [
      "Running Sneakers", "Leather Oxford Shoes", "Canvas Slip-Ons", "Hiking Boots",
      "Classic Loafers", "High-Top Sneakers", "Suede Chelsea Boots", "Sports Sandals",
      "Formal Derby Shoes", "Basketball Shoes", "Ankle Boots", "Espadrilles",
      "Platform Sneakers", "Moccasins", "Trail Running Shoes", "Boat Shoes",
      "Combat Boots", "Minimalist Sneakers", "Wedge Sandals", "Driving Shoes",
      "Cross-Training Shoes", "Monk Strap Shoes", "Rain Boots", "Skate Shoes",
      "Gladiator Sandals", "Brogue Shoes", "Slip-On Mules", "Retro Trainers",
      "Desert Boots", "Leather Flip Flops",
    ],
    electronics: [
      "Wireless Earbuds", "Bluetooth Speaker", "Smart Watch", "Tablet 10 inch",
      "Mechanical Keyboard", "Wireless Mouse", "USB-C Hub", "Portable Charger",
      "Action Camera", "E-Reader", "Noise Cancelling Headphones", "Smart Home Hub",
      "Webcam HD", "Drone Mini", "Gaming Controller", "Fitness Tracker",
      "Portable SSD 1TB", "LED Desk Lamp", "Smart Plug Set", "Digital Photo Frame",
      "Streaming Stick", "Car Dash Camera", "Robot Vacuum", "Air Purifier",
      "Smart Doorbell", "Wireless Charger Pad", "Portable Projector", "VR Headset",
      "Electric Toothbrush", "Smart Scale",
    ],
    makeup: [
      "Matte Lipstick Set", "Foundation SPF 30", "Eyeshadow Palette 12 Colors",
      "Mascara Waterproof", "Setting Powder", "Blush Duo", "Primer Hydrating",
      "Concealer Stick", "Brow Pencil", "Lip Gloss Pack", "Contour Kit",
      "Highlighter Palette", "Makeup Brush Set 12pcs", "Micellar Cleansing Water",
      "BB Cream", "Eyeliner Liquid", "Face Mist Spray", "Makeup Sponge Set",
      "Lip Liner Collection", "Bronzer Powder", "Eye Cream", "Facial Serum",
      "Sheet Mask Pack 10", "Tinted Moisturizer", "Setting Spray",
      "Nude Lipstick Trio", "Gel Eyeliner", "Vitamin C Serum", "Night Cream",
      "Makeup Remover Balm",
    ],
    furniture: [
      "Ergonomic Office Chair", "Standing Desk", "3-Seat Sofa", "Coffee Table",
      "Bookshelf 5-Tier", "Dining Table Set", "Bedside Nightstand", "Wardrobe Cabinet",
      "TV Stand Modern", "Bar Stool Set of 2", "Floating Wall Shelf", "Shoe Rack",
      "Kitchen Island Cart", "Accent Armchair", "Desk Lamp with Shelf", "Outdoor Bench",
      "Storage Ottoman", "Console Table", "Bed Frame Queen", "Vanity Mirror Table",
      "Corner Desk", "Recliner Chair", "Side Table Set", "Coat Rack Stand",
      "Wine Rack Cabinet", "Nesting Tables Set", "Patio Lounge Chair", "Kids Study Desk",
      "Bean Bag Chair", "Entryway Bench",
    ],
    food: [
      "Organic Honey Jar", "Extra Virgin Olive Oil", "Dark Chocolate Bar 85%",
      "Mixed Nuts Premium", "Green Tea Collection", "Dried Fruit Mix", "Protein Granola",
      "Quinoa Grain Pack", "Almond Butter", "Coconut Water Pack 12", "Chia Seeds",
      "Basmati Rice 5kg", "Instant Oatmeal Variety", "Maple Syrup Pure", "Coffee Beans 1kg",
      "Organic Pasta Pack", "Himalayan Pink Salt", "Avocado Oil", "Trail Mix Snack",
      "Herbal Tea Sampler", "Peanut Butter Crunchy", "Rice Crackers", "Protein Bars Pack 12",
      "Saffron Premium Grade", "Balsamic Vinegar", "Whole Wheat Flour", "Matcha Powder",
      "Tahini Paste", "Manuka Honey", "Gourmet Spice Set",
    ],
  }

  const priceRanges: Record<CategorySlug, [number, number]> = {
    clothing: [15, 250],
    shoes: [30, 300],
    electronics: [20, 500],
    makeup: [8, 80],
    furniture: [50, 800],
    food: [5, 60],
  }

  const names = data[category]
  const [minP, maxP] = priceRanges[category]

  return names.map((name, i) => {
    const price = Math.round(minP + (Math.random() * (maxP - minP)))
    const stock = Math.floor(Math.random() * 50) + 1
    const totalPurchased = Math.floor(Math.random() * 200) + 10
    const totalSold = Math.floor(Math.random() * totalPurchased)
    const rating = Math.round((3 + Math.random() * 2) * 10) / 10 // 3.0 - 5.0
    return {
      id: startId + i,
      name,
      price,
      image: img(category, i),
      category,
      stock,
      totalPurchased,
      totalSold,
      rating,
    }
  })
}

// Generate all 180 products
export const allProducts: Product[] = [
  ...generateProducts("clothing", 1000),
  ...generateProducts("shoes", 2000),
  ...generateProducts("electronics", 3000),
  ...generateProducts("makeup", 4000),
  ...generateProducts("furniture", 5000),
  ...generateProducts("food", 6000),
]

export function getProductsByCategory(slug: string): Product[] {
  return allProducts.filter((p) => p.category === slug)
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id)
}

export function getProductCountByCategory(slug: string): number {
  return allProducts.filter((p) => p.category === slug).length
}
