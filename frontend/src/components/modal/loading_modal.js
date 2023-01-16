import Lottie from "lottie-react";
import loadingLottie from "../../loading_lottie.json";

function LoadingModal() {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="fixed">
        <Lottie className="" animationData={loadingLottie}></Lottie>
      </div>
      <p className="fixed self-center mt-36 text-ukblue text-xl">It takes about 15 seconds...</p>
    </div>
  )
}

export default LoadingModal;