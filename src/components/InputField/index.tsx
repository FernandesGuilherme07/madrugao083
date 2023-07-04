import styles from "./styles.module.css";
import EyeOff from './EyeOff.svg';
import EyeOn from './EyeOn.svg';
import { useState } from "react";
import { observer } from "mobx-react-lite";

type Props = {
    color: string;
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
    password?: boolean;
    warning?: boolean;
}


export const InputField = observer(({ color, placeholder, value, onChange, password, warning }: Props) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const formatCEP = (cep: string) => {
      // Remove qualquer caractere que não seja número
      const numericCep = cep.replace(/\D/g, '');
  
      // Aplica a máscara de CEP: 99999-999
      const formattedCep = numericCep.replace(/(\d{5})(\d{3})/, '$1-$2');
  
      return formattedCep;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
  
      if (placeholder === 'Digite seu CEP') {
        newValue = formatCEP(newValue);
      }

      if (placeholder === 'Digite seu CEP' && newValue.length > 8) {
        newValue = newValue.slice(0, 9);
      }
  
      onChange(newValue);
    };
  
    return (
      <div
        className={styles.container}
        style={{
          borderColor: !warning ? (focused ? color : "#F9F9FB") : "#FF0000",
          backgroundColor: focused ? "#FFF" : "#F9F9FB",
        }}
      >
        <input
          className={styles.input}
          type={password ? (showPassword ? "text" : "password") : "text"}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
  
        {password && (
          <div
            className={styles.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword && <EyeOn color="#BBB" />}
            {!showPassword && <EyeOff color="#BBB" />}
          </div>
        )}
      </div>
    );
  });
  