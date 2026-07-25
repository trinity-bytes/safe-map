/**
 * SafeMap interactive demo map.
 *
 * Layout contract:
 *  - >=1024px: a real two-column grid (control rail + map). No floating panels,
 *    so controls can never collide with each other.
 *  - <1024px: a stacked layout (mode switch / map / bottom sheet). Only the
 *    zoom and locate buttons stay anchored to the map, at 44px touch size.
 *
 * All data is illustrative. Counters are derived from the fixtures so the panel
 * can never claim more incidents than the map actually draws.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

import MapProviderInfo from "./MapProviderInfo";
import { createIncidentIcon, createUserLocationIcon } from "./map/icons";
import {
  LIMA_CENTER,
  LIMA_ZOOM,
  ROUTE_COLOR,
  ROUTE_WARN_COLOR,
  demoCounts,
  limaIncidents,
  mapProviders,
  safeRoutes,
  severityConfig,
  viewModes,
  type Incident,
  type MapProvider,
  type UserLocation,
  type ViewMode,
} from "./map/data";

const SAMPLE_LOCATIONS: UserLocation[] = [
  { lat: -12.1167, lng: -77.0347, name: "Miraflores" },
  { lat: -12.0972, lng: -77.0364, name: "Barranco" },
  { lat: -12.1058, lng: -77.0348, name: "San Isidro" },
];

const panelTitle =
  "text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-cyan";

const segmentButton =
  "min-h-[44px] px-3 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors";

/** Lifts the Leaflet instance out of the MapContainer subtree. */
const MapBridge: React.FC<{ onReady: (map: LeafletMap) => void }> = ({
  onReady,
}) => {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
};

interface SwitchProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
  orientation?: "horizontal" | "vertical";
}

function SegmentedSwitch<T extends string>({
  value,
  options,
  onChange,
  label,
  orientation = "horizontal",
}: SwitchProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex border border-brand-line bg-brand-ink ${
        orientation === "vertical" ? "flex-col divide-y" : "divide-x"
      } divide-brand-line`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={`${segmentButton} flex-1 ${
              active
                ? "bg-brand-cyan text-brand-ink"
                : "text-brand-muted hover:bg-brand-surface hover:text-brand-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const StatRow: React.FC<{ color: string; label: string; value: string }> = ({
  color,
  label,
  value,
}) => (
  <div className="flex items-center justify-between gap-3 py-2 text-[13px]">
    <span className="flex items-center gap-2 text-brand-muted">
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
    <span className="font-extrabold tabular-nums text-brand-text">{value}</span>
  </div>
);

const IncidentDetail: React.FC<{
  incident: Incident;
  onClear: () => void;
}> = ({ incident, onClear }) => {
  const severity = severityConfig[incident.severity];
  return (
    <div className="border border-brand-line bg-brand-panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={panelTitle}>Reporte de ejemplo</p>
          <h3 className="mt-2 text-lg font-extrabold leading-tight tracking-[-0.03em]">
            {incident.type}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Cerrar detalle del reporte"
          className="min-h-[36px] min-w-[36px] border border-brand-line text-brand-muted transition-colors hover:border-brand-cyan hover:text-brand-cyan"
        >
          ✕
        </button>
      </div>
      <dl className="mt-3 space-y-1.5 text-[13px]">
        <div className="flex justify-between gap-3">
          <dt className="text-brand-muted">Zona</dt>
          <dd className="text-right">{incident.district}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-brand-muted">Dirección</dt>
          <dd className="text-right">{incident.address}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-brand-muted">Riesgo</dt>
          <dd className="text-right font-bold" style={{ color: severity.color }}>
            {severity.label}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-brand-muted">Reportado</dt>
          <dd className="text-right">{incident.time}</dd>
        </div>
      </dl>
    </div>
  );
};

