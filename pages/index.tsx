import type { NextPage } from "next";
import Head from "next/head";
import Expenses from "../components/expenses/Expenses";
import { ExpenseObject } from "../interfaces/Interfaces";
import formatCardNumber from "../util/formatCardNumber";

const Home: NextPage<{ expenses: ExpenseObject[] }> = ({ expenses }) => {
  return (
    <>
      <Head>
        <title>Suas despesas - Billings</title>
        <meta
          name="description"
          content="O app para gerenciar sua vida financeira"
        />
      </Head>

      <Expenses expensesArray={expenses.reverse()} />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://meus-gastos-server.herokuapp.com/expenses");
  const data = (await res.json()) as ExpenseObject[];

  return {
    props: {
      expenses: data,
    },
  };
}

export default Home;
