import { LanguageDescriptor, useLanguageSwitcher } from "@/src/hooks/useLanguageSwitcher";
import { NextPageContext } from "next";

export const LanguageSwitcher = ({ context }: { context?: NextPageContext } = {}) => {
  const { currentLanguage, switchLanguage, languageConfig } = useLanguageSwitcher({ context });

  if (!languageConfig) {
    return null;
  }

  return (
    <div className="text-center notranslate text-base lg:text-2xl flex gap-x-2 mr-4">
      {languageConfig.languages.map((ld: LanguageDescriptor) => (
        <span key={`l_s_${ld.name}`}>
          {currentLanguage === ld.name ? (
            <span className="cursor-not-allowed text-red-500">{ld.name.toUpperCase()}</span>
          ) : (
            <a onClick={switchLanguage(ld.name)} className="cursor-pointer">
              {ld.name.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 