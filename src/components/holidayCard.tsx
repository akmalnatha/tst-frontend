import { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { MdOutlineAttachMoney, MdLocationOn } from "react-icons/md";
import Maps from "./maps";

function HolidayCard({
  nama,
  kategori,
  location,
  latitude,
  longitude,
  biaya,
//   onClick,
}: {
  nama: string;
  kategori: string;
  location: string;
  latitude: number;
  longitude: number;
  biaya: number;
//   onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const updateContainerSize = () => {
      if (mapContainerRef.current) {
        setContainerWidth(mapContainerRef.current.offsetWidth);
        setContainerHeight(mapContainerRef.current.offsetHeight);
      }
    };

    // Initial setup
    updateContainerSize();

    // Event listener for window resize
    window.addEventListener("resize", updateContainerSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);
  return (
    <>
      <div
        className="w-full h-fit bg-white shadow-lg px-2 py-2 cursor-pointer relative rounded-[20px]"
      >
        <div className="w-full h-fit flex flex-col gap-1">
          {/* <img
            src={link != null ? link : "/assets/image_not_found.png"}
            alt="Kamar"
            className="w-full h-[200px] object-cover rounded-[20px]"
          /> */}
          <div 
          id="mapContainer"
          className="rounded-[10px] w-full h-[200px] box-shadow overflow-hidden"
          ref={mapContainerRef}
          >
            <Maps aspectHeight={containerHeight} aspectWidth={containerWidth} lat={latitude} long={longitude} />
          </div>
          <p className="font-bold w-full mt-4 text-xl flex justify-between items-start whitespace-break-spaces">
            {nama}
            <span className="font-normal text-lg text-mono-grey flex items-center gap-1">
             <BiCategory/> {kategori}
            </span>
          </p>
          <div className="flex gap-3">
            <p className="font-normal text-lg flex items-center gap-1">
              <span className="text-red-600"><MdLocationOn/></span> {location}
            </p>
            <p className="font-normal text-lg flex items-center gap-1">
              <span className="text-green-600"><MdOutlineAttachMoney/></span> Rp.{biaya},-
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HolidayCard;
