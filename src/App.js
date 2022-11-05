import { useCallback, useEffect, useState } from "react";
import "./App.css";

function ItemLine({ title, value, onIncrease, onDecrease }) {
  return (
    <div className="w-4/5 flex flex-row py-8 px-14 items-center justify-center">
      <div className="text-left	basis-3/4 ">{title}</div>
      <div className="flex flex-row justify-center items-center basis-1/4 rounded-md">
        <button
          className="rounded-l-lg bg-emerald-500 hover:bg-emerald-600 text-white p-3 w-14"
          onClick={onDecrease}
        >
          -
        </button>
        <div className="text-emerald-500 mx-5">{value}</div>
        <button
          className="rounded-r-lg bg-emerald-500 hover:bg-emerald-600 text-white p-3 w-14"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

function App() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const setAndSaveCounts = useCallback((counts) => {
    setCounts(counts);
    localStorage.setItem("laundryCount", JSON.stringify(counts));
  }, []);

  useEffect(() => {
    const storageCounts = localStorage.getItem("laundryCount");
    if (!storageCounts) {
      setCounts([0, 0, 0, 0]);
    } else {
      setCounts(JSON.parse(storageCounts));
    }
  }, []);

  const increase = useCallback(
    (idx) => {
      const newCounts = [...counts];
      newCounts[idx]++;
      setAndSaveCounts(newCounts);
    },
    [counts, setAndSaveCounts]
  );

  const decrease = useCallback(
    (idx) => {
      const newCounts = [...counts];
      if (newCounts[idx] > 0) {
        newCounts[idx]--;
      }
      setAndSaveCounts(newCounts);
    },
    [counts, setAndSaveCounts]
  );

  const reset = useCallback(() => {
    setAndSaveCounts([0, 0, 0, 0]);
  }, [setAndSaveCounts]);

  return (
    <div className="App font-sans">
      <div className="flex  text-2xl  flex-col m-12 bg-neutral-100 rounded-lg border-2 border-emerald-500">
        <ItemLine
          title="Quần"
          value={counts[0]}
          onIncrease={() => increase(0)}
          onDecrease={() => decrease(0)}
        />
        <ItemLine
          title="Áo"
          value={counts[1]}
          onIncrease={() => increase(1)}
          onDecrease={() => decrease(1)}
        />
        <ItemLine
          title="Tất"
          value={counts[2]}
          onIncrease={() => increase(2)}
          onDecrease={() => decrease(2)}
        />
        <ItemLine
          title="Quần nhỏ"
          value={counts[3]}
          onIncrease={() => increase(3)}
          onDecrease={() => decrease(3)}
        />
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
