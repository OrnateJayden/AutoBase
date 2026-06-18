import { RF_PLATE_REGEX } from "./constants";

export interface ParsedPlate {
  letter1: string;
  digits: string;
  letters2: string;
  region: string;
  isValid: boolean;
}

export function validateLicensePlate(plate: string): boolean {
  return RF_PLATE_REGEX.test(plate.trim().toUpperCase());
}

export function parseLicensePlate(plate: string): ParsedPlate {
  const normalized = plate.trim().toUpperCase();
  const match = normalized.match(
    /^([АВЕКМНОРСТУХ])(\d{3})([АВЕКМНОРСТУХ]{2})(\d{2,3})$/u
  );

  if (!match) {
    return {
      letter1: "А",
      digits: "000",
      letters2: "АА",
      region: "00",
      isValid: false,
    };
  }

  return {
    letter1: match[1],
    digits: match[2],
    letters2: match[3],
    region: match[4],
    isValid: true,
  };
}

export function formatLicensePlate(plate: string): string {
  const parsed = parseLicensePlate(plate);
  if (!parsed.isValid) return plate;
  return `${parsed.letter1}${parsed.digits}${parsed.letters2}${parsed.region}`;
}

export function getPlateDisplayParts(plate: string): {
  main: string;
  region: string;
} {
  const parsed = parseLicensePlate(plate);
  return {
    main: `${parsed.letter1} ${parsed.digits} ${parsed.letters2}`,
    region: parsed.region,
  };
}
