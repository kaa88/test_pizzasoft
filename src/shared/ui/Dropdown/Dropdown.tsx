import {
  ComponentPropsWithoutRef,
  memo,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import cn from "classnames";

import styles from "./Dropdown.module.scss";

export interface DropdownItem {
  value: string;
  text: string;
}

interface DropdownProps
  extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  selected: DropdownItem["value"];
  items: DropdownItem[];
  onChange: (value: DropdownItem["value"]) => void;
  state?: "default" | "error" | "success";
}

export const Dropdown = memo(
  ({
    className,
    selected,
    items,
    onChange,
    state,
    ...props
  }: DropdownProps): JSX.Element => {
    const [active, setActive] = useState(false);

    const toggle = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setActive(!active);
    };
    const close = () => {
      setActive(false);
    };

    useEffect(() => {
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }, []); // eslint-disable-line

    return (
      <div
        className={cn(
          className,
          styles._,
          active && styles.active,
          !!state && styles[state]
        )}
      >
        <button className={styles.header} type="button" onClick={toggle}>
          <span>
            {items.reduce(
              (result, item) => (item.value === selected ? item.text : result),
              ""
            ) || "Выберите"}
          </span>
          <i>«</i>
        </button>

        <div className={styles.list}>
          {items.map((item) => (
            <button
              className={cn(
                styles.item,
                selected === item.value && styles.active
              )}
              type="button"
              onClick={() => onChange(item.value)}
              key={item.value}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
