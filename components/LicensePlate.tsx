import { getPlateDisplayParts } from "@/lib/plate";

interface LicensePlateProps {
  plate: string;
  size?: "sm" | "md" | "lg";
}

export default function LicensePlate({ plate, size = "md" }: LicensePlateProps) {
  const { main, region } = getPlateDisplayParts(plate);

  const sizeClasses = {
    sm: { wrapper: "h-8 text-xs", main: "px-2", region: "w-10 text-xs", flag: "w-3 h-2" },
    md: { wrapper: "h-10 text-sm", main: "px-3", region: "w-12 text-sm", flag: "w-4 h-3" },
    lg: { wrapper: "h-14 text-lg", main: "px-4", region: "w-16 text-base", flag: "w-5 h-4" },
  };

  const s = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-stretch border-2 border-black rounded overflow-hidden
                  bg-white text-black font-plate font-bold shadow-md ${s.wrapper}`}
    >
      <div className={`flex items-center ${s.main} bg-white`}>
        <span className="tracking-wider whitespace-nowrap">{main}</span>
      </div>

      <div className={`flex flex-col items-center justify-center border-l-2 border-black bg-white ${s.region}`}>
        <div className={`${s.flag} mb-0.5 overflow-hidden rounded-sm border border-gray-300`}>
          <div className="h-1/3 bg-white" />
          <div className="h-1/3 bg-blue-600" />
          <div className="h-1/3 bg-red-600" />
        </div>
        <span className="font-bold leading-none">{region}</span>
        <span className="text-[0.5em] font-normal text-gray-600 leading-none mt-0.5">RUS</span>
      </div>
    </div>
  );
}
