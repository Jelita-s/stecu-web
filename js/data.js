// ===== PRODUCT DATA =====

const PRODUCTS = [
  {
    id: 1,
    rating: 4.7,
    reviews: 44,
    name: "SOY BRIGHT! Moisturizer",
    category: "moisturizer",
    price: 121000,
    desc: "Mengandung antioksidan, ceramide, dan hyaluronic acid yang membantu mengatasi tanda penuaan dini, noda hitam, kulit kering, dan kusam.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-SOY-BRIGHT!-Moisturizer-2in1-Primer-Makeup-dan-Gel-Pelembab-Wajah-Siang-dan-Malam-untuk-Semua-Jenis-Kulit-i.856580029.18444376450",
    image: "img/moisturizer.png"
  },
  {
    id: 2,
    rating: 4.8,
    reviews: 100,
    name: "HYDRICEING & BRIGHTENING Essence Booster",
    category: "toner",
    price: 141000,
    desc: "Mengandung AHA (Glycolic Acid), antioksidan, ceramide, mineral, dan panthenol untuk mengatasi jerawat, pori-pori besar, dan kemerahan.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-HYDRICEING-BRIGHTENING-Essence-Booster-Serum-Infused-Toner-Untuk-Semua-Jenis-Kulit-100mL-i.856580029.24064685065",
    image: "img/toner.png"
  },
  {
    id: 3,
    rating: 4.4,
    reviews: 226,
    name: "SUN-RICE ALL DAY Invisible UV Shield SPF 50 PA++++",
    category: "sunscreen",
    price: 110900,
    desc: "Mengandung ceramide dan panthenol untuk mengatasi jerawat, menjaga kelembapan, dan memperkuat skin barrier.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-SUN-RICE-ALL-DAY-Invisible-UV-Shield-SPF-50-PA-50ml-Sunscreen-Wajah-i.856580029.27327898085",
    image: "img/sun-rice.png"
  },
  {
    id: 4,
    rating: 4.3,
    reviews: 227,
    name: "SOY GENTLE! Face Cleanser",
    category: "cleanser",
    price: 101899,
    desc: "Mengandung cucumber, olive leaf extract, rosewater, soybean, dan sunflower oil. 2in1 Makeup Remover dan Sabun Cuci Muka pH Balanced.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-SOY-GENTLE!-Face-Cleanser-i.856580029.14492559708",
    image: "#"
  },
  {
    id: 5,
    rating: 4.9,
    reviews: 60,
    name: "SOY CLEAR Brightening & Dark Spot Serum",
    category: "serum",
    price: 136000,
    desc: "Mengandung ceramide, kojic acid, micellar cysteamine, dan soybean extract untuk memudarkan noda hitam dan hiperpigmentasi.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-SOY-CLEAR-Brightening-Dark-Spot-Serum-i.856580029.26551470860",
    image: "#"
  },
  {
    id: 6,
    rating: 4.7,
    reviews: 46,
    name: "RICE + BRIGHT & GLOW SERUM",
    category: "serum",
    price: 131000,
    desc: "Mengandung salicylic acid yang membantu mencerahkan kulit serta menjaga kebersihan pori-pori.",
    link: "https://shopee.co.id/-Manohara's-Pick-Finally-Found-You!-RICE-BRIGHT-GLOW-SERUM-20ml-i.856580029.41102715617",
    image: "#"
  },
  {
    id: 7,
    rating: 4.2,
    reviews: 93,
    name: "FFY OATstanding Retinal Eye & Face Cream",
    category: "moisturizer",
    price: 136000,
    desc: "Mengandung retinal complex, colloidal oatmeal, oat, rice extract, dan soybean untuk menyamarkan tanda penuaan dini.",
    link: "https://shopee.co.id/Finally-Found-You!-FFY-OATstanding-Retinal-2in1-Eye-Face-Cream-i.856580029.23487862662",
    image: "#"
  },
  {
    id: 8,
    rating: 4.4,
    reviews: 192,
    name: "Acne ProtecTea Physical Sunscreen SPF 30 PA++++",
    category: "sunscreen",
    price: 126000,
    desc: "Mengandung panthenol, allantoin, dan green tea leaf extract untuk kulit berjerawat dan sensitif.",
    link: "https://shopee.co.id/Finally-Found-You!-Acne-ProtecTea-Physical-Sunscreen-SPF-30-PA-50g-i.856580029.51401692620",
    image: "#"
  },
  {
    id: 9,
    rating: 4.2,
    reviews: 88,
    name: "Bright & Smooth PEEL-OFF MASK",
    category: "mask",
    price: 92000,
    desc: "Mengandung niacinamide, hyaluronic acid, hydrolyzed collagen, dan rice bran water untuk menjaga kelembapan dan mengatasi kulit kusam.",
    link: "https://shopee.co.id/Finally-Found-You!-RICE-UP!-Bright-Smooth-PEEL-OFF-MASK-50gr-i.856580029.29868385517",
    image: "#"
  },
  {
    id: 10,
    rating: 4.8,
    reviews: 217,
    name: "TRIPLE VITAMIN B-ARRIER Intensive Moisturizing Cream",
    category: "moisturizer",
    price: 131000,
    desc: "Mengandung AHA, BHA, peach, dan snail mucin untuk mengatasi jerawat, penuaan dini, komedo, dan noda hitam.",
    link: "https://shopee.co.id/Finally-Found-You!-TRIPLE-VITAMIN-B-ARRIER-PEACH-SNAIL-MUCIN-Intensive-Soothing-Moisturizing-Cream-50gr-i.856580029.29985600143",
    image: "#"
  },
  {
    id: 11,
    rating: 4.6,
    reviews: 94,
    name: "OATSTANDING BHA + LHA Acne Serum",
    category: "serum",
    price: 121000,
    desc: "Mengandung salicylic acid, LHA, niacinamide, zinc PCA, dan oat extract untuk merawat kulit berjerawat.",
    link: "https://shopee.co.id/Finally-Found-You!-OATSTANDING-BHA-LHA-Acne-Serum-i.856580029.28411975834",
    image: "#"
  },
  {
    id: 12,
    rating: 4.6,
    reviews: 109,
    name: "BERRY DEEP Exfoliating Serum",
    category: "serum",
    price: 111000,
    desc: "Mengandung AHA, BHA, PHA, LHA untuk menghaluskan, mencerahkan, dan mengangkat sel kulit mati.",
    link: "https://shopee.co.id/Finally-Found-You!-BERRY-DEEP-Exfoliating-Serum-20ml-i.856580029.27654540602",
    image: "#"
  },
  {
    id: 13,
    rating: 4.8,
    reviews: 39,
    name: "Ocean Blue Pea Dual-Phase Micellar Water",
    category: "cleanser",
    price: 76000,
    desc: "Mengandung deep sea water, guaiazulene, allantoin, dan blue pea extract untuk menenangkan dan memperkuat skin barrier.",
    link: "https://shopee.co.id/Finally-Found-You!-Ocean-Blue-Pea-Dual-Phase-Micellar-Water-100ml-i.856580029.42256253477",
    image: "#"
  },
  {
    id: 14,
    rating: 4.8,
    reviews: 78,
    name: "Calm-Dula HOCL Essence Mist",
    category: "toner",
    price: 131000,
    desc: "Mengandung AHA, BHA, antioksidan, mineral, dan bahan organik untuk mengatasi jerawat, penuaan dini, dan komedo.",
    link: "https://shopee.co.id/Finally-Found-You!-Calm-Dula-HOCL-Essence-Mist-100mL-i.856580029.42716839637",
    image: "#"
  },
  {
    id: 15,
    rating: 4.8,
    reviews: 125,
    name: "Triple Vitamin B-Arrier + Peach + Snail Mucin Essence Toner",
    category: "toner",
    price: 126000,
    desc: "Mengandung panthenol, vitamin B12, allantoin, snail extract, peach extract, dan niacinamide untuk memperkuat skin barrier.",
    link: "https://shopee.co.id/Finally-Found-You!-Triple-Vitamin-B-Arrier-Peach-Snail-Mucin-Intensive-Soothing-Essence-Toner-100mL-i.856580029.43211174429",
    image: "#"
  },
  {
    id: 16,
    rating: 4.4,
    reviews: 93,
    name: "Acne ProtecTea Spot Treatment",
    category: "serum",
    price: 126000,
    desc: "Mengandung AHA, BHA, hyaluronic acid, peptide, dan vitamin C untuk mengatasi jerawat dan noda secara tepat sasaran.",
    link: "https://shopee.co.id/Finally-Found-You!-Acne-ProtecTea-Spot-Treatment-12g-i.856580029.51301692566",
    image: "#"
  },
  {
    id: 17,
    rating: 5.0,
    reviews: 124,
    name: "BLACK RICE+ AI Brightening Body Soap",
    category: "body",
    price: 51000,
    desc: "Mengandung Vitamin C & Retinol untuk mencerahkan, mengencangkan, dan melembapkan kulit serta menyamarkan noda.",
    link: "https://shopee.co.id/-Amanda-Zahra's-Pick-Finally-Found-You!-BLACK-RICE-AI-High-Concentrated-Brightening-Body-Soap-i.856580029.50555404293",
    image: "#"
  },
  {
    id: 18,
    rating: 4.3,
    reviews: 135,
    name: "BLACK RICE+ AI Brightening Body Scrub",
    category: "body",
    price: 126000,
    desc: "Mengandung Glycolic Acid, Kojic Acid & Alpha Arbutin, Hyaluronic Acid dan Ceramide untuk kulit lebih halus dan cerah.",
    link: "https://shopee.co.id/-Amanda-Zahra's-Pick-Finally-Found-You!-BLACK-RICE-AI-High-Concentrated-Brightening-Body-Scrub-i.856580029.54057538203",
    image: "#"
  },
  {
    id: 19,
    rating: 4.3,
    reviews: 126,
    name: "RICE+ AI Brightening Body Mask",
    category: "body",
    price: 136000,
    desc: "Mengandung Retinal, Niacinamide, Kojic Acid, Alpha Arbutin, Glutathione, dan Rice Extract untuk kulit lebih cerah dan sehat.",
    link: "https://shopee.co.id/Finally-Found-You!-RICE-AI-High-Concentrated-Brightening-Body-Mask-i.856580029.41279371656",
    image: "#"
  },
  {
    id: 20,
    rating: 4.7,
    reviews: 244,
    name: "NANO WHITE™ + BLACK RICE Body Serum",
    category: "body",
    price: 186000,
    desc: "Mengandung Alpha Arbutin, Tranexamic Acid, Kojic Acid, Allantoin dan Black Rice Extract untuk mencerahkan kulit badan.",
    link: "https://shopee.co.id/Finally-Found-You!-The-Ultimate-Concentrate-NANO-WHITE%E2%84%A2-BLACK-RICE-For-Body-Serum-Badan-Pencerah-30mL-i.856580029.40279392908",
    image: "#"
  },
  {
    id: 21,
    rating: 4.2,
    reviews: 155,
    name: "RICE+ AI Brightening Body Lotion",
    category: "body",
    price: 116000,
    desc: "Mengandung 15% Niacinamide, Tranexamic Acid, Alpha Arbutin, Rice Extract dan Peptide untuk kulit glowing.",
    link: "https://shopee.co.id/-Amanda-Zahra's-Pick-Finally-Found-You!-RICE-AI-High-Concentrated-Brightening-Body-Lotion-i.856580029.54906304166",
    image: "#"
  },
  {
    id: 22,
    rating: 4.6,
    reviews: 134,
    name: "RICE+ AI UV Bright Tone-Up Lotion SPF 30",
    category: "body",
    price: 136000,
    desc: "Mengandung Niacinamide, Peptide, Rice Bran Extract dan UV Protector untuk proteksi dan mencerahkan kulit badan.",
    link: "https://shopee.co.id/Finally-Found-You!-RICE-AI-UV-Bright-Tone-Up-Lotion-SPF-30-PA-i.856580029.42378822793",
    image: "#"
  },
  {
    id: 23,
    rating: 4.3,
    reviews: 113,
    name: "C+U Honey Lip Serum",
    category: "lip",
    price: 81000,
    desc: "Mengandung Vitamin C, Ubiquinone, dan Manuka Honey untuk mencerahkan, melembapkan, serta menyamarkan bibir gelap.",
    link: "https://shopee.co.id/Finally-Found-You!-C-U-Honey-Lip-Serum-untuk-Melembapkan-dan-Mencerahkan-Bibir-5ml-i.856580029.26865115812",
    image: "#"
  }
];