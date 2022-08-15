const price1 = 70990.23;
const price2 = 14990.0;
const price3 = 37995.0;
const price4 = 32495.0;

const products = [
  {
    name: "Iphone 13 Pro Max",
    image: "iphone-13-pro-max.jpg",
    description:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).",
    brand: "Apple",
    category: "Iphone",
    price: price1.toFixed(2),
    countInStock: 3,
  },

  {
    name: "Airpods Pro",
    image: "airpods.jpg",
    description:
      "AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your Apple devices. And they’re ready to use right out of the case.",
    brand: "Apple",
    category: "Ear Phone",
    price: price2.toFixed(2),
    countInStock: 15,
  },

  {
    name: "Lenovo Ideapad SLim 3",
    image: "lenovo-ideapad-slim-3.jpg",
    description:
      "The device is an entry-level laptop that comes with a powerful AMD Ryzen 7 4700U Mobile Processor along with discrete AMD Radeon graphics options. It allows you to perform tasks with good speed and multitask without any lags.",
    brand: "Lenovo",
    category: "Laptop",
    price: price3.toFixed(2),
    countInStock: 8,
  },

  {
    name: "MAXIFY GX6070",
    image: "MAXIFY-GX6070.jpg",
    description:
      "Designed for high volume printing at ultra low running cost, this high performance wireless multi-function business printer combines compactness and convenient maintenance, to meet the demands of small offices.",
    brand: "Canon",
    category: "Printer",
    price: price4.toFixed(2),
    countInStock: 0,
  },
];

module.exports = products;
