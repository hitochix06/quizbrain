"use client";

import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/utils/all";
import Animation from "../lotties/quiz.json";
import Lottie from "lottie-react";

export default async function Home() {
  return (
    <div className="flex flex-col lg:flex-row mt-10 lg:mt-0 lg:items-center justify-center max-w-screen-lg w-full m-auto px-4">
      <div className="lg:w-1/2">
        <Lottie animationData={Animation} />
      </div>
      <div className="lg:w-1/2">
        <h1 className="text-center">
          Choisi ton <span className="outlined px-2">thème</span> ?
        </h1>
        <div className="flex flex-col  gap-4 mt-5">
          {categories.map((el, i) => (
            <CategoryCard key={i} index={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}
