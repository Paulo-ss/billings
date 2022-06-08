import type { NextPage } from "next";
import Head from "next/head";
import Expenses from "../components/expenses/Expenses";
import { ExpenseObject } from "../interfaces/Interfaces";

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

      <Expenses expensesArray={expenses} />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://meus-gastos-server.herokuapp.com/expenses");
  const data = (await res.json()) as ExpenseObject[];
  const expenses = data.reverse();

  return {
    props: {
      expenses,
    },
  };
}

export default Home;
