/**
 * TractorHub - Data Store & Catalog
 * Comprehensive database of Tractor Spare Parts, Brands, Categories, Coupons and Reviews.
 */

const TRACTOR_BRANDS = [
  {
    id: "mahindra",
    name: "Mahindra",
    logo: "🚜",
    origin: "India",
    models: ["575 DI", "475 DI", "Arjun 555 DI", "Yuvo 575 DI", "Jivo 245 DI", "NOVO 605 DI-PS"],
    badgeColor: "#d92525",
    description: "India's #1 selling tractor brand, built for tough Indian agricultural terrains."
  },
  {
    id: "john-deere",
    name: "John Deere",
    logo: "🦌",
    origin: "USA / India",
    models: ["5050 D", "5310", "5105", "5045 D", "5210 GearPro", "5405 4WD"],
    badgeColor: "#367c2b",
    description: "Global standard in high-tech agricultural machinery and fuel-efficient performance."
  },
  {
    id: "swaraj",
    name: "Swaraj",
    logo: "🌾",
    origin: "India",
    models: ["744 FE", "855 FE", "735 FE", "963 FE", "742 FE", "843 XM"],
    badgeColor: "#1d4ed8",
    description: "Pioneering indigenous Indian tractor brand renowned for raw pulling power."
  },
  {
    id: "tafe",
    name: "TAFE",
    logo: "⚙️",
    origin: "India",
    models: ["45 DI", "5900 DI", "35 DI", "30 DI Orchard Plus", "DynaTrack 241"],
    badgeColor: "#b91c1c",
    description: "Tractors and Farm Equipment Limited - trusted for durability and low maintenance."
  },
  {
    id: "sonalika",
    name: "Sonalika",
    logo: "⚡",
    origin: "India",
    models: ["DI 745 III", "DI 60 Sikander", "DI 35", "Tiger DI 75", "DI 50 RX"],
    badgeColor: "#ea580c",
    description: "Heavy-duty performance with modern styling and international technology."
  },
  {
    id: "new-holland",
    name: "New Holland",
    logo: "🔷",
    origin: "Italy / India",
    models: ["3630 TX Plus", "3230 NX", "3600-2 TX", "Excel 4710", "5620 Tx Plus"],
    badgeColor: "#0284c7",
    description: "Advanced hydraulic capabilities, operator comfort and fuel efficiency."
  },
  {
    id: "massey-ferguson",
    name: "Massey Ferguson",
    logo: "🔺",
    origin: "Global / TAFE",
    models: ["241 DI Maha Shakti", "1035 DI", "245 DI", "9500 2WD/4WD", "7250 Power Up"],
    badgeColor: "#dc2626",
    description: "Legendary red tractors engineered for unmatched torque and soil preparation."
  },
  {
    id: "farmtrac",
    name: "Farmtrac",
    logo: "🐎",
    origin: "India (Escorts)",
    models: ["60 Powermaxx", "45 Classic", "6055 Powermaxx", "Atom 26", "Executive 60"],
    badgeColor: "#0f766e",
    description: "Escorts flagship power tractors engineered for multi-speed hauling and tilling."
  }
];

const PRODUCT_CATEGORIES = [
  {
    id: "engine-parts",
    name: "Engine Parts",
    icon: "⚙️",
    description: "Pistons, liners, water pumps, fuel injection components & engine repair kits.",
    itemCount: 142
  },
  {
    id: "clutch-parts",
    name: "Clutch Parts",
    icon: "🔄",
    description: "Ceramic clutch plates, pressure plates, release bearings and flywheels.",
    itemCount: 88
  },
  {
    id: "brake-parts",
    name: "Brake Parts",
    icon: "🛑",
    description: "Oil-immersed brake discs, brake shoes, master cylinders and linkages.",
    itemCount: 95
  },
  {
    id: "hydraulic-parts",
    name: "Hydraulic Parts",
    icon: "💧",
    description: "Tractor hydraulic pumps, distributor valves, lift arms, rams and high-pressure hoses.",
    itemCount: 110
  },
  {
    id: "electrical-parts",
    name: "Electrical Parts",
    icon: "⚡",
    description: "Starter motors, heavy alternators, LED headlights, switches, glow plugs and batteries.",
    itemCount: 130
  },
  {
    id: "transmission-parts",
    name: "Transmission Parts",
    icon: "🔀",
    description: "Crown wheels, pinions, differential locks, gear shift forks and PTO assemblies.",
    itemCount: 76
  },
  {
    id: "steering-parts",
    name: "Steering Parts",
    icon: "🎯",
    description: "Power steering cylinders, orbitrol valves, tie rod ends, and steering wheels.",
    itemCount: 64
  },
  {
    id: "filters",
    name: "Filters",
    icon: "🌪️",
    description: "Heavy-duty engine oil filters, primary & secondary fuel filters, and cyclone air filters.",
    itemCount: 156
  },
  {
    id: "belts",
    name: "Belts",
    icon: "➰",
    description: "Raw-edge cogged fan belts, alternator drive belts and hydraulic V-belts.",
    itemCount: 52
  },
  {
    id: "tyres-tubes",
    name: "Tyres & Tubes",
    icon: "🛞",
    description: "Deep-lug rear agricultural tyres, ribbed front tyres and heavy-duty butly tubes.",
    itemCount: 45
  },
  {
    id: "radiators",
    name: "Radiators",
    icon: "❄️",
    description: "Multi-row heavy copper radiators, aluminum core assemblies, caps and cooling fans.",
    itemCount: 38
  },
  {
    id: "tractor-accessories",
    name: "Tractor Accessories",
    icon: "💺",
    description: "Deluxe suspension seats, heavy drawbars, bumper hitch, canopy & exhaust silencers.",
    itemCount: 84
  }
];

