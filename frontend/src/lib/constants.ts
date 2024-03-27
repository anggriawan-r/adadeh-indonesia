export const protectedRoutes = ["/user", "/cart", "/wishlist", "/transaction"];
export const loginRoutes = ["/auth/signin", "/auth/signup"];

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
    name: "COUNTRY OG LOW TRAINERS",
    price: 2200000,
    image:
      "https://www.adidas.co.id/media/catalog/product/i/d/id3545_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    id: 6,
    name: "SEPATU GAZELLE",
    price: 1700000,
    category: "Lifestyle",
    image:
      "https://www.adidas.co.id/media/catalog/product/b/b/bb5478_sl_ecom.jpg",
  },
  {
    id: 7,
    name: "SEPATU SUPERNOVA STRIDE",
    price: 1900000,
    category: "Running",
    image:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig8317_2_footwear_photography_side20lateral20view_grey.jpg",
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
    buttonUrl: "/catalogue",
    isButtonDark: true,
  },
  {
    id: 2,
    imageUrl: "superbounce.jpg",
    title: "ULTRABOUNCE",
    imageAlt: "ULTRABOUNCE",
    buttonUrl: "/catalogue",
    isButtonDark: true,
  },
  {
    id: 3,
    imageUrl: "ultraboost.jpg",
    title: "ULTRABOOST",
    imageAlt: "ULTRABOOST",
    buttonUrl: "/catalogue",
    isButtonDark: true,
  },
];
const categories: Categories[] = [
  {
    id: 1,
    name: "Lifestyle",
    image_url:
      "https://images.pexels.com/photos/2041832/pexels-photo-2041832.jpeg",
  },
  {
    id: 4,
    name: "Basket",
    image_url:
      "https://images.pexels.com/photos/220383/pexels-photo-220383.jpeg",
  },
  {
    id: 3,
    name: "Outdoor",
    image_url:
      "https://images.pexels.com/photos/2346018/pexels-photo-2346018.jpeg",
  },
];
type Categories = {
  name: string;
  image_url: string;
  id: number;
};
type categoriesType = {
  name: string;
  id: number;
  image_url: string;
};

type wishListType = {
  id: number;
  name: string;
  stock: number;
  price: number;
  image: number;
};
export { nav, heroes, products, categories };
export type {
  wishListType,
  navType,
  productsType,
  categoriesType,
  detailProductType,
};
