export const protectedRoutes = ["/user", "/cart", "/wishlist"];
export const loginRoutes = ["/auth/signin", "/auth/signup"];

const nav = ["LIFESTYLE", "SPORTS", "OUTDOOR", "SLIDES", "ESSENTIALS"] as const;
type navType = typeof nav;

const products: productsType[] = [
  {
    category: "Lifestyle",
    name: "SANDAL MEHANA",
    price: "Rp. 1.300.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22 XLG",
    price: "Rp. 1.300.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5650_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Lifestyle",
    name: "SEPATU MULE ADIFOM STAN SMITH",
    price: "Rp. 1.200.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie0483_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: "Rp. 840.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
];
type productsType = {
  category: string;
  name: string;
  price: string;
  image_url: string;
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
    id: 2,
    imageUrl: "ultraboost.jpg",
    title: "ULTRABOOST",
    imageAlt: "ULTRABOOST",
    buttonUrl: "/catalogue",
    isButtonDark: true,
  },
];

const categories: categoriesType[] = [
  {
    name: "LIFESTYLE",
    image_url:
      "https://images.pexels.com/photos/2041832/pexels-photo-2041832.jpeg",
  },
  {
    name: "BASKET",
    image_url:
      "https://images.pexels.com/photos/220383/pexels-photo-220383.jpeg",
  },
  {
    name: "OUTDOOR",
    image_url:
      "https://images.pexels.com/photos/2346018/pexels-photo-2346018.jpeg",
  },
];
type categoriesType = {
  name: string;
  image_url: string;
};

export { nav, products, categories, heroes };
export type { navType, productsType, categoriesType };
