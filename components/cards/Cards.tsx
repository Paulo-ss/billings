import { AnimatePresence } from "framer-motion";
import { FC, useContext, useState } from "react";
import { PricesVisibility } from "../../contexts/PricesVisibility";
import useFetch from "../../hooks/useFetch";
import { CardObject, NotificationProps } from "../../interfaces/Interfaces";
import CardsForm from "../forms/CardsForm/CardsForm";
import IconButton from "../util/iconButton/IconButton";
import Loading from "../util/loading/Loading";
import Modal from "../util/modal/Modal";
import Notification from "../util/notification/Notification";
import Card from "./Card";
import styles from "./Cards.module.scss";

interface Props {
  cardsServer: CardObject[];
}

const Cards: FC<Props> = ({ cardsServer }) => {
  const [cards, setCards] = useState<CardObject[] | null>(cardsServer);
  const { loading, fetchData } = useFetch();
  const [showNotification, setShowNotification] =
    useState<NotificationProps | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { showPrices, toggleShowPrices } = useContext(PricesVisibility);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const updateCards = (cards: CardObject[]) => {
    setCards(cards.reverse());
  };

  const openNotification = (notification: NotificationProps) => {
    setShowNotification(notification);
  };

  const closeNotification = () => {
    setShowNotification(null);
  };

  return (
    <>
      <section className={styles.cards}>
        <div className={styles.cardsHeader}>
          <h1 className={styles.title}>Seus cartões</h1>

          <div className={styles.buttons}>
            {showPrices ? (
              <IconButton
                color="purple"
                iconCode="visibility"
                onClick={toggleShowPrices}
              />
            ) : (
              <IconButton
                color="purple"
                iconCode="visibility_off"
                onClick={toggleShowPrices}
              />
            )}

            <IconButton
              color="success"
              iconCode="add_circle"
              onClick={openModal}
            />
          </div>
        </div>

        {cards && cards.length ? (
          cards.map((card) => (
            <Card
              {...card}
              key={card.id}
              fetchData={fetchData}
              updateCards={updateCards}
              openNotification={openNotification}
            />
          ))
        ) : (
          <p className={styles.noCards}>
            Você ainda não tem cartões cadastrados!
          </p>
        )}
      </section>

      <AnimatePresence>
        {isModalOpened && (
          <Modal closeModal={closeModal} padding>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Cadastrar cartão</h3>

              <CardsForm
                fetchData={fetchData}
                updateCards={updateCards}
                openNotification={openNotification}
                fetchOptions={{
                  url: "https://meus-gastos-server.herokuapp.com/card",
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                }}
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && (
          <Notification
            {...showNotification}
            closeNotification={closeNotification}
          />
        )}
      </AnimatePresence>

      {loading && <Loading />}
    </>
  );
};

export default Cards;
