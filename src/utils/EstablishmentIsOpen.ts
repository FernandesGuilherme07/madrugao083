export const EstablishmentIsOpen = (): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda-feira, ...

    const isOpen = currentHour >= 22 || currentHour < 4;
    const isWeekday = currentDay >= 2 && currentDay <= 6; // 2 = Terça-feira, 6 = Sábado

    if (isOpen && isWeekday) {
      return true;
    } else {
      return false;
    }
  };