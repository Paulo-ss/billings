import { FC, FormEvent, useState } from "react";
import Input from "../../util/input/Input";
import {
  CardObject,
  FetchOptions,
  NotificationProps,
} from "../../../interfaces/Interfaces";
import Button from "../../util/button/Button";

interface Props {
  fetchData: (url: string, options?: FetchOptions | undefined) => Promise<any>;
  updateCards: (expenses: CardObject[]) => void;
  openNotification: (notification: NotificationProps) => void;
  fetchOptions: FetchOptions & { url: string };
  cardIdInitial?: string;
  nameInitial?: string;
  limitInitial?: string;
  expirationDayInitial?: string;
}

const ExpensesForm: FC<Props> = ({
  fetchData,
  updateCards,
  openNotification,
  fetchOptions,
  cardIdInitial,
  nameInitial,
  limitInitial,
  expirationDayInitial,
}) => {
  const [cardId, setCardId] = useState(cardIdInitial ? cardIdInitial : "");
  const [name, setName] = useState(nameInitial ? nameInitial : "");
  const [limit, setLimit] = useState(limitInitial ? limitInitial : "");
  const [expirationDay, setExpirationDay] = useState(
    expirationDayInitial ? expirationDayInitial : ""
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      id: cardId,
      name,
      limit: Number(limit),
      expirationDay: Number(expirationDay),
    };

    const cards = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/card"
    )) as CardObject[];

    const card = cards.find(({ id }) => id === cardId);

    if (card) {
      openNotification({
        color: "danger",
        message: "Esse número de cartão já está cadastrado!",
      });
      return;
    }

    await fetchData(fetchOptions.url, {
      method: fetchOptions.method,
      headers: fetchOptions.headers,
      body: JSON.stringify(body),
    });

    const expenses = (await fetchData(
      "https://meus-gastos-server.herokuapp.com/card"
    )) as CardObject[];

    updateCards(expenses);

    const notificationMessage =
      fetchOptions.method === "POST"
        ? "Cartão criado com sucesso!"
        : "Dados do cartão atualizados com sucesso!";

    openNotification({
      color: "success",
      message: notificationMessage,
    });
  };

  const numberInputChange = async (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const regexp = new RegExp(/^[0-9\.]*$/g);

    if (!regexp.test(value)) {
      e.preventDefault();
      return;
    }

    if (name === "cardId") {
      setCardId(value);
      return;
    }

    if (name === "limit") {
      setLimit(value);
      return;
    }

    if (name === "expirationDay") {
      setExpirationDay(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="cardId"
        type="text"
        label="Número do cartão"
        minLength={16}
        maxLength={16}
        value={cardId}
        onChange={numberInputChange}
      />
      <Input
        id="name"
        type="text"
        label="Nome do cartão"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Input
        id="limit"
        type="text"
        label="Limite do cartão"
        value={limit}
        onChange={numberInputChange}
      />
      <Input
        id="expirationDay"
        type="number"
        min={1}
        max={31}
        label="Dia do vencimento"
        value={expirationDay}
        onChange={numberInputChange}
      />

      <Button
        type="submit"
        title={
          fetchOptions.method === "PATCH"
            ? "Atualizar cartão"
            : "Adicionar cartão"
        }
      />
    </form>
  );
};

export default ExpensesForm;
