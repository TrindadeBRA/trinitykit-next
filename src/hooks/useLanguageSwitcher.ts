import { useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";

export const COOKIE_NAME = "googtrans";

export interface LanguageDescriptor {
  name: string;
  title: string;
  flag: string;
}

export interface LanguageConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
}

export const getLanguageConfig = (): LanguageConfig | undefined => {
  let cfg: LanguageConfig | undefined;

  if (process.env.GOOGLE_TRANSLATION_CONFIG) {
    try {
      cfg = JSON.parse(process.env.GOOGLE_TRANSLATION_CONFIG ?? "{}");
    } catch (e) {
      console.error("Erro ao parsear a configuração de tradução:", e);
    }
  }

  return cfg;
};

export const useLanguageSwitcher = ({ context }: { context?: NextPageContext } = {}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    const cfg = getLanguageConfig();
    const cookies = parseCookies(context);
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue = "";
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (cfg && !languageValue) {
      languageValue = cfg.defaultLanguage;
    }
    setCurrentLanguage(languageValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLanguage = (lang: string) => () => {
    try {
      const domain = window.location.hostname.split('.').slice(-2).join('.');
      
      // Se for português, remove todos os cookies de tradução
      if (lang === 'pt') {
        // Remove cookie do domínio principal (.resumodolivro.com)
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
          domain: '.' + domain,
        });

        // Remove cookie do subdomínio específico (beta.resumodolivro.com)
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
          domain: window.location.hostname,
        });

        // Remove cookie sem domínio específico
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
        });

        window.location.reload();
        return;
      }

      // Para outros idiomas, mantém o comportamento atual
      destroyCookie(context, COOKIE_NAME, { path: '/' });
      setCookie(context, COOKIE_NAME, "/auto/" + lang, {
        path: '/',
        domain: '.' + domain,
        sameSite: 'lax',
        secure: true
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao trocar idioma:", error);
    }
  };

  return {
    currentLanguage,
    switchLanguage,
    languageConfig: getLanguageConfig(),
  };
}; 