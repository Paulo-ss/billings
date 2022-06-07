import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ExpenseObject, NotificationProps } from "../../interfaces/Interfaces";
import formatPrice from "../../util/formatPrice";
import ExpensesForm from "../forms/ExpensesForm/ExpensesForm";
import IconButton from "../util/iconButton/IconButton";
import Loading from "../util/loading/Loading";
import Modal from "../util/modal/Modal";
import Notification from "../util/notification/Notification";
import Expense from "./Expense";
import styles from "./Expenses.module.scss";

interface Props {
  expensesArray: ExpenseObject[];
}

const Expenses: FC<Props> = ({ expensesArray }) => {
  const [expenses, setExpenses] = useState<ExpenseObject[] | null>(
    expensesArray
  );
  const { loading, fetchData } = useFetch();
  const [showNotification, setShowNotification] =
    useState<NotificationProps | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const updateExpenses = (expenses: ExpenseObject[]) => {
    setExpenses(expenses.reverse());
  };

  const openNotification = (notification: NotificationProps) => {
    setShowNotification(notification);
  };

  const closeNotification = () => {
    setShowNotification(null);
  };

  return (
    <>
      <section className={styles.expenses}>
        <div className={styles.expensesHeader}>
          <h1 className={styles.title}>Suas últimas despesas</h1>

          <IconButton
            color="success"
            iconCode="add_circle"
            onClick={openModal}
          />
        </div>

        {expenses && expenses.length ? (
          expenses.map((expense) => (
            <Expense
              {...expense}
              key={expense.id}
              fetchData={fetchData}
              updateExpenses={updateExpenses}
              openNotification={openNotification}
            />
          ))
        ) : (
          <p className={styles.noExpenses}>
            Você ainda não tem despesas cadastradas!
          </p>
        )}

        {expenses && expenses.length ? (
          <p className={styles.totalExpenses}>
            Total de despesas:{" "}
            <span>
              {formatPrice(
                expenses.reduce((total, expense) => {
                  return total + expense.installmentValue;
                }, 0)
              )}
            </span>
          </p>
        ) : (
          ""
        )}
      </section>

      <AnimatePresence>
        {isModalOpened && (
          <Modal closeModal={closeModal} padding>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Adicionar despesa</h3>

              <ExpensesForm
                fetchData={fetchData}
                updateExpenses={updateExpenses}
                openNotification={openNotification}
                fetchOptions={{
                  url: "https://meus-gastos-server.herokuapp.com/expenses",
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

      {showNotification && (
        <Notification
          {...showNotification}
          closeNotification={closeNotification}
        />
      )}

      {loading && <Loading />}
    </>
  );
};

export default Expenses;
