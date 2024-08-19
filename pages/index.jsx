import { MainBanner } from "@/components";
import Seo from "@/components/Seo/Seo";
import Image from "next/image";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// har bir pageni SSR qilamiz
export default function Home() {
  return (
    <>
      <Seo />
      <MainBanner />
    </>
  );
}
