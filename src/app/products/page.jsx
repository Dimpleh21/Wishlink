// app/products/page.tsx
import { Suspense } from "react";
import ProdComp from "../components/ProdComp";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading room products...</div>}>
      <ProdComp />
    </Suspense>
  );
}
