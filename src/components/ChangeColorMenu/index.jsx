import React, {useEffect, useRef, useState} from 'react';
import styles from './style.module.scss';
import {ReactComponent as ColorPalette} from '../../assets/color-palette.svg';
import {ReactComponent as PreviewIcon} from '../../assets/preview.svg';
import {ReactComponent as AcceptIcon} from '../../assets/accept.svg';
import gradients from '../../assets/gradients.json'

const ChangeColorMenu = (props) => {
  const {
    initialValue,
    callback
  } = props
  const firstValue = initialValue
  const [isOpened, setIsOpened] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(initialValue);
  const refColorPaletteBlock = useRef(null);
  const refTextarea = useRef(null);
  const onClickHandler = (e) => {
    setIsOpened(true);
  };

  const handleClickOutside = (e) => {
    if (refColorPaletteBlock.current && !refColorPaletteBlock.current.contains(e.target)) {
      setIsOpened(false);
    }
  };


  useEffect(() => {
    const body = document.querySelector('body');
    const colorPaletteBlock = refColorPaletteBlock?.current;
    const textarea = refTextarea?.current;
    if (isOpened) {
      body.style.pointerEvents = 'none';
      colorPaletteBlock.style.pointerEvents = 'all';
      document.addEventListener('click', handleClickOutside);
    } else {
      body.style.pointerEvents = '';
      colorPaletteBlock.style.pointerEvents = '';
      document.removeEventListener('click', handleClickOutside);
      setTextAreaValue('');
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpened]);

  const onChangeHandler = (e) => {
    setTextAreaValue(e.target.value);
  } ;

  const acceptClickHandler = () => {
    callback(textAreaValue);
    localStorage.setItem('backgroundColor', textAreaValue);
    setIsOpened(false);
  }

  const mouseEnterHandler = () => {
    callback(textAreaValue);
  }
  const mouseEnterVariantHandler = (variant) => {
    callback(variant);
  }
  const mouseLeaveHandler = () => {
    callback(localStorage.getItem('backgroundColor'))
  }
  const mouseLeaveVariantHandler = () => {
    callback(localStorage.getItem('backgroundColor'))
  }
  const onClickVariantsHanlder = (variant) => {
    setTextAreaValue(variant)
  }
  return (
    <div
      ref={refColorPaletteBlock}
      className={styles.main}
    >
      <div
        title={'change background gradient'}
      >
        <ColorPalette
          role="presentation"
          onClick={onClickHandler}
          className={`
          ${styles.colorPaletteIcon}
          ${isOpened && (styles.hidden)}
        `}
        />
      </div>
      {isOpened && (
        <div className={styles.colorInputBlock}>
          <textarea
            placeholder="Paste your linear or other gradient"
            ref={refTextarea}
            onChange={onChangeHandler}
            value={textAreaValue}
          />
          <PreviewIcon
            className={styles.previewIcon}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          />
          <div className={styles.gradientVariantsBlock}>
            {gradients.map(({id, name, gradient}) => (
              <div
                onMouseEnter={() => mouseEnterVariantHandler(gradient)}
                onMouseLeave={mouseLeaveVariantHandler}
                onClick={() => onClickVariantsHanlder(gradient)}
                className={styles.gradientVariant}
                title={name}
                key={id}
                style={{
                  background: gradient
                }}
              />
            ))}
          </div>
          <div
            className={styles.acceptIconBlock}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "flex-end",
              gap: '10px'
            }}
          >
            <AcceptIcon
              className={styles.acceptIcon}
              onClick={acceptClickHandler}
            />
          </div>
        </div>
      )}
    </div>
  )
};
export default ChangeColorMenu;