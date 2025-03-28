import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import PoliticalContent from "@/src/components/PoliticalContent";

export const metadata = {
  title: 'Politica e Privacidade | Tiken',
  description: 'A Tiken é uma empresa de química que oferece soluções inovadoras para o mercado. Nossa política de privacidade explica como coletamos, usamos e protegemos seus dados pessoais.',
}

export default function PoliticaPrivacidade() {
  return (
    <>
      <PoliticalContent />
      <ContactItems />
      <PinMap />
    </>
  );
}