const Legend: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => (
  <div>
    <p className={panelTitle}>Leyenda</p>
    <div className="mt-3 space-y-2 text-[13px] text-brand-muted">
      {(Object.keys(severityConfig) as (keyof typeof severityConfig)[]).map(
        (key) => (
          <div key={key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 rounded-full border border-brand-ink"
              style={{ background: severityConfig[key].color }}
            />
            Riesgo {severityConfig[key].label.toLowerCase()}
          </div>
        ),
      )}
      {viewMode === "routes" && (
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1 w-4 shrink-0"
            style={{ background: ROUTE_COLOR }}
          />
          Ruta de ejemplo
        </div>
      )}
    </div>
  </div>
);

const RoutesList: React.FC = () => (
  <div>
    <p className={panelTitle}>Rutas de ejemplo</p>
    <div className="mt-3 space-y-2">
      {safeRoutes.map((route) => (
        <div
          key={route.id}
          className="border border-brand-line bg-brand-panel px-3 py-2 text-[13px]"
        >
          <div className="font-bold">{route.name}</div>
          <div className="mt-1 flex justify-between text-brand-muted">
            <span>Seguridad {route.safety}%</span>
            <span className="tabular-nums">{route.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const MapDemoClean: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("incidents");
  const [mapProvider, setMapProvider] = useState<MapProvider>("dark");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showProviderInfo, setShowProviderInfo] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  const handleMapReady = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, []);

  // The bottom sheet is part of the flow, so opening it shrinks the map
  // viewport. Leaflet needs to be told.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const frame = requestAnimationFrame(() => map.invalidateSize());
    return () => cancelAnimationFrame(frame);
  }, [sheetOpen]);

  const selectIncident = useCallback((incident: Incident) => {
    setSelectedIncident(incident);
    setSheetOpen(true);
    mapRef.current?.flyTo([incident.lat, incident.lng], 14, { duration: 0.6 });
  }, []);

  const simulateUserLocation = useCallback(() => {
    const next =
      SAMPLE_LOCATIONS[Math.floor(Math.random() * SAMPLE_LOCATIONS.length)];
    setUserLocation(next);
    mapRef.current?.flyTo([next.lat, next.lng], 14, { duration: 0.8 });
  }, []);

  const resetView = useCallback(() => {
    setSelectedIncident(null);
    mapRef.current?.flyTo(LIMA_CENTER, LIMA_ZOOM, { duration: 0.6 });
  }, []);

  const providerOptions = useMemo(
    () =>
      (Object.keys(mapProviders) as MapProvider[]).map((key) => ({
        value: key,
        label: mapProviders[key].label,
      })),
    [],
  );

  const modeOptions = useMemo(
    () => viewModes.map((m) => ({ value: m.mode, label: m.label })),
    [],
  );

  const activeMode = viewModes.find((m) => m.mode === viewMode)!;
  const provider = mapProviders[mapProvider];

  /** Shared panel body — rendered in the desktop rail and the mobile sheet. */
  const panelBody = (
    <>
      {selectedIncident && (
        <IncidentDetail
          incident={selectedIncident}
          onClear={() => setSelectedIncident(null)}
        />
      )}

      <div>
        <div className="flex items-center justify-between gap-2">
          <p className={panelTitle}>Capa base</p>
          <button
            type="button"
            onClick={() => setShowProviderInfo(true)}
            className="min-h-[32px] border border-brand-line px-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-muted transition-colors hover:border-brand-cyan hover:text-brand-cyan"
          >
            Info
          </button>
        </div>
        <div className="mt-3">
          <SegmentedSwitch
            label="Capa base del mapa"
            value={mapProvider}
            options={providerOptions}
            onChange={setMapProvider}
          />
        </div>
      </div>

      <div>
        <p className={panelTitle}>Resumen de la muestra</p>
        <div className="mt-2 divide-y divide-brand-line border-y border-brand-line">
          <StatRow
            color={severityConfig.high.color}
            label="Incidentes en el mapa"
            value={String(demoCounts.incidents)}
          />
          <StatRow
            color={severityConfig.high.color}
            label="De riesgo alto"
            value={String(demoCounts.highSeverity)}
          />
          <StatRow
            color={ROUTE_COLOR}
            label="Rutas de ejemplo"
            value={String(demoCounts.routes)}
          />
        </div>
      </div>

      <Legend viewMode={viewMode} />

      {viewMode === "routes" && <RoutesList />}

      <div className="border border-brand-line bg-brand-panel px-3 py-2 text-[11px] leading-relaxed text-brand-muted">
        Datos de ejemplo para Lima. Los marcadores y las capas son ilustrativos y
        no representan incidentes actuales.
        <span
          className="mt-2 block text-[10px] [&_a]:text-brand-cyan [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: provider.attribution }}
        />
      </div>
    </>
  );

  return (
    <div className="flex h-full w-full flex-col bg-brand-ink text-brand-text lg:flex-row">
      {/* Desktop control rail */}
      <aside className="hidden shrink-0 flex-col gap-6 overflow-y-auto border-r border-brand-line bg-brand-surface p-5 lg:flex lg:w-[312px]">
        <div>
          <p className={panelTitle}>Vista</p>
          <div className="mt-3">
            <SegmentedSwitch
              label="Modo de visualización"
              orientation="vertical"
              value={viewMode}
              options={modeOptions}
              onChange={setViewMode}
            />
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-brand-muted">
            {activeMode.hint}
          </p>
        </div>
        {panelBody}
      </aside>

      {/* Mobile mode switch */}
      <div className="shrink-0 border-b border-brand-line bg-brand-surface p-2 lg:hidden">
        <SegmentedSwitch
          label="Modo de visualización"
          value={viewMode}
          options={modeOptions}
          onChange={setViewMode}
        />
      </div>

      {/* Map */}
      <div className="relative min-h-[240px] flex-1">
        <MapContainer
          center={LIMA_CENTER}
          zoom={LIMA_ZOOM}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
        >
          <MapBridge onReady={handleMapReady} />
          <TileLayer url={provider.url} />

          {viewMode === "incidents" &&
            limaIncidents.map((incident) => (
              <Marker
                key={`incident-${incident.id}`}
                position={[incident.lat, incident.lng]}
                icon={createIncidentIcon(incident.severity)}
                eventHandlers={{ click: () => selectIncident(incident) }}
              />
            ))}

          {viewMode === "heatmap" &&
            limaIncidents.map((incident) => (
              <Circle
                key={`heatmap-${incident.id}`}
                center={[incident.lat, incident.lng]}
                radius={severityConfig[incident.severity].radius}
                fillColor={severityConfig[incident.severity].color}
                fillOpacity={0.35}
                stroke={false}
              />
            ))}

          {viewMode === "routes" &&
            safeRoutes.map((route) => (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                color={route.safety > 90 ? ROUTE_COLOR : ROUTE_WARN_COLOR}
                weight={4}
                opacity={0.85}
                dashArray={route.safety > 90 ? undefined : "10, 6"}
              />
            ))}

          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createUserLocationIcon()}
            />
          )}
        </MapContainer>

        {/* Map-anchored controls. 44px touch targets, single stack, no overlap. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1000] flex flex-col items-end justify-end gap-2 p-3">
          <div className="pointer-events-auto flex flex-col border border-brand-line bg-brand-surface/95 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => mapRef.current?.zoomIn()}
              aria-label="Acercar el mapa"
              className="h-11 w-11 text-lg text-brand-muted transition-colors hover:text-brand-cyan"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => mapRef.current?.zoomOut()}
              aria-label="Alejar el mapa"
              className="h-11 w-11 border-t border-brand-line text-lg text-brand-muted transition-colors hover:text-brand-cyan"
            >
              −
            </button>
          </div>
          <button
            type="button"
            onClick={simulateUserLocation}
            aria-label="Simular mi ubicación"
            title="Simular mi ubicación"
            className="pointer-events-auto h-11 w-11 border border-brand-cyan bg-brand-surface/95 text-brand-cyan backdrop-blur-sm transition-colors hover:bg-brand-cyan hover:text-brand-ink"
          >
            ◎
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Volver a la vista general"
            title="Volver a la vista general"
            className="pointer-events-auto h-11 w-11 border border-brand-line bg-brand-surface/95 text-brand-muted backdrop-blur-sm transition-colors hover:border-brand-cyan hover:text-brand-cyan"
          >
            ⤢
          </button>
        </div>

        <p className="pointer-events-none absolute bottom-3 left-3 z-[1000] border border-brand-line bg-brand-surface/95 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-amber backdrop-blur-sm">
          Datos simulados · Lima
        </p>
      </div>

      {/* Mobile bottom sheet */}
      <div className="shrink-0 border-t border-brand-line bg-brand-surface lg:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
          aria-controls="map-demo-sheet"
          className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 text-left"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-text">
            {selectedIncident
              ? selectedIncident.type
              : `${demoCounts.incidents} incidentes · ${demoCounts.routes} rutas`}
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-cyan">
            {sheetOpen ? "Ocultar ▾" : "Detalle ▴"}
          </span>
        </button>
        {sheetOpen && (
          <div
            id="map-demo-sheet"
            className="max-h-[38vh] space-y-6 overflow-y-auto border-t border-brand-line p-4"
          >
            <p className="text-[12px] leading-relaxed text-brand-muted">
              {activeMode.hint}
            </p>
            {panelBody}
          </div>
        )}
      </div>

      <MapProviderInfo
        isOpen={showProviderInfo}
        onClose={() => setShowProviderInfo(false)}
      />
    </div>
  );
};

export default MapDemoClean;
