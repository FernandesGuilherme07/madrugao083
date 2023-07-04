import styles from './styles.module.css';
import { SetStateAction, useEffect, useState } from 'react';

export const PopupInstallPwa = () => {
  const [isActive, setIsActive] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<SetStateAction<any>>();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Impedir que o mini-infobar apareça no celular
      e.preventDefault();
      // Armazena o evento para poder ser acionado mais tarde.
      setDeferredPrompt(e);
      // Atualizar a interface e notificar o usuário de que pode instalar o PWA
      setIsActive(true);
    });
  }, []);

  const closePopup = () => setIsActive(false);

  const handleInstallPwa = () => {
    closePopup();

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Aguarde o usuário responder ao prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Você aceitou a instalação do App');
      } else {
        console.log(
          'Infelizmente você não aceitou a instalação do App, pressione "ctrl + F5" e tente novamente'
        );
      }
    });
  };

  return (
    <>
      {isActive && (
        <div className={styles.containerPopup}>
          <div>
            <div className={styles.containerImg}>
              <span onClick={() => closePopup()}>
                <Close />
              </span>
              <img
                src="/temp/AVATAR.png"
                width="50"
                height="50"
                alt="Madrugão083"
              />
              <img
                src="/img/logo-popup-pwa.png"
                alt="Madrugão083"
                width="240"
                height="50"
              />
            </div>
            <p>Adicione nosso App à tela inicial!</p>
            <button onClick={() => handleInstallPwa()}>Adicionar Atalho</button>
          </div>
        </div>
      )}
    </>
  );
};

const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2.6rem"
    height="2.6rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);
