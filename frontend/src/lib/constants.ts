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
  {
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: "Rp. 840.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: "Rp. 840.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
  },
  {
    category: "Lifestyle",
    name: "SLIDES ADILETTE 22",
    price: "Rp. 840.000",
    image_url:
      "https://www.adidas.co.id/media/catalog/product/i/e/ie5645_2_footwear_photography_side20lateral20view_grey.jpg",
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

const categories: categoriesType[] = [
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
type categoriesType = {
  name: string;
  image_url: string;
};

export { nav, products, categories };
export type { navType, productsType, categoriesType };
