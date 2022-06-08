import styles from "./Expense.module.scss";
import { FC, useContext, useState } from "react";
import {
  ExpenseObject,
  FetchOptions,
  NotificationProps,
} from "../../interfaces/Interfaces";
import IconButton from "../util/iconButton/IconButton";
import formatPrice from "../../util/formatPrice";
import ExpensesForm from "../forms/ExpensesForm/ExpensesForm";
import { AnimatePresence } from "framer-motion";
import Modal from "../util/modal/Modal";
import formatCardNumber from "../../util/formatCardNumber";
import { TogglePrices } from "../../contexts/TogglePrices";
import HidePrice from "../util/hidePrice/HidePrice";

interface Props {
  fetchData: (url: string, options?: FetchOptions | undefined) => Promise<any>;
  updateExpenses: (expenses: ExpenseObject[]) => void;
  openNotification: (notification: NotificationProps) => void;
}

const Expense: FC<ExpenseObject & Props> = ({
  id,
  installmentValue,
  installmentAmount,
  name,
  startDate,
  cardId,
  fetchData,
  updateExpenses,
  openNotification,
}) => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { showPrices } = useContext(TogglePrices);

  const toggleEditMode = () => {
    setIsEditModeOn((state) => !state);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const deleteExpense = async (id: number) => {
    await fetchData(`https://meus-gastos-server.herokuapp.com/expenses/${id}`, {
      method: "DELETE",
    });

    const expenses = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/expenses"
    )) as ExpenseObject[];

    updateExpenses(expenses);

    openNotification({
      color: "success",
      message: "Despesa deletada com sucesso!",
    });
  };

  return (
    <div
      key={id}
      className={`${styles.expense} ${isEditModeOn && styles.editMode}`}
    >
      <div className={styles.info}>
        <span
          className="material-symbols-outlined"
          style={{ color: "#820AD1" }}
        >
          paid
        </span>

        <div>
          <p className={styles.name}>{name}</p>

          {isEditModeOn ? (
            <ExpensesForm
              fetchData={fetchData}
              updateExpenses={updateExpenses}
              openNotification={openNotification}
              fetchOptions={{
                url: `https://meus-gastos-server.herokuapp.com/expenses/${id}`,
                method: "PATCH",
                headers: {
                  "content-type": "application/json",
                },
              }}
              nameInitial={name}
              installmentValueInitial={String(installmentValue)}
              cardIdInitial={String(cardId)}
            />
          ) : (
            <>
              <p>
                {showPrices ? formatPrice(installmentValue) : <HidePrice />}
              </p>
              <p>
                Parcelas: {showPrices ? `${installmentAmount}x` : <HidePrice />}
              </p>
              <p className={styles.date}>Data: {startDate}</p>
              <p>Cartão: {formatCardNumber(String(cardId))}</p>
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
                Deseja realmente excluir essa despesa?
              </h3>

              <div className={styles.buttons}>
                <IconButton
                  color="danger"
                  iconCode="cancel"
                  onClick={closeModal}
                />
                <IconButton
                  color="success"
                  iconCode="check_circle"
                  onClick={() => deleteExpense(id)}
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
