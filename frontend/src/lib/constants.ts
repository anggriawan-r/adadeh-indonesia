const nav = ["PRIA", "WANITA", "ANAK", "OLAHRAGA"] as const;
type navType = typeof nav;

const products: productsType[] = [
  {
    category: "Wanita Lifestyle",
    name: "SANDAL MEHANA",
    price: "Rp. 1.300.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/g/ig3537_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Wanita Lifestyle",
    name: "SLIDES ADILETTE 22 XLG",
    price: "Rp. 1.300.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5650_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Wanita Lifestyle",
    name: "SEPATU MULE ADIFOM STAN SMITH",
    price: "Rp. 1.200.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie0483_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Wanita Lifestyle",
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

export { nav, products, heroes };
export type { navType, productsType };
