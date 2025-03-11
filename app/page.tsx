import ContactItems from "@/src/components/ContactItems";
import DiscoverOurProducts from "@/src/components/DIscoverOurProducts";
import ExcellenceRecognition from "@/src/components/ExcellenceRecognition";
import Hero from "@/src/components/Hero";
import Markets from "@/src/components/Markets";
import OurBlog from "@/src/components/OurBlog";
import OurPurpose from "@/src/components/OurPurpose";
import PinMap from "@/src/components/PinMap";
import TalkToUs from "@/src/components/TalkToUs";

export const metadata = {
  title: 'Tiken - Home',
  description: 'Tiken é uma empresa que cria soluções para o mundo através da química',
}

export default function Home() {
  
  return (
    <>
      <Hero />
      <ExcellenceRecognition />
      <OurPurpose />
      <DiscoverOurProducts />
      <Markets />
      <TalkToUs />
      <OurBlog />
      <ContactItems />
      <PinMap />
    </>
  );
}
