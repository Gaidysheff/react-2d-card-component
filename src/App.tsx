import { ERRORS, TRANSLATIONS } from "@/lib/translation.ts";
import { useEffect, useState } from "react";

import BankCard from "./components/payment/BankCard";
import { Button } from "./components/ui/button.tsx";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function App() {
  const [isSent, setIsSent] = useState(false);

  const [hue, setHue] = useState(() => {
    const saved = localStorage.getItem("card-hue");
    return saved ? Number(saved) : 25;
  });

  const [lightness, setLightness] = useState(() => {
    const saved = localStorage.getItem("card-lightness");
    return saved ? Number(saved) : 62;
  });

  const [chroma, setChroma] = useState(() => {
    const saved = localStorage.getItem("card-chroma");
    return saved ? Number(saved) : 25;
  });

  const playTick = () => {
    const tick = new Audio("/public/tick.mp3");
    tick.volume = 0.1;
    tick.play().catch(() => {});
  };

  const dynamicTheme = {
    // Для L и C обязательно добавляем % или делим на 100
    "--myMainColor": `oklch(${lightness}% ${chroma / 100} ${hue})`,
    "--myMainColorLighter": `oklch(${Math.min(lightness * 1.3, 100)}% ${chroma / 150} ${hue})`,
    "--myMainColorLight": `oklch(${Math.min(lightness * 1.15, 100)}% ${chroma / 120} ${hue})`,
    "--myMainColorDark": `oklch(${lightness * 0.8}% ${chroma / 110} ${hue})`,
    "--myMainColorDarker": `oklch(${lightness * 0.6}% ${chroma / 130} ${hue})`,
  } as React.CSSProperties;

  const CardDataHandler = (CardData: Record<string, string>) => {
    setIsSent(true);
    console.log("🚀 ~ CardDataHandler ~ CardData:", CardData);
    return new Promise((r) => setTimeout(r, 2000));
  };

  // Сохраняем выбранный цвет при каждом изменении
  useEffect(() => {
    localStorage.setItem("card-hue", String(hue));
    localStorage.setItem("card-lightness", String(lightness));
    localStorage.setItem("card-chroma", String(chroma));
  }, [hue, lightness, chroma]);

  // ====================== Translation ===========================

  // const [lang, setLang] = useState<"en" | "ru">("en");

  const [lang, setLang] = useState<"en" | "ru">(() => {
    return (localStorage.getItem("app-lang") as "en" | "ru") || "en";
  });

  const t = TRANSLATIONS[lang]; // Помощник для перевода основного
  const e = ERRORS[lang]; // Помощник для перевода ошибок
  console.log("🚀 ~ App ~ e:", e);

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
  }, [lang]);

  return (
    <section style={dynamicTheme} className="mb-20">
      {/* --------------------- Слайдеры цвета ------------------ */}
      <div className="flex flex-col items-center gap-4 py-10">
        <div className="w-70 relative z-[100]">
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => {
              setHue(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_hue}: <span className="text-myMainColor">{hue}°</span>
          </p>
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => {
              setLightness(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_lightness}:{" "}
            <span className="text-myMainColor">{lightness}%</span>
          </p>
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="100"
            value={chroma}
            onChange={(e) => {
              setChroma(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_chroma}:{" "}
            <span className="text-myMainColor">{chroma}%</span>
          </p>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setHue(25);
                setLightness(62);
                setChroma(25);
              }}
              type="button"
              className="p-6 my-5 w-70"
            >
              {t.slider_reset}
            </Button>
          </div>
        </div>
      </div>
      {/* -------------------- Переводчик ------------------ */}
      <div className="flex flex-col items-center gap-2 mt-6 z-[100]">
        <p className="text-xs uppercase tracking-widest opacity-60">
          {t.language}
        </p>
        <div className="flex bg-input/20 rounded-md border border-primary/50 relative">
          {["en", "ru"].map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setLang(l as "en" | "ru")}
              className={cn(
                "relative px-4 py-2 text-sm font-medium z-10 uppercase",
                lang === l ? "text-white" : "text-black",
              )}
            >
              {/* Если язык выбран, рисуем под ним анимированную подложку */}
              {lang === l && (
                <motion.div
                  layoutId="activeTab" // Ключевое свойство для "перетекания"
                  className={cn(
                    "absolute inset-0 bg-myMainColor shadow-lg",
                    lang === "en" ? "rounded-l-md" : "rounded-r-md",
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-20">
                {l === "en" ? "🇬🇧 EN" : "🇷🇺 RU"}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* -------------------------------------------------------- */}

      <div className="flex flex-col items-center justify-center">
        <div className="my-10 sm:my-20 z-4">
          <BankCard onSubmitData={CardDataHandler} t={t} />
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
