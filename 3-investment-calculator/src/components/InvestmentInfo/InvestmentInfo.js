const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const InvestmentInfo = (props) => {
  return (
    <tr>
      <td>{props.info.year}</td>
      <td>{formatter.format(props.info.savingsEndOfYear)}</td>
      <td>{props.info.yearlyInterest.toFixed(2)}</td>
      <td>
        {formatter.format(
          props.info.savingsEndOfYear -
            props.initialInvestment -
            props.info.yearlyContribution * props.info.year
        )}
      </td>
      <td>
        {formatter.format(
          props.initialInvestment +
            props.info.yearlyContribution * props.info.year
        )}
      </td>
    </tr>
  );
};

export default InvestmentInfo;
