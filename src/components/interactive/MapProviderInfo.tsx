import React, { useEffect, useRef, useState } from "react";
import { mapProviders, type MapProvider } from "./map/data";

interface MapProviderInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const providerDetails: Record<
  MapProvider,
  {
    description: string;
    features: string[];
    coverage: string;
    updateFrequency: string;
  }
> = {
  streets: {
    description: "Capa cartográfica usada para esta vista previa ilustrativa.",
    features: [
      "Calles y lugares de referencia",
      "Licencia abierta",
      "Útil para explorar el flujo",
    ],
    coverage: "Referencia visual para Lima",
    updateFrequency: "Datos de ejemplo",
  },
  satellite: {
    description: "Capa visual alternativa para comparar el contexto de la demo.",
    features: [
      "Texturas aéreas",
      "Contexto geográfico",
      "Cambio manual de capa",
    ],
    coverage: "Referencia visual para Lima",
    updateFrequency: "Datos de ejemplo",
  },
  dark: {
    description:
      "Capa de alto contraste pensada para la experiencia dark-only del producto.",
    features: [
      "Contraste elevado",
      "Lectura nocturna",
      "Superficie coherente con la interfaz",
    ],
    coverage: "Referencia visual para Lima",
    updateFrequency: "Datos de ejemplo",
  },
};

const eyebrow =
  "text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-cyan";

const MapProviderInfo: React.FC<MapProviderInfoProps> = ({
  isOpen,
  onClose,
}) => {
  const [selected, setSelected] = useState<MapProvider>("streets");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const detail = providerDetails[selected];

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end justify-center bg-brand-ink/85 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-provider-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85dvh] w-full max-w-2xl overflow-y-auto border border-brand-line bg-brand-surface p-5 text-brand-text shadow-[0_20px_80px_rgba(0,0,0,.5)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={eyebrow}>Capas del mapa</p>
            <h2
              id="map-provider-title"
              className="mt-2 text-2xl font-extrabold leading-none tracking-[-0.05em]"
            >
              Cómo se organiza el contexto
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar información de capas"
            className="h-11 w-11 shrink-0 border border-brand-line text-brand-muted transition-colors hover:border-brand-cyan hover:text-brand-cyan"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">
          Estas capas ilustran cómo podría presentarse el contexto cartográfico
          del producto. Ninguna representa una integración activa.
        </p>

        <div
          role="group"
          aria-label="Elegir capa"
          className="mt-5 flex divide-x divide-brand-line border border-brand-line"
        >
          {(Object.keys(providerDetails) as MapProvider[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              aria-pressed={selected === key}
              className={`min-h-[44px] flex-1 px-3 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                selected === key
                  ? "bg-brand-cyan text-brand-ink"
                  : "text-brand-muted hover:bg-brand-panel hover:text-brand-text"
              }`}
            >
              {mapProviders[key].label}
            </button>
          ))}
        </div>

        <div className="mt-5 border border-brand-line bg-brand-panel p-4">
          <h3 className="text-lg font-extrabold tracking-[-0.03em]">
            {mapProviders[selected].label}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
            {detail.description}
          </p>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className={eyebrow}>Capacidades ilustradas</p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-brand-muted">
                {detail.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-lime">
                      /
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={eyebrow}>Detalles de la demo</p>
              <dl className="mt-3 space-y-1.5 text-[13px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-brand-muted">Cobertura</dt>
                  <dd className="text-right">{detail.coverage}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-brand-muted">Actualización</dt>
                  <dd className="text-right">{detail.updateFrequency}</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="mt-4 border-l-2 border-brand-amber bg-brand-ink px-3 py-2 text-[12px] leading-relaxed text-brand-amber">
            Cambiá entre capas para explorar la presentación visual. No hay datos
            reales detrás de esta demo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapProviderInfo;
