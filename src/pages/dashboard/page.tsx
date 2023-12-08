import { useContext, useEffect, useRef, useState } from "react";
import { IoMdTrain } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Button from "../../components/button";
import Textfield from "../../components/textfield";
import { toastError, toastSuccess } from "../../components/toast";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import Dropdown from "../../components/dropdown";
import HolidayCard from "../../components/holidayCard";
import KeretaCard from "../../components/keretaCard";
import { get, getWithAuth, postWithAuthJson } from "../../api/api";
import LoadingPage from "../../components/loadingPage";
import Modal from "../../components/modal";
import { UserContext } from "../../context/userContext";
import moment from "moment";

export const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [isLoadingHoliday, setIsLoadingHoliday] = useState<boolean>(false);

  const [merk, setMerk] = useState<string | null>(null);
  const [tujuan, setTujuan] = useState<string | null>(null);
  const [asal, setAsal] = useState<string | null>(null);
  const [tipe, setTipe] = useState<string | null>(null);

  const [liburan, setLiburan] = useState<any[]>([]);

  const [keretaAll, setKeretaAll] = useState<any[]>([]);
  const [kereta, setKereta] = useState<any[]>([]);
  const [optionsAsal, setOptionsAsal] = useState<any[]>([]);
  const [optionsTujuan, setOptionsTujuan] = useState<any[]>([]);
  const [optionsMerk, setOptionsMerk] = useState<any[]>([]);
  const [jumlahPenumpang, setJumlahPenumpang] = useState<number>(1);

  const [showModalPesan, setShowModalPesan] = useState<boolean>(false);
  const [idKeretaPesan, setIdKeretaPesan] = useState<number>(0);
  const [namaKeretaPesan, setNamaKeretaPesan] = useState<any>({
    label: "",
    value: "",
  });
  const [asalKeretaPesan, setAsalKeretaPesan] = useState<any>({
    label: "",
    value: "",
  });
  const [tujuanKeretaPesan, setTujuanKeretaPesan] = useState<any>({
    label: "",
    value: "",
  });

  const peerContainerRef = useRef<HTMLDivElement>(null);
  // const [containerHeight, setContainerHeight] = useState<number>(0);

  const optionsTipe = [
    { label: "Antar-Kota", value: "Antar-Kota" },
    { label: "Lokal", value: "Lokal" },
  ];

  const token = Cookies.get("access_token");

  const getHoliday = async () => {
    if (token) {
      try {
        setIsLoadingHoliday(true);
        const response = await getWithAuth(token, "destination");
        console.log(response);
        const dataLiburan = response.data?.data;

        setLiburan(dataLiburan);
        toastSuccess("Get Rekomendasi Wisata Succesful");
      } catch (error) {
        toastError("Get Rekomendasi Wisata Failed");
      } finally {
        setIsLoadingHoliday(false);
      }
    }
  };

  const getKeretaBySearch = async () => {
    try {
      setIsLoading(true);
      const response = await get(
        `kereta?${tujuan != null ? `&tujuan=${tujuan}` : ""}${
          asal != null ? `&keberangkatan=${asal}` : ""
        }${tipe != null ? `&tipe=${tipe}` : ""}${
          merk != null ? `&merk=${merk}` : ""
        }`
      );
      console.log(response);
      const dataKereta = response.data?.data;

      setKereta(dataKereta);
      toastSuccess("Get Kereta Succesful");
    } catch (error) {
      toastError("Get Kereta Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getKeretaOptions = async () => {
    try {
      setIsLoadingSearch(true);
      const response = await get(`kereta`);
      const dataKereta = response.data?.data;

      setKeretaAll(dataKereta);
      setKereta(dataKereta)
      setOptionsAsal(
        dataKereta.map((item: any) => {
          return {
            label: item.keberangkatan,
            value: item.keberangkatan,
          };
        })
      );
      setOptionsTujuan(
        dataKereta.map((item: any) => {
          return {
            label: item.tujuan,
            value: item.tujuan,
          };
        })
      );
      setOptionsMerk(
        dataKereta.map((item: any) => {
          return {
            label: item.merk,
            value: item.merk,
          };
        })
      );
      toastSuccess("Get Data Succesful");
    } catch (error) {
      toastError("Get Kereta Failed");
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleOrderTrain = async (
    e: React.FormEvent<HTMLFormElement>,
    total_passanger: number
  ) => {
    e.preventDefault();
    setIsLoading(true);
    let dateToday = new Date();
    if (token) {
      console.log(token)
      try {
        for (let i = 1; i <= total_passanger; i++) {
          await postWithAuthJson(
            "tiket",
            {
              user_id: user?.id,
              penumpang_id: i,
              kereta_id: idKeretaPesan,
              date_time: moment(dateToday).format("YYYY-MM-DD HH:mm:ss"),
              notes: "",
            },
            token
          );
        }
        toastSuccess("Pesan Tiket Successfuly");
        setShowModalPesan(false);
      } catch (error) {
        toastError((error as any).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getKeretaOptions();
    getHoliday();
  }, []);

  // useEffect(() => {
  //   const updateContainerSize = () => {
  //     if (peerContainerRef.current) {
  //       setContainerHeight(peerContainerRef.current.offsetHeight);
  //     }
  //   };

    
  //   // Initial setup
  //   updateContainerSize();

  //   // Event listener for window resize
  //   window.addEventListener("resize", updateContainerSize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", updateContainerSize);
  //   };
  // }, []);

  useEffect(() => {
    const filteredKereta = keretaAll.filter(
      (item: any) => item.id === idKeretaPesan
    );
    const namaKereta =
      filteredKereta.length > 0 ? filteredKereta[0].merk : "";
    const asalKereta =
      filteredKereta.length > 0 ? filteredKereta[0].keberangkatan : "";
    const tujuanKereta =
      filteredKereta.length > 0 ? filteredKereta[0].tujuan : "";
    setNamaKeretaPesan({ label: namaKereta, value: namaKereta });
    setAsalKeretaPesan({ label: asalKereta, value: asalKereta });
    setTujuanKeretaPesan({ label: tujuanKereta, value: tujuanKereta });
  }, [idKeretaPesan]);
  //   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });
  //     setIsLoading(false);

  //     if (data.session) {
  //     //   Cookies.set("token_simentel", data.session.access_token);
  //       toastSuccess("Login successfully");
  //       navigate("/");
  //     }

  //     if (error) {
  //       toastError(error.message);
  //     } else if (!data && !error) {
  //       toastError("An email has been sent to you for verification!");
  //     }
  //   };

  return (
    <>
      <LoadingPage isLoad={isLoadingSearch && isLoadingHoliday} />

      <Modal visible={showModalPesan} onClose={() => setShowModalPesan(false)}>
        <form
          onSubmit={(e) => handleOrderTrain(e, jumlahPenumpang)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Pesan Kereta
          </h1>
          <div>
            <p className="text-2xl mb-1 font-semibold text-sky-900">
              Nama Kereta
            </p>
            <div className="flex group flex-grow">
              <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31] shrink-0">
                <IoMdTrain />
              </div>
              <Dropdown
                placeholder={"Nama Kereta.."}
                options={optionsMerk}
                disable
                value={namaKeretaPesan}
              />
            </div>
          </div>
          <section className="flex gap-5">
            <div className="w-full">
              <p className="text-2xl mb-1 font-semibold text-sky-900">
                Kota Asal
              </p>
              <div className="w-full flex group">
                <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31]">
                  <IoMdTrain />
                </div>
                <Dropdown
                  placeholder={"Kota Asal.."}
                  options={optionsAsal}
                  disable
                  value={asalKeretaPesan}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-2xl mb-1 font-semibold text-sky-900">
                Kota Tujuan
              </p>
              <div className="w-full flex group">
                <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31]">
                  <IoMdTrain />
                </div>
                <Dropdown
                  placeholder={"Kota Tujuan.."}
                  options={optionsTujuan}
                  disable
                  value={tujuanKeretaPesan}
                />
              </div>
            </div>
          </section>
          <div className="w-1/2 mx-auto">
            <p className="text-2xl mb-1 font-semibold text-sky-900">
              Jumlah Penumpang
            </p>
            <div className="flex group h-fit gap-3">
              <div className="bg-slate-300 min-h-full aspect-square w-[51.2px] border-2 border-[#6B6B6B] rounded-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31] shrink-0" onClick={() => setJumlahPenumpang(jumlahPenumpang-1)}>
                <FaMinus />
              </div>
              <Textfield
                placeholder={"Jumlah Penumpang"}
                value={jumlahPenumpang} 
                type={"field"}              
              />
              <div className="bg-slate-300 min-h-full aspect-square w-[51.2px] border-2 border-[#6B6B6B] rounded-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31] shrink-0" onClick={() => setJumlahPenumpang(jumlahPenumpang+1)}>
                <FaPlus />
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              text="Pesan Kereta"
            />
          </div>
        </form>
      </Modal>

      <div className="min-h-screen w-full">
        <Navbar active={0} open={false} />
        <div className="w-full h-[536px] bg-[url('./assets/banner.svg')] bg-cover"></div>
        <div className="relative -top-6 px-20 flex gap-6">
          <div
            className="w-[800px] h-fit flex flex-col gap-5"
            ref={peerContainerRef}
          >
            <form
              // onSubmit={(e) => handleLogin(e)}
              className="flex h-auto flex-col bg-purple-primary px-5 py-3 gap-4 rounded-xl shadow-2xl "
            >
              {/* {isLoadingSearch ? (
                <div
                  className={`text-white text-2xl h-[380px] justify-self-center self-center flex items-center justify-center`}
                >
                  <svg
                    className="mr-3 h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : ( */}
              {/* <> */}
              <h1 className="flex flex-col text-white text-4xl font-bold">
                Pemesanan Tiket Holi-Train
              </h1>
              <div>
                <p className="text-2xl mb-1 font-semibold text-white">
                  Nama Kereta
                </p>
                <div className="flex group flex-grow">
                  <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31] shrink-0">
                    <IoMdTrain />
                  </div>
                  <Dropdown
                    placeholder={"Nama Kereta.."}
                    options={optionsMerk}
                    onChange={(selectedOption: any) =>
                      selectedOption != null
                        ? setMerk(selectedOption.value)
                        : setMerk(null)
                    }
                  />
                </div>
              </div>
              <section className="flex gap-5">
                <div className="w-full">
                  <p className="text-2xl mb-1 font-semibold text-white">
                    Kota Asal
                  </p>
                  <div className="w-full flex group">
                    <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31]">
                      <IoMdTrain />
                    </div>
                    <Dropdown
                      placeholder={"Kota Asal.."}
                      options={optionsAsal}
                      onChange={(selectedOption: any) =>
                        selectedOption != null
                          ? setAsal(selectedOption.value)
                          : setAsal(null)
                      }
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-2xl mb-1 font-semibold text-white">
                    Kota Tujuan
                  </p>
                  <div className="w-full flex group">
                    <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31]">
                      <IoMdTrain />
                    </div>
                    <Dropdown
                      placeholder={"Kota Tujuan.."}
                      options={optionsTujuan}
                      onChange={(selectedOption: any) =>
                        selectedOption != null
                          ? setTujuan(selectedOption.value)
                          : setTujuan(null)
                      }
                    />
                  </div>
                </div>
              </section>
              <div>
                <p className="text-2xl mb-1 font-semibold text-white">
                  Tipe Kereta
                </p>
                <div className="flex group w-[320px] flex-grow">
                  <div className="bg-slate-300 w-[39.2px] border-2 border-r-0 border-[#6B6B6B] rounded-l-xl text-2xl flex justify-center items-center text-slate-600 peer group-hover:border-[#ED7D31] shrink-0">
                    <IoMdTrain />
                  </div>
                  <Dropdown
                    placeholder={"Tipe Kereta.."}
                    options={optionsTipe}
                    onChange={(selectedOption: any) =>
                      selectedOption != null
                        ? setTipe(selectedOption.value)
                        : setTipe(null)
                    }
                  />
                </div>
              </div>
              <div className="w-full mt-3">
                <Button
                  type="button"
                  color="primary"
                  isLoading={isLoading}
                  text="Cari Kereta"
                  onClick={() => getKeretaBySearch()}
                />
              </div>
              {/* </>
              )} */}
            </form>
            {kereta.length > 0 ? (
              kereta.map((item: any, idx: number) => {
                return (
                  <KeretaCard
                    key={idx}
                    merk={item.merk}
                    tipe={item.tipe}
                    keberangkatan={item.keberangkatan}
                    tujuan={item.tujuan}
                    jml_gerbong={item.jml_gerbong}
                    onClick={() => {
                      setIdKeretaPesan(item.id);
                      setShowModalPesan(true);
                    }}
                  />
                );
              })
            ) : isLoading ? (
              <div
                className={`text-purple-primary flex items-center justify-center`}
              >
                <svg
                  className="mr-3 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <p className="text-center text-mono-grey text-2xl font-bold">
                Data Tidak Ada!
              </p>
            )}
          </div>
          <div
            className={`max-h-[720px] flex-grow bg-[#F0F0F0] shadow-2xl rounded-xl px-5 py-3 overflow-hidden flex flex-col gap-4`}
          >
            <h1 className="flex flex-col text-4xl font-bold">
              Holiday Recommendation
            </h1>
            <div className="grow overflow-auto flex flex-col gap-4">
              {liburan.map((item: any, idx: number) => {
                return (
                  <HolidayCard
                    key={idx}
                    nama={item.name}
                    kategori={item.category}
                    location={item.location}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    biaya={item.perkiraan_biaya}
                  />
                );
              })}
              {/* <HolidayCard
                nama={"Kontol nya gede banget oh my god baby yes"}
                kategori={"Kontol"}
                location={"Kontol"}
                latitude={-6.914744}
                longitude={107.60981}
                biaya={20000}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
