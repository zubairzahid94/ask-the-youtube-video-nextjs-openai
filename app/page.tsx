import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
    <Spotlight
      className="-top-40 left-0 md:left-60 md:-top-20"
      fill="white"
    />
    <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
       Ask <br /> the Youtube Video.
      </h1>
      <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
       You can ask the youtube video the question to easily know what is talked in the video.<br/>Its like a ChatGPT for the Youtube video <br/>
       <Link href={"/home"}>
       <button type="button" className="shadow-[0_0_0_3px_#000000_inset] mt-4 px-6 py-2 bg-transparent border  dark:border-white dark:text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
  Ask
</button>
</Link>

      </p>
      
    </div>
  </div>
  );
}
