import styles from "./Table.module.css";
import InvestmentInfo from "../../InvestmentInfo/InvestmentInfo";

const Table = (props) => {
  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.yearlyData.map((data) => (
          <InvestmentInfo
            key={Math.random()}
            info={data}
            initialInvestment={+props.initialInvestment}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
