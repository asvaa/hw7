import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
} from "react";
import s from "./SuperEditableSpan.module.css";
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText";
import editIcon from "./editIcon.svg";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type SuperEditableSpanType = Omit<DefaultInputPropsType, "type"> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanProps?: DefaultSpanPropsType & { defaultText?: string };
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  onChangeText,
  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { children, onDoubleClick, className, defaultText, ...restSpanProps } =
    spanProps || {};

  const onEnterCallback = () => {
    setEditMode(false);
    onEnter?.();
  };

  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    onBlur?.(e);
  };

  const onDoubleClickCallBack = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setEditMode(true);
    onDoubleClick?.(e);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    restProps.onChange?.(e);
    onChangeText?.(e.currentTarget.value);
  };

  const spanClassName = `${s.span}${className ? " " + className : ""}`;

  return (
    <>
      {editMode ? (
        <SuperInputText
          autoFocus={autoFocus || true}
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          className={s.input}
          onChange={onChangeHandler}
          value={restProps.value}
          {...restProps}
        />
      ) : (
        <div className={s.spanBlock}>
          <img src={editIcon} className={s.pen} alt={"edit"} />
          <span
            onDoubleClick={onDoubleClickCallBack}
            className={spanClassName}
            {...restSpanProps}
          >
            {children || restProps.value || defaultText}
          </span>
        </div>
      )}
    </>
  );
};

export default SuperEditableSpan;
