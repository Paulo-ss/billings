import { FC, FormEvent, useState } from "react";
import Input from "../../util/input/Input";
import {
  CardObject,
  ExpenseObject,
  FetchOptions,
  NotificationProps,
} from "../../../interfaces/Interfaces";
import Button from "../../util/button/Button";

interface Props {
  fetchData: (url: string, options?: FetchOptions | undefined) => Promise<any>;
  updateExpenses: (expenses: ExpenseObject[]) => void;
  openNotification: (notification: NotificationProps) => void;
  fetchOptions: FetchOptions & { url: string };
  nameInitial?: string;
  installmentValueInitial?: string;
  installmentAmountInitial?: string;
  cardIdInitial?: string;
}

const ExpensesForm: FC<Props> = ({
  fetchData,
  updateExpenses,
  openNotification,
  fetchOptions,
  nameInitial,
  installmentValueInitial,
  cardIdInitial,
}) => {
  const [name, setName] = useState(nameInitial ? nameInitial : "");
  const [installmentValue, setInstallmentValue] = useState(
    installmentValueInitial ? installmentValueInitial.replace(".", ",") : ""
  );
  const [installmentAmount, setInstallmentAmount] = useState(1);
  const [cardId, setCardId] = useState(cardIdInitial ? cardIdInitial : "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const date = new Date();
    const startDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const installmentValueFormatted = installmentValue.replace(",", ".");

    const body = {
      name,
      startDate,
      installmentValue: parseFloat(installmentValueFormatted),
      installmentAmount,
      cardId: cardId,
    };

    const cards = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/card"
    )) as CardObject[];

    const card = cards.find(({ id }) => id === cardId);

    if (!card) {
      openNotification({
        color: "danger",
        message: "Esse cartão não está cadastrado!",
      });
      return;
    }

    await fetchData(fetchOptions.url, {
      method: fetchOptions.method,
      headers: fetchOptions.headers,
      body: JSON.stringify(body),
    });

    const expenses = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/expenses"
    )) as ExpenseObject[];

    updateExpenses(expenses);

    const notificationMessage =
      fetchOptions.method === "POST"
        ? "Despesa criada com sucesso!"
        : "Despesa atualizada com sucesso!";

    openNotification({
      color: "success",
      message: notificationMessage,
    });
  };

  const numberInputChange = async (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const regexp = new RegExp(/^[0-9\,]*$/g);

    if (!regexp.test(value)) {
      e.preventDefault();
      return;
    }

    if (name === "installmentValue") {
      setInstallmentValue(value);
      return;
    }

    if (name === "installmentAmount") {
      setInstallmentAmount(Number(value));
      return;
    }

    if (name === "cardId") {
      setCardId(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        type="text"
        label="Nome da despesa"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Input
        id="installmentValue"
        type="text"
        label="Valor"
        value={installmentValue}
        onChange={numberInputChange}
      />
      {fetchOptions.method === "POST" && (
        <Input
          id="installmentAmount"
          type="number"
          min={1}
          max={12}
          label="Parcelas (Max: 12x)"
          value={installmentAmount}
          onChange={numberInputChange}
        />
      )}
      <Input
        id="cardId"
        type="text"
        label="Número do cartão"
        minLength={16}
        maxLength={16}
        value={cardId}
        onChange={numberInputChange}
      />

      <Button
        type="submit"
        title={
          fetchOptions.method === "PATCH"
            ? "Atualizar despesa"
            : "Adicionar despesa"
        }
      />
    </form>
  );
};

export default ExpensesForm;
