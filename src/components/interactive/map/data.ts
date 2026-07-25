/**
 * Static fixtures and visual tokens for the SafeMap demo map.
 *
 * Everything here is illustrative sample data. It is intentionally the single
 * source of truth for the demo so the counters, the legend and the rendered
 * markers can never drift apart.
 */

export type Severity = "high" | "medium" | "low";
export type ViewMode = "incidents" | "heatmap" | "routes";
export type MapProvider = "streets" | "satellite" | "dark";

export interface Incident {
  id: number;
  lat: number;
  lng: number;
  type: string;
  severity: Severity;
  time: string;
  district: string;
  address: string;
}

export interface SafeRoute {
  id: number;
  name: string;
  safety: number;
  time: string;
  coordinates: [number, number][];
}

export interface UserLocation {
  lat: number;
  lng: number;
  name: string;
}

/**
 * Severity is encoded by hue *and* salience: higher risk reads louder, lower
 * risk recedes into the muted UI tone instead of competing for attention.
 */
export const severityConfig: Record<
  Severity,
  { label: string; color: string; radius: number }
> = {
  high: { label: "Alto", color: "#ff6f5e", radius: 800 },
  medium: { label: "Medio", color: "#f5c76b", radius: 520 },
  low: { label: "Bajo", color: "#9db0bb", radius: 320 },
};

export const ROUTE_COLOR = "#c7f36b";
export const ROUTE_WARN_COLOR = "#f5c76b";
export const USER_COLOR = "#5ee7e1";

export const LIMA_CENTER: [number, number] = [-12.0764, -77.0395];
export const LIMA_ZOOM = 11;

export const limaIncidents: Incident[] = [
  {
    id: 1,
    lat: -12.0464,
    lng: -77.0428,
    type: "Robo",
    severity: "high",
    time: "Hace 15 min",
    district: "Cercado de Lima",
    address: "Jr. de la Unión 300",
  },
  {
    id: 2,
    lat: -12.1197,
    lng: -77.031,
    type: "Asalto",
    severity: "high",
    time: "Hace 32 min",
    district: "Miraflores",
    address: "Av. Larco 1200",
  },
  {
    id: 3,
    lat: -12.0736,
    lng: -77.0194,
    type: "Hurto",
    severity: "medium",
    time: "Hace 1 hora",
    district: "La Victoria",
    address: "Av. Aviación 2500",
  },
  {
    id: 4,
    lat: -12.0278,
    lng: -77.0414,
    type: "Vandalismo",
    severity: "low",
    time: "Hace 2 horas",
    district: "Rímac",
    address: "Jr. Trujillo 800",
  },
  {
    id: 5,
    lat: -12.0969,
    lng: -77.0365,
    type: "Robo de vehículo",
    severity: "high",
    time: "Hace 45 min",
    district: "San Isidro",
    address: "Av. Javier Prado 1500",
  },
  {
    id: 6,
    lat: -12.0522,
    lng: -77.0661,
    type: "Estafa",
    severity: "low",
    time: "Hace 3 horas",
    district: "Breña",
    address: "Av. Brasil 1200",
  },
  {
    id: 7,
    lat: -12.1414,
    lng: -77.0206,
    type: "Robo",
    severity: "medium",
    time: "Hace 1.5 horas",
    district: "Barranco",
    address: "Bajada de Baños 340",
  },
  {
    id: 8,
    lat: -12.0175,
    lng: -77.0661,
    type: "Asalto",
    severity: "high",
    time: "Hace 20 min",
    district: "Independencia",
    address: "Av. Túpac Amaru 3500",
  },
  {
    id: 9,
    lat: -12.1681,
    lng: -77.0181,
    type: "Hurto",
    severity: "medium",
    time: "Hace 50 min",
    district: "Chorrillos",
    address: "Av. Huaylas 1200",
  },
];

export const safeRoutes: SafeRoute[] = [
  {
    id: 1,
    name: "Centro → Miraflores",
    safety: 95,
    time: "25 min",
    coordinates: [
      [-12.0464, -77.0428],
      [-12.08, -77.038],
      [-12.1197, -77.031],
    ],
  },
  {
    id: 2,
    name: "San Isidro → Barranco",
    safety: 92,
    time: "15 min",
    coordinates: [
      [-12.0969, -77.0365],
      [-12.118, -77.0285],
      [-12.1414, -77.0206],
    ],
  },
  {
    id: 3,
    name: "Rímac → La Victoria",
    safety: 78,
    time: "20 min",
    coordinates: [
      [-12.0278, -77.0414],
      [-12.052, -77.029],
      [-12.0736, -77.0194],
    ],
  },
];

export const mapProviders: Record<
  MapProvider,
  { label: string; url: string; attribution: string }
> = {
  streets: {
    label: "Calles",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · mapa ilustrativo',
  },
  satellite: {
    label: "Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri · mapa ilustrativo",
  },
  dark: {
    label: "Oscuro",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a> · mapa ilustrativo',
  },
};

export const viewModes: { mode: ViewMode; label: string; hint: string }[] = [
  {
    mode: "incidents",
    label: "Incidentes",
    hint: "Puntos individuales con detalle por reporte.",
  },
  {
    mode: "heatmap",
    label: "Concentración",
    hint: "Áreas de influencia según la severidad del reporte.",
  },
  {
    mode: "routes",
    label: "Rutas",
    hint: "Trazados de ejemplo con su índice de seguridad.",
  },
];

/** Counters derived from the fixtures — never hardcoded, never simulated. */
export const demoCounts = {
  incidents: limaIncidents.length,
  routes: safeRoutes.length,
  highSeverity: limaIncidents.filter((i) => i.severity === "high").length,
};
