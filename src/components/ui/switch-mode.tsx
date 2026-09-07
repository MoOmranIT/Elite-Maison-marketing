import type { FC } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/context/language";

type SwitchModeProps = {
  width?: number;
  height?: number;
};

export const SwitchMode: FC<SwitchModeProps> = ({
  width = 88,
  height = 44
}) => {
  const { lang, setLang, t } = useI18n();
  const reduce = useReducedMotion() === true;
  const isAr = lang === "ar";
  const inset = 2;
  const knob = height - inset * 2;
  const travel = width - height;
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 20 };

  return (
    <motion.button
      type="button"
      className="lang-switch"
      dir="ltr"
      aria-label={t("langTo")}
      data-lang={lang}
      style={{ width, height }}
      onClick={() => setLang(isAr ? "en" : "ar")}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <span className="lang-switch__track" aria-hidden="true" />
      <motion.span
        className="lang-switch__knob"
        aria-hidden="true"
        initial={false}
        animate={{ x: isAr ? travel : 0 }}
        transition={spring}
        style={{ width: knob, height: knob, top: inset, left: inset }}
      />
      <motion.span
        className="lang-switch__opt lang-switch__opt--en"
        style={{ width: height, height }}
        animate={{ rotate: isAr ? 8 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 14 }}
      >
        EN
      </motion.span>
      <motion.span
        className="lang-switch__opt lang-switch__opt--ar"
        style={{ width: height, height }}
        animate={{ rotate: isAr ? 0 : -8 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 14 }}
      >
        ع
      </motion.span>
    </motion.button>
  );
};
