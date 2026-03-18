import BankCard from "./components/payment/BankCard";

function App() {
  const CardDataHandler = (CardData: Record<string, string>) => {
    console.log("🚀 ~ CardDataHandler ~ CardData:", CardData);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10 sm:my-20 z-4">
        <BankCard onSubmitData={CardDataHandler} />
      </div>
    </div>
  );
}

export default App;
