
import { ProductPromotion } from "@/components/diy/ProductPromotion";
import { getAEOProductData, getTaskBossProductData } from "@/components/diy/productData";

export const ProductPromotionsSection = () => {
  const aeoProductData = getAEOProductData();
  const taskBossProductData = getTaskBossProductData();

  return (
    <>
      <ProductPromotion {...aeoProductData} />
      <ProductPromotion {...taskBossProductData} />
    </>
  );
};
