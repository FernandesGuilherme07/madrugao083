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
                X
              </span>
              <img
                className={styles.img}
                src="/temp/AVATAR.png"
                width="50"
                height="50"
                alt="Madrugão083"
              />
            </div>
            <p>Adicione nosso App à tela inicial!</p>
            <button className={styles.button} onClick={() => handleInstallPwa()}>Adicionar Atalho</button>
          </div>
        </div>
      )}
    </>
  );
};