const INITIAL_PRODUCTS = [
  {
    id: "TH-PRD-101",
    name: "Heavy-Duty Spin-On Engine Oil Filter",
    category: "filters",
    brand: "mahindra",
    compatibleModels: ["Mahindra 575 DI", "Mahindra 475 DI", "Mahindra Arjun 555 DI", "Swaraj 744 FE"],
    price: 380,
    originalPrice: 520,
    rating: 4.8,
    reviewsCount: 184,
    oemNumber: "005553106R92",
    stock: 45,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    description: "Engineered with micro-fiber dual-stage filtration medium that captures soot, carbon deposits and microscopic metal particles up to 10 microns. Ensures smooth lubrication and extends tractor engine lifespan under grueling farm conditions.",
    specs: {
      "Filter Type": "Full-Flow Spin-On",
      "Filtration Efficiency": "99.4% @ 10 Micron",
      "Burst Pressure": "20 Bar (290 PSI)",
      "Thread Size": "3/4\"-16 UNF",
      "Warranty": "6 Months OEM Replacement"
    }
  },
  {
    id: "TH-PRD-102",
    name: "Dual-Stage Heavy Cyclone Air Filter Assembly",
    category: "filters",
    brand: "john-deere",
    compatibleModels: ["John Deere 5050 D", "John Deere 5310", "John Deere 5105", "Farmtrac 60"],
    price: 980,
    originalPrice: 1350,
    rating: 4.9,
    reviewsCount: 210,
    oemNumber: "AL202104-JD",
    stock: 28,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    description: "High-capacity air cleaning element with self-cleaning cyclonic pre-filter chamber. Shields your engine combustion chambers from sand, crop chaff and heavy dust during threshing and dry-land tilling.",
    specs: {
      "Element Material": "Flame-Retardant Pleated Cellulose",
      "Outer Housing": "Impact Polypropylene",
      "Airflow Rate": "140 CFM",
      "Inner Safety Core": "Included",
      "Warranty": "12 Months Warranty"
    }
  },
  {
    id: "TH-PRD-103",
    name: "Spin-On Primary Diesel Fuel Filter Assembly",
    category: "filters",
    brand: "swaraj",
    compatibleModels: ["Swaraj 744 FE", "Swaraj 855 FE", "Swaraj 735 FE", "TAFE 45 DI"],
    price: 340,
    originalPrice: 470,
    rating: 4.7,
    reviewsCount: 96,
    oemNumber: "F-189201-SW",
    stock: 62,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    description: "High-grade fuel water separator filter that traps water droplets and particulate matter from commercial diesel. Protects sensitive fuel injectors and high-pressure pumps from premature corrosion.",
    specs: {
      "Media": "Water-Repellent Silicone Coated",
      "Drain Valve": "Self-Venting Bottom Cock",
      "Operating Pressure": "5 Bar",
      "Service Life": "300 Engine Hours",
      "Warranty": "6 Months OEM"
    }
  },
  {
    id: "TH-PRD-104",
    name: "Ceramic-Metallic Heavy Duty Clutch Plate (280mm)",
    category: "clutch-parts",
    brand: "mahindra",
    compatibleModels: ["Mahindra Arjun 555 DI", "Mahindra 575 DI", "Sonalika DI 745 III"],
    price: 3450,
    originalPrice: 4600,
    rating: 4.9,
    reviewsCount: 142,
    oemNumber: "CP-280-MHD-09",
    stock: 19,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    description: "Premium copper-ceramic button paddle clutch disc built to withstand extreme torque when pulling rotavators, laser levellers and heavily loaded cane trolleys without slippage or burn-out.",
    specs: {
      "Diameter": "280 mm (11 Inch)",
      "Spline Count": "10 Splines",
      "Facing Type": "Heavy Cerametallic Buttons (8 Pads)",
      "Spring Damper": "Torsion Dampening 6 Heavy Springs",
      "Warranty": "1 Year Replacement Warranty"
    }
  },
  {
    id: "TH-PRD-105",
    name: "Oil-Immersed Heavy Duty Brake Shoe Set",
    category: "brake-parts",
    brand: "massey-ferguson",
    compatibleModels: ["Massey Ferguson 241 DI", "Massey Ferguson 1035 DI", "TAFE 45 DI"],
    price: 1250,
    originalPrice: 1750,
    rating: 4.6,
    reviewsCount: 78,
    oemNumber: "BS-MF-241-OEM",
    stock: 34,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    description: "Asbestos-free premium composite brake shoes designed for oil-submerged brake drums. Delivers instant stopping power with zero fade even when descending steep slopes with full trailer loads.",
    specs: {
      "Material": "Organic High-Friction Matrix",
      "Compatibility": "Wet/Dry Multi-Plate Systems",
      "Set Contents": "2 Pairs (Left & Right Wheels)",
      "Thermal Resistance": "Up to 450°C",
      "Warranty": "6 Months Warranty"
    }
  },
  {
    id: "TH-PRD-106",
    name: "High-Carbon Sintered Brake Disc Friction Plate",
    category: "brake-parts",
    brand: "new-holland",
    compatibleModels: ["New Holland 3630 TX Plus", "New Holland 3230 NX", "Farmtrac 60 Powermaxx"],
    price: 890,
    originalPrice: 1200,
    rating: 4.8,
    reviewsCount: 63,
    oemNumber: "BD-NH-3630-X",
    stock: 24,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    description: "Laser-cut sintered friction plate offering uniform torque distribution, noiseless braking in wet mud, and maximum wear resistance for commercial haulage tractors.",
    specs: {
      "Diameter": "224 mm",
      "Teeth/Spline": "Internal 32-Teeth Spline",
      "Facing": "Graphite-Infused Sintered Bronze",
      "Warranty": "12 Months Warranty"
    }
  },
  {
    id: "TH-PRD-107",
    name: "High-Pressure Hydraulic Tandem Gear Pump 16 GPM",
    category: "hydraulic-parts",
    brand: "sonalika",
    compatibleModels: ["Sonalika DI 60 Sikander", "Sonalika DI 745 III", "Mahindra NOVO 605 DI"],
    price: 6800,
    originalPrice: 8999,
    rating: 4.9,
    reviewsCount: 112,
    oemNumber: "HYD-PUMP-SON-16",
    stock: 14,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty cast iron hydraulic pump capable of handling 210 Bar system pressure. Guarantees swift implement lifting response for rotavator, reversible plough, and heavy loader attachments.",
    specs: {
      "Flow Capacity": "16 GPM @ 2000 RPM",
      "Max Operating Pressure": "210 Bar (3050 PSI)",
      "Body Material": "High-Grade Ductile Cast Iron",
      "Rotation": "Clockwise (CW)",
      "Warranty": "18 Months Replacement Warranty"
    }
  },
  {
    id: "TH-PRD-108",
    name: "Reinforced 2-Wire Braid High-Pressure Hydraulic Hose (1.5m)",
    category: "hydraulic-parts",
    brand: "tafe",
    compatibleModels: ["TAFE 45 DI", "TAFE 5900 DI", "Massey Ferguson 241 DI", "John Deere 5050 D"],
    price: 650,
    originalPrice: 950,
    rating: 4.7,
    reviewsCount: 89,
    oemNumber: "HOSE-HYD-2SN-15",
    stock: 40,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    description: "Synthetic rubber hydraulic hose reinforced with 2 high-tensile steel wire braids. Resists petroleum fluids, ozone, abrasion and pressure spikes during continuous loader operation.",
    specs: {
      "Length": "1.5 Meters (5 Feet)",
      "Internal Diameter": "1/2\" (12.7 mm)",
      "Working Pressure": "275 Bar (4000 PSI)",
      "End Fittings": "BSP Swivel Female with O-Ring",
      "Warranty": "6 Months Warranty"
    }
  },
  {
    id: "TH-PRD-109",
    name: "Heavy-Duty 12V 88Ah Commercial Tractor Battery",
    category: "electrical-parts",
    brand: "swaraj",
    compatibleModels: ["Swaraj 855 FE", "Swaraj 744 FE", "Mahindra Arjun 555 DI", "New Holland 3630 TX"],
    price: 6499,
    originalPrice: 8200,
    rating: 4.9,
    reviewsCount: 245,
    oemNumber: "BAT-AGRI-88AH-HD",
    stock: 18,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1620986790518-e3952d7ee81a?auto=format&fit=crop&w=600&q=80",
    description: "Factory-charged rugged battery equipped with thick lead-calcium plates and vibration-resistant container. Delivers monster cold cranking power for instant ignition in harsh winter mornings.",
    specs: {
      "Voltage / Capacity": "12V, 88 Ah @ 20Hr",
      "Cold Cranking Amps (CCA)": "680 A",
      "Terminal Type": "Heavy Lead Stud Post",
      "Electrolyte": "Spill-Proof Acid Sealed",
      "Warranty": "36 Months Pro-Rata Warranty"
    }
  },
  {
    id: "TH-PRD-110",
    name: "Ultra-Bright LED Projector Headlight Set (Pair)",
    category: "electrical-parts",
    brand: "farmtrac",
    compatibleModels: ["Farmtrac 60 Powermaxx", "Farmtrac 45", "Sonalika DI 60", "Mahindra 575 DI"],
    price: 1550,
    originalPrice: 2100,
    rating: 4.8,
    reviewsCount: 167,
    oemNumber: "HL-LED-PROJ-PAIR",
    stock: 31,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: true,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
    description: "IP68 waterproof twin projector LED lamps featuring pure white 6000K illumination with high/low beam and integrated daytime running light (DRL). Illuminates entire fields for safe night harvesting.",
    specs: {
      "Power": "45W Each (90W Pair)",
      "Lumens": "9000 LM Total Output",
      "Housing": "Die-Cast Aluminum Heat Sink",
      "Voltage": "9V - 32V DC",
      "Warranty": "1 Year Replacement Warranty"
    }
  },
  {
    id: "TH-PRD-111",
    name: "Multi-Core Heavy-Duty Copper Radiator Assembly",
    category: "radiators",
    brand: "mahindra",
    compatibleModels: ["Mahindra 575 DI", "Mahindra 475 DI", "Mahindra Yuvo 575 DI"],
    price: 5999,
    originalPrice: 7800,
    rating: 4.8,
    reviewsCount: 84,
    oemNumber: "RAD-COPPER-MHD-01",
    stock: 12,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80",
    description: "Full brass/copper 3-row core design with reinforced soldering. Provides 35% higher heat dissipation than standard radiators, preventing engine overheating during continuous summer tillage.",
    specs: {
      "Core Rows": "3-Row Heavy Copper Tube & Fin",
      "Tanks": "Heavy Gauge Brass Top & Bottom",
      "Includes": "High-Pressure 0.9 Bar Brass Radiator Cap",
      "Mounting": "Direct Bolt-On OEM Brackets",
      "Warranty": "18 Months Leakage Warranty"
    }
  },
  {
    id: "TH-PRD-112",
    name: "Raw-Edge Cogged Heavy Duty Fan Belt (Pack of 2)",
    category: "belts",
    brand: "john-deere",
    compatibleModels: ["John Deere 5050 D", "John Deere 5310", "New Holland 3630 TX"],
    price: 290,
    originalPrice: 420,
    rating: 4.6,
    reviewsCount: 130,
    oemNumber: "BELT-FAN-EPDM-JD",
    stock: 55,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    description: "Heat and oil resistant EPDM rubber V-belt with high-modulus polyester cords. Precision cog design reduces flex fatigue and ensures quiet, slip-free drive for alternator and water pump.",
    specs: {
      "Section Profile": "AVX-13 Heavy Industrial",
      "Length": "1125 mm Inside Length",
      "Operating Temp": "-40°C to +130°C",
      "Pack": "2 Belt Units Included",
      "Warranty": "6 Months Warranty"
    }
  },
  {
    id: "TH-PRD-113",
    name: "Cast-Steel Ergonomic Main Gear Shift Lever Assembly",
    category: "transmission-parts",
    brand: "swaraj",
    compatibleModels: ["Swaraj 744 FE", "Swaraj 855 FE", "Swaraj 735 FE"],
    price: 780,
    originalPrice: 1100,
    rating: 4.7,
    reviewsCount: 52,
    oemNumber: "GL-SW-744-ASSY",
    stock: 22,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    description: "Forged alloy steel gear stick complete with heavy rubber dust boot, internal selector finger and anti-slip Bakelite gear knob with clear H-pattern shift markings.",
    specs: {
      "Material": "Drop Forged 40Cr Steel",
      "Finish": "Zinc Plated Anti-Corrosion",
      "Includes": "Heavy Rubber Bellows Boot & Knob",
      "Warranty": "12 Months Warranty"
    }
  },
  {
    id: "TH-PRD-114",
    name: "400mm Heavy-Grip Steering Wheel with Spinner Knob",
    category: "steering-parts",
    brand: "massey-ferguson",
    compatibleModels: ["Massey Ferguson 241 DI", "Massey Ferguson 1035 DI", "TAFE 45 DI", "Mahindra 475 DI"],
    price: 950,
    originalPrice: 1350,
    rating: 4.8,
    reviewsCount: 118,
    oemNumber: "ST-WHL-MF-KNOB",
    stock: 36,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: true,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=600&q=80",
    description: "Ergonomically molded polyurethane steering wheel reinforced with solid steel core. Includes a smooth 360-degree ball bearing spinner knob for effortless one-handed headland turning.",
    specs: {
      "Outer Diameter": "400 mm (15.75 Inch)",
      "Center Hub": "Keyway & Tapered Bore Standard",
      "Feature": "Integrated Deluxe Steering Knob",
      "Warranty": "12 Months Warranty"
    }
  },
  {
    id: "TH-PRD-115",
    name: "13.6-28 12PR Deep-Lug Rear Farm Tractor Tyre",
    category: "tyres-tubes",
    brand: "mahindra",
    compatibleModels: ["Mahindra 575 DI", "Swaraj 744 FE", "John Deere 5050 D", "Sonalika DI 745 III"],
    price: 24500,
    originalPrice: 28900,
    rating: 5.0,
    reviewsCount: 310,
    oemNumber: "TYRE-136-28-12PR",
    stock: 8,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty 12-ply rating bias tyre featuring self-cleaning directional 45-degree angle lugs. Provides superior drawbar traction on wet puddled paddy fields and black cotton soil.",
    specs: {
      "Size": "13.6 - 28",
      "Ply Rating (PR)": "12 PR Extra Heavy Duty",
      "Tread Depth": "38 mm Deep Lug",
      "Load Index": "128 A8 (1800 kg per tyre)",
      "Warranty": "5 Years Manufacturer Warranty"
    }
  },
  {
    id: "TH-PRD-116",
    name: "High-Flow Cast Iron Engine Cooling Water Pump",
    category: "engine-parts",
    brand: "swaraj",
    compatibleModels: ["Swaraj 855 FE", "Swaraj 744 FE", "Swaraj 963 FE"],
    price: 1850,
    originalPrice: 2500,
    rating: 4.8,
    reviewsCount: 94,
    oemNumber: "WP-SW-855-ENG",
    stock: 26,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    description: "Precision-machined water pump assembly fitted with heavy Japanese ball bearings and ceramic-carbon mechanical seal to prevent coolant seepage under sustained high-RPM operation.",
    specs: {
      "Impeller Material": "Corrosion-Resistant Cast Iron",
      "Bearing Type": "Double Row Sealed Ball Bearing",
      "Gasket": "Composite High-Temp Gasket Included",
      "Warranty": "12 Months Replacement Warranty"
    }
  },
  {
    id: "TH-PRD-117",
    name: "12V 45A Heavy Duty Agri Alternator with Built-In Regulator",
    category: "electrical-parts",
    brand: "tafe",
    compatibleModels: ["TAFE 45 DI", "Massey Ferguson 241 DI", "TAFE 5900 DI"],
    price: 3990,
    originalPrice: 5200,
    rating: 4.8,
    reviewsCount: 104,
    oemNumber: "ALT-12V-45A-LUC",
    stock: 16,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=600&q=80",
    description: "Compact high-output alternator with solid copper windings, dust-sealed bearings and electronic voltage regulator. Charges batteries rapidly even during low engine idle speeds.",
    specs: {
      "Voltage / Current": "12V, 45 Amperes",
      "Pulley": "Single V-Groove Pulley (70mm)",
      "Regulator": "Internal Electronic Solid-State",
      "Mounting": "Twin Foot Lug Mount",
      "Warranty": "12 Months Warranty"
    }
  },
  {
    id: "TH-PRD-118",
    name: "12V 2.8kW Planetary Gear Reduction Self-Starter Motor",
    category: "electrical-parts",
    brand: "new-holland",
    compatibleModels: ["New Holland 3630 TX", "New Holland 3600-2", "Farmtrac 60"],
    price: 4850,
    originalPrice: 6400,
    rating: 4.9,
    reviewsCount: 135,
    oemNumber: "SM-12V-28KW-NH",
    stock: 15,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80",
    description: "High-torque reduction starter motor with reinforced solenoid switch and 9-tooth steel bendix pinion. Delivers rapid engine turnover with minimum battery drain.",
    specs: {
      "Rated Power": "2.8 kW (3.8 HP)",
      "Bendix Teeth": "9 Teeth Heavy Pinion",
      "Mounting Holes": "3-Bolt Flange System",
      "Thermal Switch": "Overheat Protection Built-in",
      "Warranty": "1 Year OEM Warranty"
    }
  },
  {
    id: "TH-PRD-119",
    name: "Heavy Duty Telescopic Splined PTO Drive Shaft Assembly",
    category: "transmission-parts",
    brand: "john-deere",
    compatibleModels: ["John Deere 5310", "John Deere 5050 D", "Mahindra Arjun 555", "Sonalika DI 60"],
    price: 4200,
    originalPrice: 5800,
    rating: 4.8,
    reviewsCount: 88,
    oemNumber: "PTO-HD-138-6S",
    stock: 20,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80",
    description: "Telescopic universal joint propeller shaft engineered for rotavator, straw reaper, post hole digger and water pump drive. Includes yellow CE safety shield and quick-release spring locks.",
    specs: {
      "Profile": "Triangular Telescopic Tube with 6-Spline Yoke (1-3/8\")",
      "Closed Length": "1000 mm (Extends to 1450 mm)",
      "Torque Rating": "850 Nm Max Continuous",
      "Safety Shield": "Full Plastic Guard with Chains",
      "Warranty": "1 Year Warranty"
    }
  },
  {
    id: "TH-PRD-120",
    name: "Deluxe Ergonomic Suspension Tractor Seat with Armrests",
    category: "tractor-accessories",
    brand: "mahindra",
    compatibleModels: ["Mahindra 575 DI", "John Deere 5050 D", "Swaraj 855 FE", "Farmtrac 60", "Sonalika DI 745"],
    price: 3850,
    originalPrice: 5100,
    rating: 4.9,
    reviewsCount: 220,
    oemNumber: "SEAT-DELUXE-SUSP-ARM",
    stock: 22,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: true,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80",
    description: "Heavy mechanical coil-spring suspension seat with hydraulic damper, adjustable weight knob (50-130kg), flip-up armrests and waterproof UV-resistant faux leather cushion to protect farmer spine during long work days.",
    specs: {
      "Suspension Stroke": "80 mm Smooth Travel",
      "Fore/Aft Adjustment": "150 mm Slider Rails",
      "Upholstery": "High-Density Molded Foam & Heavy Vinyl",
      "Mounting Base": "Universal Multi-Hole Pattern",
      "Warranty": "2 Years Frame & Suspension Warranty"
    }
  },
  {
    id: "TH-PRD-121",
    name: "Direct Fuel Injection Pump (FIP) Calibrated Assembly",
    category: "engine-parts",
    brand: "massey-ferguson",
    compatibleModels: ["Massey Ferguson 241 DI", "TAFE 45 DI"],
    price: 14200,
    originalPrice: 18500,
    rating: 5.0,
    reviewsCount: 46,
    oemNumber: "FIP-BOSCH-MF241",
    stock: 6,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80",
    description: "Factory bench-calibrated inline 3-cylinder diesel fuel injection pump. Delivers micro-precise fuel metering, instant throttle response and peak fuel economy without black smoke.",
    specs: {
      "Type": "Inline Multi-Plunger FIP",
      "Number of Outlets": "3 Cylinders",
      "Calibration": "Certified Bosch Pre-Tuned",
      "Includes": "Feed Pump & Delivery Valves",
      "Warranty": "18 Months OEM Warranty"
    }
  },
  {
    id: "TH-PRD-122",
    name: "Heavy Duty Tie Rod End Set (Left & Right Pair)",
    category: "steering-parts",
    brand: "sonalika",
    compatibleModels: ["Sonalika DI 745 III", "Sonalika DI 60", "Mahindra 575 DI"],
    price: 820,
    originalPrice: 1150,
    rating: 4.7,
    reviewsCount: 71,
    oemNumber: "TRE-SON-PAIR-LR",
    stock: 35,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: false,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    description: "Heat-treated chrome-moly ball joints sealed with heavy neoprene dust boots to withstand dust, gravel and water. Restores tight steering feel and eliminates wheel wobble.",
    specs: {
      "Thread": "M20 x 1.5 Pitch (LH & RH)",
      "Ball Pin Taper": "1:8 Precision Standard",
      "Greaseable": "Fitted with Brass Zerk Grease Fitting",
      "Warranty": "12 Months Replacement"
    }
  },
  {
    id: "TH-PRD-123",
    name: "Tractor Silencer / Muffler Bend Pipe Set (Heavy Matte Black)",
    category: "tractor-accessories",
    brand: "swaraj",
    compatibleModels: ["Swaraj 744 FE", "Swaraj 855 FE", "Swaraj 735 FE"],
    price: 1450,
    originalPrice: 1990,
    rating: 4.8,
    reviewsCount: 154,
    oemNumber: "SIL-SW-MATTE-BLK",
    stock: 29,
    availability: "In Stock",
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    description: "Heavy gauge CRCA sheet exhaust muffler with high-temperature ceramic matte black powder coating. Features iconic Swaraj throat sound while keeping decibels compliant with farm safety.",
    specs: {
      "Material": "16-Gauge Seamless Cold Rolled Steel",
      "Coating": "Heat Proof 650°C Powder Coat",
      "Flange": "3-Bolt Precision Engine Exhaust Flange",
      "Rain Cap": "Spring Balanced Top Flapper Included",
      "Warranty": "1 Year Rust-Through Warranty"
    }
  },
  {
    id: "TH-PRD-124",
    name: "Set of 4 Fast-Heating Diesel Glow Plugs (11V)",
    category: "electrical-parts",
    brand: "mahindra",
    compatibleModels: ["Mahindra Arjun 555 DI", "Mahindra 575 DI", "Mahindra Yuvo 575 DI"],
    price: 720,
    originalPrice: 990,
    rating: 4.7,
    reviewsCount: 65,
    oemNumber: "GP-MHD-4SET-11V",
    stock: 42,
    availability: "In Stock",
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: false,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Dual-coil rapid pre-heating glow plugs that reach 850°C in under 4 seconds. Eliminates cold start white smoke and rough idling in sub-zero winter temperatures.",
    specs: {
      "Voltage": "11 Volts",
      "Heat-Up Time": "3.5 Seconds to 850°C",
      "Thread": "M10 x 1.25",
      "Pack": "Complete 4-Piece Engine Set",
      "Warranty": "12 Months Warranty"
    }
  }
];

