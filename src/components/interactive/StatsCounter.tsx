import React, { useEffect, useState } from "react";

const StatsCounter: React.FC = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = 127;
    const interval = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(current + Math.ceil(target / 50), target);
        if (next >= target) window.clearInterval(interval);
        return next;
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-2 text-4xl font-bold text-slate-100 lg:text-5xl">{value}</div>
        <p className="text-sm text-slate-300">Ejemplo visual de reportes</p>
      </div>
    </div>
  );
};

export default StatsCounter;
