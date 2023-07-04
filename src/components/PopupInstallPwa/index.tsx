import styles from './styles.module.css';
import { SetStateAction, useEffect, useState } from 'react';

export const PopupInstallPwa = () => {
  const [isActive, setIsActive] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<SetStateAction<any>>();

  useEffect(() => {
    const isPopupDisplayed = localStorage.getItem('popupDisplayed');
  if (!isPopupDisplayed) {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Impedir que o mini-infobar apareça no celular
      e.preventDefault();
      // Armazena o evento para poder ser acionado mais tarde.
      setDeferredPrompt(e);
      // Atualizar a interface e notificar o usuário de que pode instalar o PWA
      setIsActive(true);
    });
  }
  }, []);

  const closePopup = () =>{
    localStorage.setItem('popupDisplayed', true.toString());
    setIsActive(false);
  } 

  const handleInstallPwa = () => {
    closePopup();
  
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
  
    // Aguarde o usuário responder ao prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Você aceitou a instalação do App');
        // Define o estado no localStorage para indicar que o pop-up já foi exibido
        localStorage.setItem('popupDisplayed', true.toString());
      } else {
        console.log('Infelizmente você não aceitou a instalação do App, pressione "ctrl + F5" e tente novamente');
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