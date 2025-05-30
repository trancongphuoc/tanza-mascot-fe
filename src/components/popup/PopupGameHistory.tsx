import React, { useEffect, useState, useContext } from 'react';
import SVG from 'react-inlinesvg';

import { GameHistory } from '../../model/GameHistory';
import { fetchGameHistory } from '../../api/getGameHistory';
// import bgHistoryGame from '../../assets/bg_history_game.svg';
// import bgHistoryGame from '../../assets/bg_game_history.png';
// import bgHistoryGame75 from '../../assets/bg_game_history_0_75x.png';

import bgGameHistory075x from '../../assets/bg_game_history_075x.png';
import bgGameHistory2x from '../../assets/bg_game_history_2x.png';

import BgCard from '../../assets/bg_card_normal_light.svg';
import StickIcon from  '../../assets/icon_stick.svg';
import TextResult from '../../assets/text-result-2.svg';
import Loading from '../Loading';
import PopupCenter from './PopupCenter';
import LazyImage from '../LazyImage';
import { GameInfoContext } from '../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

interface PopupGameHistoryProps {
  zodiacs: string[];
}

const PopupGameHistory: React.FC<PopupGameHistoryProps> = ({ zodiacs }) => {
  const [gameHistories, setGameHistories] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setModal } = useContext(GameInfoContext)
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameHistory();
        if (data != null) {
          setGameHistories(data);
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <PopupCenter
    className='popup-overlay-history'
    onClick={() => setModal({state: "CLOSE", type: "GAMEHISTORY"})}
    classNameChild='history-game-popup'>
        {/* <SVG src={bgHistoryGame} className="history-game-popup__bg" /> */}
        {/* <img src={bgHistoryGame} className="history-game-popup__bg" /> */}

        <LazyImage
          lowResSrc={bgGameHistory075x}
          highResSrc={bgGameHistory2x}
          alt='history game'
          className='history-game-popup__bg'
        />

        <SVG style={{width: "60%"}} src={TextResult} className="history-game-popup--header" />

        <div className="history-game-popup__title mt-7px">
          <p className="history-game-popup__title--no">{t("Round")}</p>
          {zodiacs.map((zodiac, index) => {
            return <div key={index} className="history-game-popup__card">
              <SVG src={BgCard} className="history-game-popup__card--Bg" />
              <SVG src={zodiac} className="history-game-popup__card--zodiac" />
            </div>
          })}
        </div>

        {loading ? (
          <Loading className="history-game-popup__loading"/>
        ) : (
          <div className="history-game-popup__content">
            {gameHistories.map((game) => (
              <div key={game.noGame} className="history-game-popup__item">
                <p className='history-game-popup__item--index'>{game.noGame}</p>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="history-game-popup__item--buffalo">
                    <SVG
                      className={game.zodiacCardId.slice(-1) === (i + 1).toString() ?
                        "history-game-popup__item--stickShow" :
                        "history-game-popup__item--stickHide"}
                      src={StickIcon}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </PopupCenter>
  );
};

export default PopupGameHistory;
