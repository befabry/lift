// import react from 'react';
import { render } from 'react-dom';
import React from "react";
import RepLogApp from './RepLog/RepLogApp';
import "./layout";

const shouldShowHeart = false;

render(
    <RepLogApp
        withHeart={shouldShowHeart}
        {...window.REP_LOG_APP_PROPS}
    />,
    document.getElementById('content')
);