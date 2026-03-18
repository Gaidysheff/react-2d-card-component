import BankCard from "./components/payment/BankCard";
import { useState } from "react";

function App() {
  const [isSent, setIsSent] = useState(false);
  const CardDataHandler = (CardData: Record<string, string>) => {
    setIsSent(true);
    console.log("🚀 ~ CardDataHandler ~ CardData:", CardData);
    return new Promise((r) => setTimeout(r, 2000));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="my-10 sm:my-20 z-4">
          <BankCard onSubmitData={CardDataHandler} />
        </div>
      </div>
      {isSent && (
        <p className="text-3xl text-red-500 italic text-center">
          Данные вашей карты условно переданы на сервер
        </p>
      )}
    </>
  );
}

export default App;
