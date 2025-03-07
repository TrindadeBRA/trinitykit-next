function TranslateInit() {
  // Verifica se existe cookie de tradução
  const googtrans = document.cookie.match(/(^|;)\s*googtrans\s*=\s*([^;]+)/);
  
  // Se não existir cookie ou o idioma for português, não inicializa o tradutor
  if (!googtrans || googtrans[2] === '/auto/pt') {
    return;
  }
  
  new google.translate.TranslateElement();
} 