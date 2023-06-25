import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { setLogout } from '../../state/authSlice';
import { dispatchIfVar, dispatchRedVar } from '../../state/actionSlice';
import logoCK from '../../assets/logo CK.svg';
import medal1 from '../../assets/medal 1.svg';
import mainpageYellow from '../../assets/main page yellowdown.svg';
import mainpageChar from '../../assets/mainpage character.svg';
import prevArrow from '../../assets/backward arrow.svg';
import nextArrow from '../../assets/forward arrow.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { descriptions } from './Descriptions';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

function Mainpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentLevelDescriptionIndex, setcurrentLevelDescriptionIndex] =
    useState(0);

  const descVariants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 50,
      transition: {
        delay: 0.9,
        duration: 0.7,
      },
    },
    exit: {
      y: -50,
      x: '-100vw',
      transition: { ease: 'easeInOut' },
    },
  };

  const missionVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.4,
      },
    },
    exit: {
      y: 40,
      transition: { ease: 'easeInOut' },
    },
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };
  const handlelevel4nav = () => {
    dispatch(dispatchRedVar());
    navigate('/level4');
  };
  const handlelevel5nav = () => {
    dispatch(dispatchIfVar());
    navigate('/level5');
  };
  const handlelevel6nav = () => {
    navigate('/level6');
  };
  const handlelevel7nav = () => {
    navigate('/level7');
  };

  const handleNextDesc = () => {
    if (currentLevelDescriptionIndex === descriptions.length - 1) {
      setcurrentLevelDescriptionIndex(0);
    } else {
      setcurrentLevelDescriptionIndex(currentLevelDescriptionIndex + 1);
    }
  };

  const handlePrevDesc = () => {
    if (currentLevelDescriptionIndex === 0) {
      setcurrentLevelDescriptionIndex(descriptions.length - 1);
    } else {
      setcurrentLevelDescriptionIndex(currentLevelDescriptionIndex - 1);
    }
  };
  return (
    <div className="mainpage">
      <div className="profile">
        <div className="nav">
          <img src={logoCK} alt="logo" className="logo" />
          <div className="left-mainpage-nav">
            <img src={medal1} alt="medal" className="medalImage" />
            <h3>Score:50</h3>
            <img
              src={mainpageYellow}
              alt="profileimage"
              className="profileImage"
            />
            <p>Haile</p>
            <button onClick={() => handleLogout()} type="button">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="mainpage-main-container">
        <div className="mainpage-robot">
          <img src={mainpageChar} alt="" />
        </div>
        <motion.div
          className="mainpage-description"
          variants={descVariants}
          initial="hidden"
          animate="visible"
          exit={'exit'}
        >
          <motion.h2>
            {descriptions[currentLevelDescriptionIndex].title}
          </motion.h2>
          <motion.p
            variants={missionVariants}
            initial="hidden"
            animate="visible"
            exit={'exit'}
            key={currentLevelDescriptionIndex}
          >
            {descriptions[currentLevelDescriptionIndex].mission}
          </motion.p>
          <h4>{descriptions[currentLevelDescriptionIndex].footerText}</h4>
        </motion.div>
        <div className="mainpage-slides">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper-container"
          >
            <SwiperSlide>
              <div className="level" onClick={() => navigate('/level')}>
                <h2>level 1</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => navigate('/level2')}>
                <h2> level 2</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => navigate('/level3')}>
                <h2>level 3</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => handlelevel4nav()}>
                <h2> level 4</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => handlelevel5nav()}>
                <h2> level 5</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => handlelevel6nav()}>
                <h2>level 6</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="level" onClick={() => handlelevel7nav()}>
                <h2>level 7</h2>
              </div>
            </SwiperSlide>

            <div className="slider-controller">
              <div className="slider-button-prev slider-arrow">
                <img
                  src={prevArrow}
                  alt="prev arrow"
                  onClick={() => handlePrevDesc()}
                />
              </div>
              <h2>{currentLevelDescriptionIndex + 1}</h2>
              <div className="slider-button-next slider-arrow">
                <img
                  src={nextArrow}
                  alt="next arrow"
                  onClick={() => handleNextDesc()}
                />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
