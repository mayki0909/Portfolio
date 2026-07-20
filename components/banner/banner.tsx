import { NextComponentType } from "next";
import styles from "./banner.module.scss";
import { ArrowIcon } from "../ui/arrow-icon";

export const Banner: NextComponentType = () => {
  return (
    <a
      className={styles.container}
      href="#contact"
      aria-label="Start a conversation"
    >
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1, 2, 3].map((item) => (
            <span className={styles.text} key={item}>
              LET&apos;S <span className={styles.purple}>CREATE</span> SOMETHING
              <i>
                <ArrowIcon size={36} />
              </i>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};
