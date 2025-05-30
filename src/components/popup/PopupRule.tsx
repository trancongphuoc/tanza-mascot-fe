import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { RULE_CONTENTS } from '../../model/RuleContent';
import PopupCenter from './PopupCenter';
import { GameInfoContext } from '../../store/game-info_context';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n'; // Import file cấu hình i18n

const PopupRule = () => {
  const { t } = useTranslation();
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const { setModal } = useContext(GameInfoContext);

  useEffect(() => {
    RULE_CONTENTS.forEach((rule) => {
      new Image().src = rule.image;
    });
  }, []);


  const handleNext = () => {
    setCurrentRuleIndex((prevIndex) => (prevIndex + 1) % RULE_CONTENTS.length);
  };

  return (
    <PopupCenter
     className='popup-overlay-history'
      onClick={() => setModal({ state: "CLOSE", type: "RULE"})}
      classNameChild='rule'
    >
        <p className='rule--primary mt-20px'>{t("Rules of Mascot")}</p>
        <img 
          className='rule--img mb-20px mt-18-5px'
          src={RULE_CONTENTS[currentRuleIndex].image}
        />
        <p className='rule--secondary'>{RULE_CONTENTS[currentRuleIndex].text}</p>
        <div className='rule__line mt-18px'>
          {RULE_CONTENTS.map((_, index) => (
            <p 
              key={index}
              className={currentRuleIndex == index ? 'rule__line--selected' : 'rule__line--normal'}
            >&nbsp;</p>
            ))
          }
        </div>
        <motion.div
          whileTap={{y: 1}}
          className="rule__button mb-21px mt-13px"
          onClick={handleNext}>
          <p className="rule__button--next">{t("Continue")}</p>
        </motion.div>
     </PopupCenter>
  );
};

export default PopupRule;
