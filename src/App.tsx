import { useEffect, useState } from "react";

import BankCard from "./components/payment/BankCard";
import { Button } from "./components/ui/button.tsx";

function App() {
  const [isSent, setIsSent] = useState(false);

  const [hue, setHue] = useState(() => {
    const saved = localStorage.getItem("card-hue");
    return saved ? Number(saved) : 25;
  });

  const playTick = () => {
    const tick = new Audio("/public/tick.mp3");
    tick.volume = 0.1;
    tick.play().catch(() => {});
  };

  // Создаем объект стилей. Мы меняем только H (последнюю цифру)
  const dynamicTheme = {
    "--myMainColor": `oklch(0.62 0.251 ${hue})`,
    "--myMainColorLighter": `oklch(0.785 0.125 ${hue})`,
    "--myMainColorLight": `oklch(0.703 0.189 ${hue})`,
    "--myMainColorDark": `oklch(0.537 0.218 ${hue})`,
    "--myMainColorDarker": `oklch(0.455 0.184 ${hue})`,
  } as React.CSSProperties;

  const CardDataHandler = (CardData: Record<string, string>) => {
    setIsSent(true);
    console.log("🚀 ~ CardDataHandler ~ CardData:", CardData);
    return new Promise((r) => setTimeout(r, 2000));
  };

  // Сохраняем выбранный цвет при каждом изменении
  useEffect(() => {
    localStorage.setItem("card-hue", String(hue));
  }, [hue]);

  return (
    <section style={dynamicTheme}>
      <div className="flex flex-col items-center gap-4 py-10">
        <div className="w-64 relative z-[100]">
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => {
              setHue(Number(e.target.value));
              // const val = Number(e.target.value);
              // setHue(val);
              playTick();
              // if (val % 10 === 0) playTick();
              // Щелкаем каждые 10 градусов, чтобы не частить
            }}
          />
          <p className="text-center mt-2 font-medium">
            Тон (Hue): <span className="text-myMainColor">{hue}°</span>
          </p>
          {/* <div className="w-10 h-10 bg-myMainColor"></div>
          <div className="w-10 h-10 bg-myMainColorLighter"></div>
          <div className="w-10 h-10 bg-myMainColorDarker"></div> */}
          <Button
            onClick={() => setHue(25)}
            type="button"
            variant="outline"
            className="my-5"
          >
            Reset to original color
          </Button>
        </div>
      </div>
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
    </section>
  );
}

export default App;
