const formatCardNumber = (cardNumber: string) => {
  const numbers = cardNumber.split("");

  let formattedNumber = "";

  numbers.forEach((number, index) => {
    if ((index + 1) % 4 === 0) {
      formattedNumber += number;
      formattedNumber += " ";
      return;
    }

    formattedNumber += number;
  });

  return formattedNumber;
};

export default formatCardNumber;
