import L from "leaflet";
import { severityConfig, type Severity } from "./data";

/**
 * Incident marker.
 *
 * The pulse lives on a child span on purpose: Leaflet writes CSS transforms on
 * `.leaflet-marker-icon` to position markers, so animating the container makes
 * markers drift while panning or zooming.
 */
export const createIncidentIcon = (severity: Severity) => {
  const { color } = severityConfig[severity];
  const pulse =
    severity === "high" ? '<span class="sm-marker__pulse"></span>' : "";

  return L.divIcon({
    html: `<span class="sm-marker" style="--sm-marker:${color}">${pulse}<span class="sm-marker__dot"></span></span>`,
    className: "sm-marker-host",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -13],
  });
};

export const createUserLocationIcon = () =>
  L.divIcon({
    html: '<span class="sm-marker sm-marker--user"><span class="sm-marker__pulse"></span><span class="sm-marker__dot"></span></span>',
    className: "sm-marker-host",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -13],
  });