const DISCOUNT_COUPONS = [
  { code: "KISAN10", discountPercent: 10, minAmount: 1000, description: "10% Instant Discount on orders above ₹1,000" },
  { code: "TRACTOR500", flatDiscount: 500, minAmount: 4000, description: "Flat ₹500 OFF on orders above ₹4,000" },
  { code: "FREESHIP", freeShipping: true, minAmount: 500, description: "Free Express Shipping anywhere in India" }
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Gurpreet Singh",
    location: "Ludhiana, Punjab",
    tractor: "Swaraj 855 FE Owner",
    avatar: "👨‍🌾",
    rating: 5,
    date: "2 days ago",
    comment: "Ordered the clutch plate and fuel filters for my 855 FE. Received original parts within 48 hours right to my village farm. The clutch bite is powerful now even with 11-tyne tiller!",
    verified: true
  },
  {
    id: 2,
    name: "Rameshwar Patel",
    location: "Indore, Madhya Pradesh",
    tractor: "Mahindra 575 DI Owner",
    avatar: "🌾",
    rating: 5,
    date: "1 week ago",
    comment: "TractorHub saved my sowing season. Local mechanic couldn't find the genuine hydraulic pump. Found exact model match here at 25% lower price than local shops.",
    verified: true
  },
  {
    id: 3,
    name: "Selvamurugan K.",
    location: "Coimbatore, Tamil Nadu",
    tractor: "Massey Ferguson 241 DI",
    avatar: "🚜",
    rating: 5,
    date: "2 weeks ago",
    comment: "Excellent service and genuine OEM parts. The suspension tractor seat is unbelievable for back comfort during whole-day sugarcane harvesting. Highly recommended to all farmers.",
    verified: true
  },
  {
    id: 4,
    name: "Choudhary Vikas",
    location: "Karnal, Haryana",
    tractor: "John Deere 5310 4WD",
    avatar: "👨‍💼",
    rating: 5,
    date: "3 weeks ago",
    comment: "The LED projector headlights are super bright. Night harvesting with laser land leveller became very easy and safe. Packaging was very sturdy with foam wrapping.",
    verified: true
  }
];

