import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import useKeyPress from "./useKeyPress";
import One from "./assets/1.png";
import Two from "./assets/2.png";
import Three from "./assets/3.png";
import Four from "./assets/4.png";
import Six from "./assets/6.png";
import Seven from "./assets/7.png";
import Eight from "./assets/8.png";
import Nine from "./assets/9.png";
import Ten from "./assets/10.png";
import Eleven from "./assets/11.png";
import Twelve from "./assets/12.png";
import Thirteen from "./assets/13.png";
import Fourteen from "./assets/14.png";
import Fifteen from "./assets/15.png";
import Sixteen from "./assets/16.png";
import Seventeen from "./assets/17.png";
import Eighteen from "./assets/18.png";
import useWindowSize from "./useWindowSize";
import { Link } from "react-router-dom";
const slideClass =
  " group w-80 mb-6 bg-black bg-opacity-80 border-2 border-orange-500 text-md font-medium text-white p-2 rounded-full transition hover:scale-105 transition-duration-250 hover:bg-opacity-60 hover:border-blue-900";
const selectorClass =
  "flex justify-center group w-12  mb-6  text-md font-medium text-white p-2  hover:scale-125 opacity-80 hover:opacity-100 transition-all transition-duration-500 ";
const currentSelectorClass =
  "flex justify-center group w-12  mb-6  text-md font-medium text-white p-2  opacity-80 transition-all transition-duration-500 ";
