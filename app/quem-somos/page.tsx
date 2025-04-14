import AboutHero from "@/src/components/AboutHero";
import ContactItems from "@/src/components/ContactItems";
import OurMission from "@/src/components/OurMission";
import OurPeople from "@/src/components/OurPeople";
import PinMap from "@/src/components/PinMap";

export const metadata = {
  title: 'Tiken - Quem somos',
  description: 'Conheça a Tiken: excelência em especialidades químicas, com foco em inovação, sustentabilidade e compromisso. Inove seu mundo!',
}

export default function QuemSomos() {
  return (
    <>
      <AboutHero />
      <OurMission />
      <OurPeople />
      <ContactItems />
      <PinMap />
    </>
  );
}