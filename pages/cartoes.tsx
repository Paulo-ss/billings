import type { NextPage } from "next";
import Head from "next/head";
import { CardObject } from "../interfaces/Interfaces";
import Cards from "../components/cards/Cards";

const Cartoes: NextPage<{ cards: CardObject[] }> = ({ cards }) => {
  return (
    <>
      <Head>
        <title>Seus cartões - Billings</title>
        <meta
          name="description"
          content="O app para gerenciar sua vida financeira"
        />
      </Head>

      <Cards cardsArray={cards.reverse()} />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://meus-gastos-server.herokuapp.com/card");
  const data = (await res.json()) as CardObject[];

  return {
    props: {
      cards: data,
    },
  };
}

export default Cartoes;
