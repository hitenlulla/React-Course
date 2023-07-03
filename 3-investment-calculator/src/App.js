import React, { useState } from "react";
import Header from "./components/UI/Header/Header";
import InputForm from "./components/UI/InputForm/Form";
import Table from "./components/UI/Table/Table";

function App() {
  const [yearlyData, setYearlyData] = useState([]);
  const [initialInvestment, setInitialInvestment] = useState(0);

  const calculateHandler = (userInput) => {
    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    setInitialInvestment(currentSavings);
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      const calc = {
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: Number(currentSavings),
        yearlyContribution: yearlyContribution,
      };

      setYearlyData((prevData) => {
        const newData = [...prevData, calc];
        return newData;
      });
    }
  };

  const resetData = () => {
    setYearlyData([]);
  };

  return (
    <div>
      <Header />
      <InputForm onCaclulate={calculateHandler} onReset={resetData} />
      {yearlyData.length > 0 && (
        <Table yearlyData={yearlyData} initialInvestment={initialInvestment} />
      )}
    </div>
  );
}

export default App;