const FAQS = [
  {
    question: "Are all spare parts sold on TractorHub 100% genuine & OEM certified?",
    answer: "Yes, absolutely! Every single spare part on TractorHub is directly sourced from certified OEM manufacturers (like Bosch, Lucas TVS, Donaldson, Luk, TVS Girling) and backed by full manufacturer warranties and tamper-proof holographic seals."
  },
  {
    question: "How do I check if a spare part is compatible with my specific tractor model?",
    answer: "Each product page explicitly lists compatible tractor brands and models (e.g. Swaraj 744 FE, Mahindra 575 DI). You can also use our interactive 'Tractor Compatibility Finder' on the homepage by selecting your Brand and Model to filter 100% guaranteed fitting parts."
  },
  {
    question: "What are the shipping charges and delivery timeframes across India?",
    answer: "We offer FREE Standard Delivery on all orders above ₹1,999! For orders below ₹1,999, a nominal flat shipping fee of ₹150 applies. Delivery takes 2-4 business days for tier 1/2 cities, and 3-6 days for rural farm addresses."
  },
  {
    question: "What is your return and replacement policy if the part does not fit?",
    answer: "We offer a hassle-free 7-Day Easy Return & Replacement Guarantee. If the part does not fit your tractor model or has any transit defect, simply request a return from your Account or WhatsApp support, and our courier partner will pick it up directly from your doorstep."
  },
  {
    question: "What payment methods are supported on TractorHub?",
    answer: "We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking for all major Indian banks, and Agri-Kisan Credit Card transfers."
  }
];

