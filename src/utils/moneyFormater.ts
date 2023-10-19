export function formatMoney(
  amount: number | string,
  decimalCount: number = 2,
  decimal: string = ",",
  thousands: string = "."
): string {
  try {
    // Ensure decimalCount is a positive integer
    decimalCount = Math.abs(Math.round(decimalCount));

    // Check if the amount is negative
    const isNegative = typeof amount === "number" && amount < 0;
    const absoluteAmount = Math.abs(Number(amount) || 0);

    // Format the integer part of the amount
    let integerPart = parseInt(absoluteAmount.toFixed(decimalCount)).toString();

    // Determine where to insert thousands separators
    const thousandsSeparatorPosition =
      integerPart.length > 3 ? integerPart.length % 3 : 0;

    // Build the formatted string
    let formattedAmount = isNegative ? "-" : "";

    formattedAmount += thousandsSeparatorPosition
      ? integerPart.slice(0, thousandsSeparatorPosition) + thousands
      : "";
    formattedAmount += integerPart
      .slice(thousandsSeparatorPosition)
      .replace(/(\d{3})(?=\d)/g, "$1" + thousands);

    if (decimalCount) {
      formattedAmount +=
        decimal +
        Math.abs(Number(amount) - parseInt(integerPart))
          .toFixed(decimalCount)
          .slice(2);
    }

    return formattedAmount;
  } catch (error) {
    console.error(error);
    return ""; // Return an empty string in case of an error
  }
}
