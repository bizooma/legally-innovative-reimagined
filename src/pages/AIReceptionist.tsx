import { useEffect } from "react";
import ProductPage from "@/pages/products/ProductLayout";
import { ava } from "@/content/products/ava";
import { trackServiceView } from "@/utils/gtmTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

/** /ai-receptionist — Ava, rendered on the shared product layout. */
const AIReceptionist = () => {
  useEffect(() => { window.scrollTo(0, 0); trackServiceView('AI Receptionist'); }, []);
  useScrollTracking({ pageName: 'AI Receptionist' });
  return <ProductPage content={ava} />;
};
export default AIReceptionist;