const DEMO_ORDERS = [
  {
    id: "TH-2026-9841",
    date: "2026-10-04",
    customer: {
      name: "Rajesh Sharma",
      mobile: "+91 98765 43210",
      email: "rajesh.kisan@gmail.com",
      address: "Farm House #14, GT Road, Near Sugar Mill",
      city: "Karnal",
      state: "Haryana",
      pincode: "132001"
    },
    items: [
      { id: "TH-PRD-101", name: "Heavy-Duty Spin-On Engine Oil Filter", price: 380, quantity: 2, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80" },
      { id: "TH-PRD-104", name: "Ceramic-Metallic Heavy Duty Clutch Plate (280mm)", price: 3450, quantity: 1, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" }
    ],
    subtotal: 4210,
    delivery: 0,
    discount: 421,
    grandTotal: 3789,
    paymentMethod: "UPI (Google Pay)",
    status: "Delivered",
    trackingTimeline: [
      { status: "Order Placed", date: "04 Oct, 09:30 AM", done: true },
      { status: "Confirmed", date: "04 Oct, 11:15 AM", done: true },
      { status: "Shipped", date: "05 Oct, 02:40 PM", done: true },
      { status: "Out for Delivery", date: "07 Oct, 08:20 AM", done: true },
      { status: "Delivered", date: "07 Oct, 04:10 PM", done: true }
    ]
  },
  {
    id: "TH-2026-9915",
    date: "2026-10-07",
    customer: {
      name: "Sukhwinder Singh",
      mobile: "+91 94172 88319",
      email: "sukhi.farm@yahoo.com",
      address: "Village Kotkapura, Post Basti",
      city: "Faridkot",
      state: "Punjab",
      pincode: "151204"
    },
    items: [
      { id: "TH-PRD-110", name: "Ultra-Bright LED Projector Headlight Set (Pair)", price: 1550, quantity: 1, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80" },
      { id: "TH-PRD-120", name: "Deluxe Ergonomic Suspension Tractor Seat with Armrests", price: 3850, quantity: 1, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" }
    ],
    subtotal: 5400,
    delivery: 0,
    discount: 500,
    grandTotal: 4900,
    paymentMethod: "Cash on Delivery",
    status: "Shipped",
    trackingTimeline: [
      { status: "Order Placed", date: "07 Oct, 10:15 AM", done: true },
      { status: "Confirmed", date: "07 Oct, 12:00 PM", done: true },
      { status: "Shipped", date: "08 Oct, 08:30 AM", done: true },
      { status: "Out for Delivery", date: "Expected Tomorrow", done: false },
      { status: "Delivered", date: "Pending", done: false }
    ]
  }
];
