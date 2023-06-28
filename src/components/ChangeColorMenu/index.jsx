import React, {useEffect, useRef, useState} from 'react';
import styles from './style.module.scss';
import {ReactComponent as ColorPalette} from '../../assets/color-palette.svg';
import {ReactComponent as PreviewIcon} from '../../assets/preview.svg';
import {ReactComponent as AcceptIcon} from '../../assets/accept.svg';

const ChangeColorMenu = (props) => {
  const {
    initialValue,
    callback
  } = props
  console.log(initialValue);
  const [isOpened, setIsOpened] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(initialValue);
  const refColorPaletteBlock = useRef(null);
  const refGradientList = useRef(null);
  const [viewAll, setViewAll] = useState(false);
  const [gradients, setGradients] = useState([
    {
      id: 1,
      name: "Piggy Pink",
      gradient:"linear-gradient(to right, #ee9ca7, #ffdde1)"
    },
    {
      id: 2,
      name: "Color Of Sky",
      gradient:"linear-gradient(to right, #e0eafc, #cfdef3)"
    },
    {
      id: 3,
      name: "Blu",
      gradient:"linear-gradient(to right, #00416a, #e4e5e6)"
    },
    {
      id: 4,
      name: "Cool Sky",
      gradient:"linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)"
    }
  ])
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

  const mouseEnterHandler = (gradient) => {
    const mainBackground = document.querySelector('#mainBackgroundId');
    if (gradient) {
      mainBackground.style.transition = 'background 0.3s'
      mainBackground.style.background = gradient
    } else {
      mainBackground.style.transition = 'background 0.3s'
      mainBackground.style.background = textAreaValue.length ? textAreaValue : initialValue
    }
  }

  const mouseLeaveHandler = () => {
    const mainBackground = document.querySelector('#mainBackgroundId');
    mainBackground.style.background = initialValue
  }

  const onClickVariantsHanlder = (variant) => {
    setTextAreaValue(variant)
  }
  const viewAllClickHanlder = () => {
    setViewAll(prev => !prev)
  };
  // useEffect(() => {
  //   if (refGradientList.current) {
  //     if (viewAll) {
  //       refGradientList.current.style.height = '100%'
  //       // refGradientList.current.style.overflow = 'auto'
  //     } else {
  //       refGradientList.current.style.height = ''
  //       // refGradientList.current.style.overflow = 'hidden'
  //     }
  //   }
  // }, [viewAll])
  return (
    <div
      ref={refColorPaletteBlock}
      className={styles.main}
    >
      <div
        title={'Change background gradient'}
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
        <div className={styles.textAreaBlock}>
          <span>New gradient</span>
          <textarea
            placeholder="Paste your linear or other gradient"
            onChange={onChangeHandler}
            value={textAreaValue}
          />
          <div
            className={styles.previewIconBlock}
            title={
              textAreaValue.length
              ? 'Gradient preview'
              : 'Field "New gradient"  is empty'
            }
          >
            <PreviewIcon
              className={styles.previewIcon}
              onMouseEnter={() => mouseEnterHandler()}
              onMouseLeave={() => mouseLeaveHandler()}
            />
          </div>
        </div>
        <div className={styles.gradientVariantsBlock}>
          <span>Gradients</span>
          <div
            className={styles.gradientsList}
            ref={refGradientList}
            style={{
              height: viewAll ? '100%' : '28px'
            }}
          >
            {gradients.map(({id, name, gradient}) => (
              <div
                onMouseEnter={() => mouseEnterHandler(gradient)}
                onMouseLeave={mouseLeaveHandler}
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
          <div className={styles.viewAllBlock}>
            <button
              className={styles.viewAllButton}
              onClick={viewAllClickHanlder}
            >
              {viewAll ? 'Hide all' : 'View all'}
            </button>
          </div>
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