const selectorIconClass = "rounded-full bg-white h-4 w-4";
const currentSelectorIconClass = "rounded-full bg-blue-900 h-4 w-4";
const slideData = [
  { image: One },
  { image: Two },
  { image: Three },
  { image: Four },
  { url: "https://fl5mh-daaaa-aaaap-qalja-cai.ic0.app/" },
  { image: Six },
  { image: Seven },
  { image: Eight },
  { image: Nine },
  { image: Ten },
  { image: Eleven },
  { image: Twelve },
  { image: Thirteen },
  { image: Fourteen },
  // { image: Fifteen },
  // { image: Sixteen },
  // { image: Seventeen },
  // { image: Eighteen },
] as { image?: string; embed?: string; url?: string }[];
export const ModalSlides: FC<{
  show: boolean;
  setShow: (show: boolean) => void;
}> = ({ show, setShow }) => {
  const [targetHeight, setTargetHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const windowSize = useWindowSize();
  useEffect(() => {
    const factor = 1.4;
    if (windowSize.width > windowSize.height * factor) {
      setTargetWidth(windowSize.height * factor);
      setTargetHeight((((windowSize.height * factor) / 1) * 9) / 16);
    } else {
      setTargetWidth(windowSize.width);
      setTargetHeight((((windowSize.width * 1) / 1) * 9) / 16);
    }
  }, [windowSize]);
  useEffect(() => {
    setTargetWidth(
      windowSize.width > 1536 ? windowSize.width * 0.75 : windowSize.width
    );
  }, [windowSize]);
  const slides = useMemo(
    () =>
      slideData.map(({ image, embed, url }, index) => (
        <div style={{ height: targetHeight }} className="w-full align-center">
          {image && (
            <img
              key={index}
              src={image}
              style={{
                objectFit: "contain",
                height: targetHeight,
                width: targetWidth,
              }}
            />
          )}
          {embed && (
            <iframe
              src={embed}
              style={{ height: targetHeight, width: targetWidth }}
            />
          )}
          {url && (
            <div
              style={{ height: targetHeight, width: targetWidth }}
              className="flex flex-col justify-center align-center"
            >
              <div className="flex flex-row justify-center">
                <a
                  rel="noopener noreferrer"
                  href={url}
                  target="_blank"
                  className="hover:scale-105 hover:bg-opacity-100 border-4 border-orange-500 transition-all p-4 text-white font-medium text-lg bg-blue-900 bg-opacity-80 rounded-full"
                >
                  Open DeTi For Demo
                </a>
              </div>
            </div>
          )}
        </div>
      )),
    [targetHeight]
  );
  const [moving, setMoving] = useState("right");
  const [currentStep, setCurrentStep] = useState(0);
  const pressedRight = useKeyPress("ArrowRight");
  const pressedLeft = useKeyPress("ArrowLeft");
  const pressedSpace = useKeyPress("Space");
  const pressedEscape = useKeyPress("Escape");
  useEffect(() => {
    setShow(false);
  }, [pressedEscape, setShow]);
  const currentStepRef = useRef(currentStep);
  const oldStepRef = useRef(0);
  const goLeft = useCallback(() => {
    setMoving("left");
    setCurrentStep((old) => {
      oldStepRef.current = old;
      return Math.max(old - 1, 0);
    });
  }, []);
  const goRight = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      setMoving("right");
      if (currentStepRef.current === slides.length - 1) {
        console.timeEnd("slide-" + currentStepRef.current);
        const allsecs = (new Date().valueOf() - startTimeRef.current) / 1000;
        const mins = Math.floor(allsecs / 60);
        const secs = Math.floor(allsecs % 60);
        console.log(
          "slide-" + currentStepRef.current,
          new Date().toLocaleTimeString(),
          `${mins}:${secs}`
        );
        setShow(false);
      }
      setCurrentStep((old) => {
        oldStepRef.current = old;
        return Math.min(old + 1, slides.length - 1);
      });
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    },
    [setShow, slides]
  );
  const goTo = useCallback(
    (index: number) => {
      if (index > currentStep) {
        setMoving("right");
      } else {
        setMoving("left");
      }
      oldStepRef.current = currentStep;
      setCurrentStep(index);
    },
    [currentStep]
  );
  useEffect(() => {
    if (pressedRight) {
      goRight();
    } else if (pressedLeft) {
      goLeft();
    }
  }, [goLeft, goRight, pressedLeft, pressedRight, pressedSpace]);
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep, slides.length]);
  const rightButton = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (show) {
      setCurrentStep(0);
      startTimeRef.current = 0;
    }
  }, [show]);
  const startTimeRef = useRef(0);
  useEffect(() => {
    if (!startTimeRef.current && currentStep) {
      startTimeRef.current = Date.now();
    }

    console.timeEnd("slide-" + oldStepRef.current);
    const allsecs = (new Date().valueOf() - startTimeRef.current) / 1000;
    const mins = Math.floor(allsecs / 60);
    const secs = Math.floor(allsecs % 60)
      .toString()
      .padStart(2, "0");
    console.log(
      "slide-" + oldStepRef.current,
      new Date().toLocaleTimeString(),
      `${mins}:${secs}`
    );
    console.time("slide-" + currentStep);
  }, [currentStep]);
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        onClose={() => {
          // setShow(false);
        }}
        className="absolute z-50 "
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100 "
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={
              "fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
            }
          >
            <Dialog.Panel
              className="flex-col relative justify-center flex max-h-screen m-4 z-50 "
              style={{ width: targetWidth }}
            >
              <div className="absolute top-1 right-20 z-50 bg-green-500 ">
                <div className="absolute p-4">
                  <button
                    onClick={() => {
                      setShow(false);
                    }}
                    // ref={closeButton}
                  >
                    <XCircleIcon className="h-12 w-12 text-gray-600 hover:text-gray-200 transition" />
                  </button>
                </div>
              </div>
              <div
                // onClick={goRight}
                style={{ height: targetHeight, width: targetWidth }}
                className="bg-black  bg-opacity-80 rounded-lg overflow-clip  border-gray-300 shadow-md dark:border-gray-600 border-opacity-40 border-2 relative w-full"
              >
                {slides.map((slide, index) => (
                  <Transition
                    key={index}
                    appear={false}
                    unmount={false}
                    show={currentStep === index}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom={moving === "right" ? `opacity-0` : `opacity-0`}
                    enterTo={` opacity-100`}
                    leave="transform transition ease-in-out duration-500 "
                    leaveFrom={`opacity-100`}
                    leaveTo={moving === "right" ? `opacity-0` : `opacity-0`}
                    className="bg-black overflow-visible absolute "
                    style={{ height: targetHeight }}
                    as="div"
                  >
                    {slide}
                  </Transition>
                ))}
              </div>
              <div className="flex flex-row justify-center">
                {slides.map((slide, buttonIndex) => (
                  <button
                    key={"button" + buttonIndex}
                    className={
                      currentStep === buttonIndex
                        ? currentSelectorClass
                        : selectorClass
                    }
                    onClick={() => goTo(buttonIndex)}
                  >
                    <div
                      className={
                        currentStep === buttonIndex
                          ? currentSelectorIconClass
                          : selectorIconClass
                      }
                    />
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-around">
                <button
                  className={slideClass}
                  // className="bg-black bg-opacity-80 text-white font-medium p-2 pr-4 text-md rounded-xl hover:scale transition group"
                  onClick={goLeft}
                >
                  <ChevronLeftIcon className="h-8 w-8 text-gray-400 group-hover:text-white transition inline" />
                  Back
                </button>
                <button
                  className={slideClass}
                  autoFocus
                  // className="bg-black bg-opacity-80 text-white font-medium p-2 pl-4 text-md rounded-xl hover:bg-orange-800 transition group"
                  onClick={goRight}
                  ref={rightButton}
                >
                  Next
                  <ChevronRightIcon className="h-8 w-8 text-gray-400 group-hover:text-white transition inline" />
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default ModalSlides;
