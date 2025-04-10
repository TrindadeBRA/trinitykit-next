import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import WorkWithUs from "@/src/components/WorkWithUs";

export const metadata = {
  title: 'Trabalhe Conosco | Tiken',
  description: 'Trabalhe conosco e faça parte do nosso time.',
}

export default function TrabalheConosco() {
  return (
    <>
      <WorkWithUs />
      <ContactItems />
      <PinMap />
    </>
  );
}