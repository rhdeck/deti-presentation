import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
// import { PlugButton } from "@raydeck/useplug";
import background from "./assets/bg.png";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "./declarations/backend/backend.did";
import { createActor } from "./declarations/backend";
import {
  FaFilePowerpoint,
  FaGithub,
  FaHourglass,
  FaNpm,
  FaTrophy,
  FaTwitter,
} from "react-icons/fa";
import config from "./config.json";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import {
  ArrowUpIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  VideoCameraIcon,
  ChevronRightIcon,
  ClipboardCopyIcon,
} from "@heroicons/react/outline";
import ModalSlides from "./ModalSlides";
const slideClass =
  "w-80 mb-6 bg-black bg-opacity-90 border-2 border-orange-500 text-md font-medium text-white p-2 rounded-full transition hover:scale-105 transition-duration-250 hover:bg-opacity-60 hover:border-blue-900";
const blurOff = "blur-sm";
const blurOn = "blur-lg";
const {
  host,
  canisters: { backend },
} = config[config.mode as "production" | "local"];
let timer: NodeJS.Timer;
const backendStr = backend;
const useBackend = () => {
  const [actor, setActor] = useState<ActorSubclass<_SERVICE>>();
  useEffect(() => {
    (async () => {
      const a = createActor(backend, {
        agentOptions: { host },
      });
      setActor(a);
    })();
  }, []);
  return actor;
};
export const LoggedOut: FC = () => {
  const [newClass, setNewClass] = useState("");
  const [plugNewClass, setPlugNewClass] = useState("opacity-0");
  const [iconNewClass, setIconNewClass] = useState("text-black");
  const [isOpen, setIsOpen] = useState(false);
  const [ticks, setTicks] = useState(BigInt(0));
  const backend = useBackend();
  useEffect(() => {
    setTimeout(() => {
      setNewClass(blurOff);
      setPlugNewClass("opacity-100");
    }, 5000);
  }, []);
  const [isFirst, setIsFirst] = useState(BigInt(0));
  useEffect(() => {
    if (ticks) {
      if (!isFirst) {
        setIsFirst(ticks);
      } else {
        if (ticks !== isFirst) {
          setNewClass(blurOn);
          toast("Received a DeTi Message!");
          setTimeout(() => {
            setNewClass(blurOff);
          }, 1500);
        }
      }
    }
  }, [ticks, isFirst]);
  useEffect(() => {
    if (isOpen && !isFirst) {
      setPlugNewClass("opacity-0");
    } else {
      setPlugNewClass("opacity-100");
    }
  }, [isOpen, isFirst]);
  const getStats = useCallback(async () => {
    if (backend) {
      const ticks = await backend.getTicks();
      setTicks(ticks);
    }
  }, [backend]);
  useEffect(() => {
    if (backend) {
      clearInterval(timer);
      timer = setInterval(getStats, 5000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [getStats, backend]);

  return (
    <Fragment>
      <div
        className={[
          "h-screen w-screen absolute  bg-cover transition duration-1000 ",
          newClass,
        ].join(" ")}
        style={{ backgroundImage: `url(${background})` }}
        onClick={() => {
          setNewClass("backdrop-blur");
          setPlugNewClass("opacity-100");
        }}
      ></div>

      <div
        className={[
          "h-screen w-screen absolute lg:flex lg:flex-col lg:justify-center content-around transition duration-1000  overflow-scroll",
        ].join(" ")}
      >
        <div className="flex justify-center align-center">
          <div
            className={[
              "  grid grid-cols-1 lg:grid-cols-2 gap-12 transition-opacity  duration-1000 p-4",
              plugNewClass,
            ].join(" ")}
          >
            {/* <div className="bg-black bg-opacity-50 flex flex-row w-screen justify-between p-4">
            <a
              href="https://github.com/akshay-rakheja/supernova2022"
              className="text-gray-200 hover:text-gray-100 hover:scale-105 transition duration-250"
            >
              <div className="flex flex-row ">
                <FaGithub size={20} />
                <span className="ml-2 font-medium">Fork us on GitHub</span>
              </div>
            </a>
            <div className=" font-bold text-white opacity-50">
              ...or just enjoy the pulses every 10s
            </div>
          </div> */}
            <div className="lg:hidden col-span-1">
              <h2 className="text-center align-center text-gray-100 font-bold text-4xl flex justify-center p-4 m-2 bg-black bg-opacity-80 rounded-lg">
                Decentralized <br className="md:hidden" />
                Time Travel
              </h2>
            </div>
            <div className=" col-span-1 bg-black bg-opacity-80 rounded-lg p-4">
              <h3 className="text-gray-100 font-medium text-2xl flex justify-center p-2 m-2 ">
                Presentation
              </h3>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      setIsOpen(true);
                    }}
                  >
                    <div className="flex flex-row">
                      <SparklesIcon className="h-6 w-6 mr-2" />
                      Supernova Demo Day Presentation
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      copy(backendStr);
                      toast("Copied to clipboard");
                    }}
                  >
                    <div className="flex flex-row">
                      <ClipboardCopyIcon className="h-6 w-6 mr-2" />
                      Copy Back-End Canister Id
                    </div>
                  </button>
                </div>
              </div>{" "}
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      copy("tick");
                      toast("Copied to clipboard");
                    }}
                  >
                    <div className="flex flex-row">
                      <ClipboardCopyIcon className="h-6 w-6 mr-2" />
                      Copy Back-End Function Name
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-span-1 bg-black bg-opacity-80 rounded-lg p-4">
              <h3 className="text-gray-100 font-medium text-2xl flex justify-center p-2 m-2">
                Demonstration
              </h3>

              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://fl5mh-daaaa-aaaap-qalja-cai.ic0.app/",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <FaHourglass className="h-6 w-6 mr-2" />
                      DeTi Home Page
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://d7hzd-wiaaa-aaaap-qamba-cai.ic0.app/",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <CheckCircleIcon className="h-6 w-6 mr-2" />
                      DeTi Tester
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://pax7q-vaaaa-aaaap-qanoq-cai.ic0.app/",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <FaTrophy className="h-6 w-6 mr-2" />
                      DeTi Presentation (You are here)
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-span-1 bg-black bg-opacity-80 rounded-lg p-4">
              <h3 className="text-gray-100 font-medium text-2xl flex justify-center p-2 m-2">
                Resources
              </h3>

              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open("https://twitter.com/deti_icp", "_blank");
                    }}
                  >
                    <div className="flex flex-row">
                      <FaTwitter className="h-6 w-6 mr-2" />
                      Follow us on Twitter
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://www.youtube.com/watch?v=TK-RihJkvDw",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <VideoCameraIcon className="h-6 w-6 mr-2" />
                      View Youtube Video
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://www.devpost.com/software/decentralized-time",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <ChevronRightIcon className="h-6 w-6 mr-2" />
                      Read Devpost Profile
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-span-1 bg-black bg-opacity-80 rounded-lg p-4">
              <h3 className="text-gray-100 font-medium text-2xl flex justify-center p-2 m-2">
                Extras
              </h3>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://npmjs.com/@raydeck/useplug",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <FaNpm className="h-6 w-6 mr-2" />
                      usePlug NPM Package
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full flex-row">
                <div className="flex">
                  <button
                    className={slideClass}
                    onClick={(event) => {
                      window.open(
                        "https://github.com/rhdeck/deti-presentation",
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-row">
                      <FaGithub className="h-6 w-6 mr-2" />
                      Github Repo for This Project
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSlides show={isOpen} setShow={setIsOpen} />
    </Fragment>
  );
};

/* This example requires Tailwind CSS v2.0+ */

export default LoggedOut;
