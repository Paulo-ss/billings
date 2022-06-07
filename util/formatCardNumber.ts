const formatCardNumber = (cardNumber: string) => {
  const numbers = cardNumber.split("");

  let formattedNumber = "";

  numbers.forEach((number, index) => {
    if (index % 4 === 0) {
      formattedNumber += " ";
      formattedNumber += number;
      return;
    }

    formattedNumber += number;
  });

  return formattedNumber;
};

export default formatCardNumber;
