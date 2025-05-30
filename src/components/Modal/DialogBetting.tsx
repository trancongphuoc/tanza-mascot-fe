import { useState, useContext } from "react";
import bgCardSelect from "../../assets/bg_card_selected.svg";
import Icoin from "../../assets/icoin.svg";
// import BgContent from '../../assets/bg_content_win.svg';
import BgContent075x from "../../assets/bg_content_betting_075x.png";
import BgContent2x from "../../assets/bg_content_betting_2x.png";

import BgHeader from "../../assets/bg_header_betting.svg";
import BgLighter from "../../assets/bg_lighter.svg";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import toast from "react-hot-toast";
import LazyImage from "../LazyImage";
// import { log } from "../../utils/log";
import ButtonStake from "../ButtonStake";

import AnimatedCounter from "../animation/AnimatedCounter";
import ButtonMoving from "../ButtonMoving";
import { GameInfoContext } from "../../store/game-info_context";
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const DialogBetting = () => {
  // log("<DialogBetting />");
  const { t } = useTranslation();
  const [bettingIcoin, setBettingIcoin] = useState({ from: 0, to: 0 });
  const { setModal, selectedCard, transactionId, betting, totalIcoin } =useContext(GameInfoContext);

  // const clickAudioRef =  useAudio(audioBet);
  // const confirmRef = useAudio(audioConfirm);

  // function playAudio () {
  //   const audio = useAudio(audioBet);
  //   // audio.currentTime = 0;
  //   audio.p
  // }

  const sendDataOut = () => {
    if (!transactionId) {
      toast.dismiss();
      toast(t("Missing game information"), {
        duration: 2000,
        position: "bottom-center",
      });
      return;
    }
    if (!selectedCard) {
      toast.dismiss();
      toast(t("Missing card selection"), { duration: 2000, position: "bottom-center" });
      return;
    }
    if (bettingIcoin.to == 0) {
      toast.remove();
      toast("Missing bet amount", { duration: 2000, position: "bottom-center" });
      return;
    }

    const betCard: BetZodiacCard = {
      ...selectedCard,
      totalIcoinBetting: bettingIcoin.to || 0,
    };

    setModal({ state: "CLOSE", type: "BETTING" });
    betting(betCard);
  };

  const handleStake = (stake: number, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stake) {
      // const totalIcoinString = localStorage.getItem("totalIcoin");
      // const totalIcoin =
      //   totalIcoinString !== null ? parseInt(totalIcoinString, 10) : 0;

      const newStake = bettingIcoin.to + stake;
      if (newStake <= totalIcoin) {
        const oldBetting = bettingIcoin.to;

        setBettingIcoin((prevState) => ({
          ...prevState,
          from: oldBetting,
          to: newStake,
        }));
      } else {
        setModal({ state: "OPEN", type: "DEPOSIT" });
      }
    } else {
      // log("no stake");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="betting-popup-overlay"
      onClick={() => setModal({ state: "CLOSE", type: "BETTING" })}
      transition={{ type: "just" }}
      aria-labelledby="betting-dialog-title"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="betting-popup"
        aria-modal="true"
      >
        {/* <SVG src={BgContent} className="betting--BgContent" onClick={(e) => e.stopPropagation()}/> */}

        {/* <img
          src={BgContent}
          className="betting--BgContent"
          role='img'
          alt='image background betting'
          onClick={(e) => e.stopPropagation()}/> */}

        <LazyImage
          lowResSrc={BgContent075x}
          highResSrc={BgContent2x}
          alt="betting"
          className="betting--BgContent"
        />

        <SVG
          src={bgCardSelect}
          className="betting--zodiac-background"
          onClick={(e) => e.stopPropagation()}
        />
        {selectedCard?.imageUrl && (
          <SVG
            src={selectedCard?.imageUrl || ""}
            onClick={(e) => e.stopPropagation()}
            className="betting--zodiac-card"
          />
        )}
        <SVG
          src={BgLighter}
          className="betting--BgLighter"
          onClick={(e) => e.stopPropagation()}
        />
        <SVG
          src={BgHeader}
          className="betting--BgHeader"
          onClick={(e) => e.stopPropagation()}
        />

        <p className="betting--text" onClick={(e) => e.stopPropagation()}>
          {t("Good luck and get big prize")}
        </p>

        <div
          className="betting__totalIcoin mb-15px mt-28px"
          onClick={(e) => e.stopPropagation()}
        >
          <SVG className="betting__totalIcoin--img" src={Icoin} />
          {/* <p className="betting__totalIcoin--icoin">{stakes}</p> */}
          <AnimatedCounter from={bettingIcoin.from} to={bettingIcoin.to} />
        </div>
        <ButtonMoving
          content={"+10"}
          setClick={(e) => handleStake(10, e)}
          cssClass="betting--button-1"
        />

        <ButtonMoving
          content={"+100"}
          setClick={(e) => handleStake(100, e)}
          cssClass="betting--button-2"
        />

        <ButtonMoving
          content={"+1000"}
          setClick={(e) => handleStake(1000, e)}
          cssClass="betting--button-3"
        />

        <ButtonStake
          handleClick={sendDataOut}
          className="betting__confirm mb-34px mt-14-5px"
        >
          {t("Confirm")}
        </ButtonStake>
      </motion.div>
    </motion.div>
  );
};

export default DialogBetting;
