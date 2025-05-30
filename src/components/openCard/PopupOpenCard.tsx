import { useContext } from 'react';
import PopupCenter from '../popup/PopupCenter';
import LottieAnimation from './AnimationOpenCard';
// import animationData from '../../assets/json/game_ketqua3s.json';
import animationData from '../../assets/json/xoayxoay.json';
import SVG from 'react-inlinesvg';
import { GameInfoContext } from '../../store/game-info_context';


const PopupOpenCard = () => {
  // const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { setModal, cardResult } = useContext(GameInfoContext);

  // useEffect(() => {
  //   setIsAnimationComplete(true);

  //   const hideSvgTimer = setTimeout(() => {
  //     setIsAnimationComplete(false);
  //   }, 2000); // 2.7 seconds delay

  //   return () => {
  //     clearTimeout(hideSvgTimer);
  //   }; // Cleanup timers on component unmount
  // }, []);

  return (
    <PopupCenter
      className='popup-overlay-history'
      classNameChild='open-card'
    >
        <LottieAnimation
        animationData={animationData}
        style={{ width: 300, height: 300 }}
        speed={1}
        direction={1}           
        onComplete={ () => setModal({state: "CLOSE", type: "GAMERESULT"})}
        className='open-card--lottie-animation'
      />
       <SVG src={cardResult?.imgUrl || ""} className='open-card--img'/>
    </PopupCenter>
  );
};

export default PopupOpenCard;
