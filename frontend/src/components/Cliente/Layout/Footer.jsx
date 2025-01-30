const Footer = () => {
  const numeroWhatsApp = "558598121-6480";
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp.replace(/\D/g, "")}`;

  return (
    <footer className="sticky bottom-0 z-50 bg-neutral text-neutral-content py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 Prato Digital - Todos os direitos reservados</p>
        <div className="mt-2">
          <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-success btn-sm">
              <span>Fale conosco no WhatsApp</span>
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
