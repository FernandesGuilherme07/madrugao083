import { UniqueIdGenerator } from 'src/utils/UniqueIdGenerator';
import { useState, useContext, useEffect } from 'react';
import { FaMoneyBillAlt, FaCreditCard } from "react-icons/fa";
import { MdPix } from "react-icons/md";
import styles from './ModalCheckout.module.css';
import { Button } from '../Button';
import { observer } from 'mobx-react-lite';
import { cartContext } from 'src/contexts/CartContext';
import { formatter } from 'src/utils/formatter';
import { formatMinutesToHours } from 'src/utils/formatMinutesToHours';
import { useRouter } from 'next/router';
import { establishmentMock } from 'src/mocks/establishmentMock';
import { LoadingApp } from '../LoadingApp/LoadingApp';

require('dotenv').config();

type Props = {
  shippingAddress: string;
  shippingTime: number;
  shippingPrice: number;
  onClose: () => void;
};

type FormData = Record<string, any>;

export const ModalCheckout = observer(({ onClose, shippingAddress, shippingTime, shippingPrice }: Props) => {
  const useFormatter = formatter();
  const { itens, totalPrice, ClearCart } = useContext(cartContext);
  const [enableButtom, setEnableButtom] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    addressNumber: "",
    complement: "",
    reference: "",
    contactNumber: "",
    name: "",
    paymentMethod: "",
    changeOption: false,
    changeAmount: "",
  });
  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    const isFormValid = validateForm();
    isFormValid ? setEnableButtom(true) : setEnableButtom(false);
  },[formData]);

  const buildMensagemEncoded = () => {
    const itemsMessage = itens.map((item) => {
      const aditionalsMessage = item.aditionals
        ? item.aditionals
            .map((aditional) => `${aditional.name} - ${useFormatter.formatPrice(aditional.price)}`)
            .join(", ")
        : "";
  
      return `
Produto: ${item.prdouctName}
Quantidade: ${item.qt}
Preço: ${useFormatter.formatPrice(item.productPrice)}
Adicionais: ${aditionalsMessage ?? "---" }
  `;
    });
  
    const trocoMessage =
      formData.paymentMethod === "dinheiro"
        ? `Troco para: ${formData.changeAmount}`
        : "";
  
    const mensagem = `Pedido Nº ${UniqueIdGenerator.generateUniqueId()}:
  
Nome: ${formData.name}
Endereço: ${shippingAddress}, ${formData.addressNumber} ${formData.complement}
Ponto de referência: ${formData.reference}
Tempo de entrega: ${formatMinutesToHours(shippingTime)}
Tipo de pagamento: ${formData.paymentMethod}
${trocoMessage}

Itens:
${itemsMessage.join("\n")}
Subtotal: ${useFormatter.formatPrice(totalPrice)}
Preço da entrega: ${useFormatter.formatPrice(shippingPrice)}
Total: ${useFormatter.formatPrice(shippingPrice + totalPrice)}`;

  const numeroWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
      return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const router = useRouter();
  
  const handleEnviarPedido = () => {
      setLoadingVisible(true);
      setFormData({
        addressNumber: "",
        complement: "",
        reference: "",
        contactNumber: "",
        name: "",
        paymentMethod: "",
        changeOption: false,
        changeAmount: "",
      });
      setLoadingVisible(false);
      ClearCart();
      onClose();
      router.push("/");
  };
    

  const validateForm = () => {
    const requiredFields = ["name", "contactNumber", "addressNumber", "reference", "paymentMethod"];
    const isFormValid = requiredFields.every((field) => !!formData[field].trim());
    return isFormValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleEnviarPedido();
  };

  const handleButtonClick = (paymentMethod: string) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod,
    }));
  };

    return (
      <div className={`${styles.modalOverlay} ${styles.active}`}>
          {loadingVisible && (
        <LoadingApp
          isPaused={false}
          isStopped={false}
        />
      )}
        <div className={`${styles.modalContent} ${styles.active}`}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
      
          <h2>Finalização de Pedido</h2>
          <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
              <label htmlFor="name">Seu Nome</label>
              <input 
              required
              placeholder='ex: Maria José'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">Numero para contato</label>
              <input
              required
              placeholder='ex: (99) 99999-9999'
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="addressNumber">Número da residencia</label>
              <input
              required
                type="text"
                placeholder='ex: 5800'
                id="addressNumber"
                name="addressNumber"
                value={formData.addressNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complement">Complemento</label>
              <input
                  placeholder='ex: bloco 2 apt 302'
                type="text"
                id="complement"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reference">Ponto de referencia</label>
              <input
              required
              placeholder='ex: proximo a padaria são josé'
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>
        
            <div className={styles.formGroup}>
              <label>Selecione o modo de pagamento:</label>
              <div className={styles.paymentButtons}>
                <button
                  type="button"
                  style={{ background: "#23b6ff"}}
                  className={`${styles.paymentButton} ${
                    formData.paymentMethod === "pix" && styles.active
                  }`}
                  onClick={() => handleButtonClick("pix")}
                >
                  <MdPix />
                  <span style={{ marginLeft: "5px"}}>Pix</span>
                </button>

                <button
                  type="button"
                  style={{ background: "#0078b5"}}
                  className={`${styles.paymentButton} ${
                    formData.paymentMethod === "cartão" && styles.active
                  }`}
                  onClick={() =>handleButtonClick("cartão")}
                >
                  <FaCreditCard />
                  <span style={{ marginLeft: "5px"}}>Link</span>
                </button>

                <button
                  type="button"
                  style={{ background: "green"}}
                  className={`${styles.paymentButton} ${
                    formData.paymentMethod === "dinheiro" && styles.active
                  }`}
                  onClick={() => handleButtonClick( "dinheiro")}
                >
                  <FaMoneyBillAlt />
                  <span style={{ marginLeft: "5px"}}>Dinheiro</span>
                </button>
              </div>
            </div>
            
            {formData.paymentMethod === "dinheiro" && (
              <div className={styles.formGroup}>
                <label htmlFor="changeOption">Gostaria de Troco?</label>
                <input
                  type="checkbox"
                  id="changeOption"
                  name="changeOption"
                  checked={formData.changeOption}
                  onChange={handleChange}
                />
              </div>
            )}
            {formData.paymentMethod === "dinheiro" && formData.changeOption && (
              <div className={styles.formGroup}>
                <label htmlFor="changeAmount">Para Quanto?</label>
                <input
                  type="text"
                  id="changeAmount"
                  name="changeAmount"
                  value={formData.changeAmount}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className={styles.buttonArea}>
              {!enableButtom ? (
                <Button
                  color={"grey"}
                  label="Enviar Pedido"
                  onClick={() => {}}
                  disabled={!enableButtom}
                />
              ) : (
                <a
                  href={buildMensagemEncoded()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleEnviarPedido();
                  }}
                  style={{ textDecoration: "none" }}
                >                
                  <Button
                    color={establishmentMock.primaryColor}
                    label="Enviar Pedido"
                    onClick={() => {}}
                    fill
                  />
                </a>
              )}
            </div>
          </form>
        </div>
      </div>
    );
})