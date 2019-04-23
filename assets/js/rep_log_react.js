// import react from 'react';
import { render } from 'react-dom';
import React from "react";
import RepLogApp from './RepLog/RepLogApp';
import "./layout";

const shouldShowHeart = true;

render(
    <RepLogApp withHeart={shouldShowHeart} />,
    document.getElementById('content')
);