import React, { useState, useEffect } from "react";
import { FaApple, FaSearch, FaShoppingBag, FaTimes } from "react-icons/fa";

// Import local images
import iphone17Pro from "./assets/iphone 17 pro.jpg";
import iphone17 from "./assets/iphone 17.jpg";
import ipadAir from "./assets/ipad air.webp";
import watchSeries11 from "./assets/series-11.jpg";
import watchSE3 from "./assets/Se3.jpg";
import airPodsPro3 from "./assets/air pads pro 3.jpg";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [popup, setPopup] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const heroImages = [iphone17Pro, iphone17, ipadAir, watchSeries11, watchSE3, airPodsPro3];

  const products = [
    { id: "iphone17pro", title: "iPhone 17 Pro", subtitle: "All Out Pro", img: iphone17Pro, details: "Most advanced iPhone with A19 chip.", price: "₹1,29,999" },
    { id: "iphone17", title: "iPhone 17", subtitle: "Magicromatic", img: iphone17, details: "Magic in camera and performance.", price: "₹99,999" },
    { id: "ipadair", title: "iPad Air", subtitle: "Now supercharged by the M3 chip", img: ipadAir, details: "Lightweight power with M3 chip.", price: "₹69,999" },
    { id: "watch11", title: "Apple Watch Series 11", subtitle: "The ultimate watch for healthy life", img: watchSeries11, details: "Track your health with sensors.", price: "₹49,999" },
    { id: "watchse3", title: "Apple Watch SE3", subtitle: "Walk it. Talk it. Track it. Love it.", img: watchSE3, details: "Affordable watch with features.", price: "₹29,999" },
    { id: "airpodspro3", title: "AirPods Pro3", subtitle: "The world’s best active noise cancellation", img: airPodsPro3, details: "Immersive sound with spatial audio.", price: "₹24,999" },
  ];

  const navbarItems = [
    { name: "Store", links: ["Shop Latest", "Mac", "iPad", "iPhone", "Apple Watch", "AirPods", "Accessories"] },
    { name: "Mac", links: ["Explore Mac","Explore All Mac","MacBook Air","MacBook Pro","iMac","Mac Mini","Mac Studio","Mac Pro","Displays","Compare Mac","Switch from PC to Mac","Shop Mac","Mac Accessories","Ways to Buy","College Student Offer","Mac Support","AppleCare","macOS Tahoe","Apple Intelligence","Apps by Apple","Continuity","iCloud+","Mac for Business","Education"] },
    { name: "iPad", links: ["Explore iPad","Explore All iPad","iPad Pro","iPad Air","iPad","iPad Mini","Apple Pencil","Keyboards","Compare iPad","Why iPad","Shop iPad","iPad Accessories","Ways to Buy","College Student Offer"] },
    { name: "iPhone", links: ["Explore iPhone","Explore All iPhone","iPhone 17 Pro","Apple Trade In","iPhone Air","iPhone 17","iPhone 16","iPhone 16e","Compare iPhone","Switch from Android","Shop Phone","iPhone Accessories","Ways to Buy","iPhone Support","AppleCare","Apple Intelligence","Apps by Apple","iPhone Privacy"] },
    { name: "Watch", links: ["Explore Watch","Explore All Apple Watch","Apple Watch Series 11","Apple Watch SE 3","Apple Watch Ultra 3","Apple Watch Nike","Compare Watch","Why Apple Watch","Shop Watch","Apple Watch Straps","Apple Watch Accessories","Ways to Buy","TV & Home","Entertainment","Accessories","Support","Apple Watch Support","AppleCare","watchOS 26","Apple Watch For Your Kids","Apps by Apple"] },
    { name: "AirPods", links: ["Explore AirPods","Explore All AirPods","AirPods 4","AirPods Pro 3","AirPods Max","Compare AirPods","Shop AirPods","AirPods Support","AirPods Accessories","AppleCare","Apple Music"] },
    { name: "TV & Home", links: ["Explore TV & Home","Apple TV 4K","HomePod","HomePod Mini","Shop TV & Home","Shop Apple TV 4K","Shop HomePod","Shop HomePod Mini","Shop Siri Remote","TV & Home Accessories","Apple TV Support","HomePod Support","AppleCare for Apple TV","AppleCare for HomePod","Apple TV app","Apple TV+","Home app","Apple Music","Siri","AirPlay"] },
    { name: "Entertainment", links: ["Explore Entertainment","Apple One","Apple TV+","Apple Music","Apple Arcade","Apple Podcasts","Apple Books","App Store","Apple TV+ Support","Apple Music Support"] },
    { name: "Accessories", links: ["Shop All Accessories","Mac","iPad","iPhone","Apple Watch","AirPods","TV & Home","Made by Apple","Beats by Dr. Dre","AirTag"] },
    { name: "Support", links: ["Explore Support","iPhone","Mac","iPad","Watch","AirPods"] },
  ];

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Auto hero slider
  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroImages.length), 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Smooth scroll to product
  const handleProductClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="font-sans text-black bg-white scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
        <div className="flex justify-between items-center px-4 md:px-6 py-3">
          <div className="flex items-center space-x-4 md:space-x-6">
            <FaApple className="text-2xl cursor-pointer" />
            {navbarItems.map(item => (
              <div key={item.name} className="relative group">
                <span
                  className="cursor-pointer hover:opacity-80 transition"
                  onMouseEnter={() => setHoverMenu(item.name)}
                  onMouseLeave={() => setHoverMenu(null)}
                >
                  {item.name}
                </span>
                {hoverMenu === item.name && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-black rounded shadow-lg p-4 w-56 sm:w-64 md:w-96 z-50 grid grid-cols-1 gap-1 max-h-96 overflow-y-auto animate-fadeIn">
                    {item.links.map((link, idx) => (
                      <p key={idx} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">{link}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative">
              <FaSearch className="cursor-pointer" onClick={() => setIsSearchOpen(true)} />
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black p-4 rounded shadow-lg w-64 animate-fadeIn">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Search Products</span>
                    <FaTimes className="cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Apple products..."
                    className="w-full border p-2 rounded mb-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p, idx) => (
                        <p
                          key={idx}
                          className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleProductClick(p.id)}
                        >
                          {p.title}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No products found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <FaShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <section
        className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] mt-16 overflow-hidden"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        {heroImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Hero ${idx + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded" onClick={nextSlide}>
          &#10095;
        </button>
      </section>

      {/* Product Sections */}
      <main className="mt-10 px-4 md:px-8 space-y-16">
        {products.map((product, idx) => (
          <section id={product.id} key={idx} className="py-12 md:py-20 text-center">
            <div className="relative group inline-block mx-auto w-full max-w-md rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 opacity-0 group-hover:opacity-100 transition duration-700 animate-gradient"></div>
              <img
                src={product.img}
                alt={product.title}
                className="relative z-10 w-full h-auto object-contain rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">{product.title}</h1>
            <h4 className="text-lg mt-2">{product.subtitle}</h4>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() => setPopup({ type: "learn", product })}
              >
                Learn More
              </button>
              <button
                className="bg-black text-red-500 px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
                onClick={() => setPopup({ type: "buy", product })}
              >
                Buy Now
              </button>
            </div>
          </section>
        ))}
      </main>

      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-center relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setPopup(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{popup.product.title}</h2>

            {popup.type === "learn" ? (
              <div className="text-left space-y-2">
                <p className="text-gray-700 font-semibold">Overview:</p>
                <p className="text-gray-700">{popup.product.details}</p>
                <p className="text-gray-700 font-semibold mt-2">Key Features:</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>High-performance processor for fast performance</li>
                  <li>Advanced display technology</li>
                  <li>Long-lasting battery life</li>
                  <li>Cutting-edge camera system</li>
                  <li>Seamless connectivity with other Apple devices</li>
                </ul>
                <p className="text-gray-700 font-semibold mt-2">Benefits:</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Enhances productivity and creativity</li>
                  <li>Enjoy immersive multimedia experience</li>
                  <li>Reliable performance for work and play</li>
                  <li>Latest software features included</li>
                </ul>
              </div>
            ) : (
              <div className="text-left space-y-2">
                <p className="text-lg font-semibold text-red-500">Price: {popup.product.price}</p>
                <p className="text-gray-700">Includes features: {popup.product.details}</p>
                <p className="text-gray-700">Estimated Delivery: 3-5 business days</p>
                <p className="text-gray-700">Warranty: 1 year Apple limited warranty</p>
                <p className="text-gray-700">Shipping Options: Standard, Express, In-Store Pickup</p>
                <p className="text-gray-700">Payment Options: Credit/Debit Card, EMI, Apple Pay</p>
                <p className="text-gray-700">Return Policy: 14 days return/exchange policy applicable</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-sm text-gray-700 mt-10 p-6 text-center">
        <div className="space-y-2 text-xs md:text-sm mb-4 text-left">
          <p>1. New subscribers only. ₹99.00/month after free trial. Plan automatically renews until cancelled. Terms apply.</p>
          <p>2. Compatible hardware and software are required. Not all content is available in Dolby Atmos.</p>
          <p>3. New subscribers only. ₹119.00/month after free trial. Plan automatically renews until cancelled. Terms apply.</p>
          <p>4. New subscribers only. ₹99.00/month after free trial. Plan automatically renews until cancelled. Terms apply.</p>
          <p>5. The Apple One free trial includes only services that you are not currently using through a free trial or a subscription. Plan automatically renews after trial until cancelled. Restrictions and other terms apply.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4 text-left">
          <div>
            <h3 className="font-semibold mb-2">Shop and Learn</h3>
            <ul className="space-y-1">
              {["Store","Mac","iPad","iPhone","Watch","AirPods","TV & Home","AirTag","Accessories","Gift Cards","Apple Wallet","Wallet","Account","Manage Your Apple Account","Apple Store Account","iCloud.com"].map((item, idx) => (
                <li key={idx} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Entertainment</h3>
            <ul className="space-y-1">
              {["Apple One","Apple TV+","Apple Music","Apple Arcade","Apple Podcasts","Apple Books","App Store","Apple TV+ Support","Apple Music Support"].map((item, idx) => (
                <li key={idx} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">For Business & Education</h3>
            <ul className="space-y-1">
              {["For Business","Apple and Business","Shop for Business","For Education","Apple and Education","Shop for Education","Shop for University","For Healthcare","Apple and Healthcare","For Government","Apple and Government"].map((item, idx) => (
                <li key={idx} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About Apple</h3>
            <ul className="space-y-1">
              {["Apple Values","Accessibility","Education","Environment","Privacy","Supply Chain Innovation","About Apple","Newsroom","Apple Leadership","Career Opportunities","Investors","Ethics & Compliance","Events","Contact Apple"].map((item, idx) => (
                <li key={idx} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-6 border-t pt-4 text-gray-600 space-y-4">
          <p>Copyright © 2025 Apple Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            {["Privacy Policy  |","Terms of Use |","Sales Policy |","Legal |","Site Map"].map((item, idx) => (
              <span key={idx} className="hover:underline cursor-pointer">{item}</span>
            ))}
          </div>
          <div className="text-center mt-4 space-y-2 text-gray-600">
            <p>Created By @ Vivek Raja.</p>
          </div>
          <p className="mt-4 text-xs md:text-sm text-center">
            More ways to shop: Find an Apple Store or other retailer near you. Or call <span className="font-semibold">000800 040 1966</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;