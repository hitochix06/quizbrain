import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/utils/all";

export default async function Home() {
  return (
    <div className="grow flex mt-10 lg:mt-0 lg:items-center justify-center max-w-screen-lg w-full m-auto px-4">
      <div className="w-full">
        <h1 className="text-center">
          Choisi ton <span className="outlined px-2">thème</span> ?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {categories.map((el, i) => (
            <CategoryCard key={i} index={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}
