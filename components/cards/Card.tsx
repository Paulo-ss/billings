import styles from "./Card.module.scss";
import { FC, useContext, useState } from "react";
import {
  CardObject,
  FetchOptions,
  NotificationProps,
} from "../../interfaces/Interfaces";
import IconButton from "../util/iconButton/IconButton";
import formatPrice from "../../util/formatPrice";
import CardsForm from "../forms/CardsForm/CardsForm";
import { AnimatePresence } from "framer-motion";
import Modal from "../util/modal/Modal";
import formatCardNumber from "../../util/formatCardNumber";
import { PricesVisibility } from "../../contexts/PricesVisibility";
import HidePrice from "../util/hidePrice/HidePrice";

interface Props {
  fetchData: (url: string, options?: FetchOptions | undefined) => Promise<any>;
  updateCards: (expenses: CardObject[]) => void;
  openNotification: (notification: NotificationProps) => void;
}

const Expense: FC<CardObject & Props> = ({
  id,
  name,
  limit,
  expirationDay,
  fetchData,
  updateCards,
  openNotification,
}) => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { showPrices } = useContext(PricesVisibility);

  const toggleEditMode = () => {
    setIsEditModeOn((state) => !state);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const deleteCard = async () => {
    await fetchData(`https://meus-gastos-server.herokuapp.com/card/${id}`, {
      method: "DELETE",
    });

    const expenses = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/card"
    )) as CardObject[];

    updateCards(expenses);

    openNotification({
      color: "success",
      message: "Cartão deletado com sucesso!",
    });
  };

  return (
    <div
      key={id}
      className={`${styles.card} ${isEditModeOn && styles.editMode}`}
    >
      <div className={styles.info}>
        <span
          className="material-symbols-outlined"
          style={{ color: "#820AD1" }}
        >
          credit_card
        </span>

        <div>
          {isEditModeOn ? (
            <CardsForm
              fetchData={fetchData}
              updateCards={updateCards}
              openNotification={openNotification}
              fetchOptions={{
                url: `https://meus-gastos-server.herokuapp.com/card/${id}`,
                method: "PATCH",
                headers: {
                  "content-type": "application/json",
                },
              }}
              cardIdInitial={String(id)}
              nameInitial={name}
              limitInitial={String(limit)}
              expirationDayInitial={String(expirationDay)}
            />
          ) : (
            <>
              <p className={styles.name}>{name}</p>
              <p>{formatCardNumber(id)}</p>
              <p>Limite: {showPrices ? formatPrice(limit) : <HidePrice />}</p>
              <p>Dia do vencimento: {expirationDay}</p>
            </>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {isEditModeOn ? (
          <IconButton
            color="danger"
            iconCode="cancel"
            onClick={toggleEditMode}
          />
        ) : (
          <>
            <IconButton color="info" iconCode="edit" onClick={toggleEditMode} />
            <IconButton
              color="danger"
              iconCode="delete_forever"
              onClick={openModal}
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {isModalOpened && (
          <Modal closeModal={closeModal} padding>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>
                Deseja realmente <br /> excluir o cartão <br />{" "}
                {formatCardNumber(id)}?
              </h3>

              <p>Você não poderá alterar mais as despesas relacionadas a ele</p>

              <div className={styles.buttons}>
                <IconButton
                  color="danger"
                  iconCode="cancel"
                  onClick={closeModal}
                />
                <IconButton
                  color="success"
                  iconCode="check_circle"
                  onClick={() => deleteCard()}
                />
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Expense;
