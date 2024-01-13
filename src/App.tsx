import { useState } from "react";
import "./App.css";

interface BetProps {
  id: number;
  title: string;
  type: string;
  amount: number;
}

enum Bet {
  OVERDOG = "Overdog",
  UNDERDOG = "Underdog",
  TIE = "Tie",
  WAGER = "Wager",
  WINNINGS_OVERDOG = "Winnings for Overdog",
  WINNINGS_UNDERDOG = "Winnings for Underdog",
  WINNINGS_TIE = "Winnings for Tie",
}

function App() {
  const initialBets: BetProps[] = [
    { id: 0, title: Bet.OVERDOG, type: "-", amount: 0 },
    { id: 1, title: Bet.UNDERDOG, type: "+", amount: 0 },
    { id: 2, title: Bet.TIE, type: "+", amount: 0 },
    { id: 3, title: Bet.WAGER, type: "$", amount: 0 },
    { id: 4, title: Bet.WINNINGS_OVERDOG, type: "$", amount: 0 },
    { id: 5, title: Bet.WINNINGS_UNDERDOG, type: "$", amount: 0 },
    { id: 6, title: Bet.WINNINGS_TIE, type: "$", amount: 0 },
  ];
  const [bets, setBets] = useState<BetProps[]>(initialBets);

  const handlePriceUpdate = (id: number, value: string) => {
    const newAmount = Number(value);
    const betData = bets.map((item) =>
      item.id === id ? { ...item, amount: newAmount } : item
    );

    const wagerIndex: number = 3;
    const wager: BetProps = betData[wagerIndex];
    const overDogIndex: number = 4;
    const overDog: BetProps = betData[overDogIndex];
    const underDogIndex: number = 5;
    const underDog: BetProps = betData[underDogIndex];
    const tieIndex: number = 6;
    const tie: BetProps = betData[tieIndex];

    if (bets[0].amount > 0 && bets[1].amount && bets[2].amount) {
      const updateOverDogWinnings = {
        ...overDog,
        amount: Number(((wager.amount * 100) / bets[0].amount).toFixed(2)),
      };

      const updateUnderDogWinnings = {
        ...underDog,
        amount: Number(((wager.amount * bets[1].amount) / 100).toFixed(2)),
      };

      const updateTieWinnings = {
        ...tie,
        amount: Number(((wager.amount * bets[2].amount) / 100).toFixed(2)),
      };

      betData[overDogIndex] = updateOverDogWinnings;
      betData[underDogIndex] = updateUnderDogWinnings;
      betData[tieIndex] = updateTieWinnings;
    }

    setBets(betData as BetProps[]);
  };

  return (
    <div className="grid grid-cols-3 w-screen justify-center items-center p-12">
      <div className="flex flex-col w-full">
        {bets.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center"
          >
            <span className="text-2xl font-semibold mb-3">{item.title}</span>
            <div className="flex w-full md:w-2/3 justify-center border-slate-300 border rounded-2xl items-center p-12 mb-12 focus-within:border-slate-500">
              <span className="text-5xl font-bold">{item.type}</span>
              <span className="text-5xl font-bold">{item.amount}</span>
              <input
                className="absolute text-transparent border-none bg-transparent focus:outline-none focus:border-transparent"
                type="currency"
                onChange={(e) => handlePriceUpdate(item.id, e.target.value)}
                value={item.amount}
                min={0}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-semibold mb-3">{bets[3].title}</span>
          <div className="flex w-full md:w-2/3 justify-center border-slate-300 border rounded-2xl items-center p-12 mb-12 focus-within:border-slate-500">
            <span className="text-5xl font-bold">{bets[3].type}</span>
            <span className="text-5xl font-bold">{bets[3].amount}</span>
            <input
              className="absolute text-transparent border-none bg-transparent focus:outline-none focus:border-transparent"
              type="currency"
              onChange={(e) => handlePriceUpdate(bets[3].id, e.target.value)}
              min={0}
              maxLength={8}
            />
          </div>
        </div>
        <button
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32"
          onClick={() => setBets([...initialBets])}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col w-full">
        {bets.slice(4).map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center"
          >
            <span className="text-2xl font-semibold mb-3">{item.title}</span>
            <div className="flex w-full md:w-2/3 justify-center border-slate-300 border rounded-2xl items-center p-12 mb-12 focus-within:border-slate-500">
              <span className="text-5xl font-bold">{item.type}</span>
              <span className="text-5xl font-bold">{item.amount}</span>
              <input
                className="absolute text-transparent border-none bg-transparent focus:outline-none focus:border-transparent"
                type="currency"
                onChange={(e) => handlePriceUpdate(item.id, e.target.value)}
                value={item.amount}
                min={0}
                disabled
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
