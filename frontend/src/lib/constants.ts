const nav = ["LIFESTYLE", "SPORTS", "OUTDOOR", "SLIDES", "ESSENTIALS"] as const;
type navType = typeof nav;

const products: productsType[] = [
  {
    id: 1,
    category: "Lifestyle",
    name: "SANDAL MEHANA",
    price: 1300000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 2,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22 XLG",
    price: 1300000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5650_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 3,
    category: "Lifestyle",
    name: "SEPATU MULE ADIFOM STAN SMITH",
    price: 1200000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie0483_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 4,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: 840000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 5,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: 840000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 6,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: 840000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 7,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: 840000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 8,
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: 840000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 9,
    category: "Running",
    name: "SANDAL RUNNING TDR3000",
    price: 2300000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 10,
    category: "Outdoor",
    name: "SEPATU OUTDOOR TDR3001",
    price: 2300000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg",
  },
];
type productsType = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
};

type detailProductType = {
  stock: number;
  id: number;
  description: string;
  category: string;
  name: string;
  price: number;
  image: string;
};

const heroes = [
  {
    id: 1,
    imageUrl:
      "https://www.adidas.co.id/media/scandiweb/slider/s/s/ss24-yeezy-hp-mh-500-stone-taupe-d.png",
    title: "YEZZY 500 STONE TAUPE",
    imageAlt: "YEZZY 500 STONE TAUPE",
    buttonUrl: "#",
    isButtonDark: true,
  },
  {
    id: 2,
    imageUrl:
      "https://www.adidas.co.id/media/scandiweb/slider/h/p/hp_glp_masthead_desktop_1920x720px_2.jpg",
    title: "KOLEKSI ADADEH BALI",
    imageAlt: "BALI",
    buttonUrl: "#",
    isButtonDark: false,
  },
  {
    id: 3,
    imageUrl:
      "https://www.adidas.co.id/media/scandiweb/slider/f/o/football-ss24-eurocopa-eurocopacombined-onsite-mh-d.jpg",
    title: "KOLEKSI JERSEY ADADEH 2024",
    imageAlt: "JERSEY",
    buttonUrl: "#",
    isButtonDark: false,
  },
];
const categories: Categories[] = [
  {
    name: "LIFESTYLE",
    image_url:
      "https://images.pexels.com/photos/2041832/pexels-photo-2041832.jpeg",
  },
  {
    name: "SPORTS",
    image_url:
      "https://images.pexels.com/photos/220383/pexels-photo-220383.jpeg",
  },
  {
    name: "OUTDOOR",
    image_url:
      "https://images.pexels.com/photos/2346018/pexels-photo-2346018.jpeg",
  },
];
type Categories = {
  name: string;
  image_url: string;
};
type categoriesType = {
  name: string;
  id: string;
};

export { nav, heroes, products, categories };
export type { navType, productsType, categoriesType, detailProductType };
