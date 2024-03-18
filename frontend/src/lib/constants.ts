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

export { nav, products };
export type { navType, productsType };
