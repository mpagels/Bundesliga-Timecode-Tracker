import { createGlobalStyle } from 'styled-components/macro'
import BaiJamjureeSemiBoldItalic from './utils/fonts/BaiJamjuree-SemiBoldItalic.ttf'

export default createGlobalStyle`

@font-face {
    font-family: 'BaiJamjuree';
    src: local('BaiJamjuree'),
    url(${BaiJamjureeSemiBoldItalic}) format('truetype');
    font-weight: 600;
    font-style: italic;
    font-display: auto;
    }

* {
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
}

body {
    
    margin: 0;
    font-size: 112.5%;
}

:root {
    --background-grey: #e0e0e0;
    --tag-border-grey: #e3e3e3;
    --button-confirm: #96bd88;
    --button-cancel: #cb6870;
    --font-blue: #0032C8;
    --gradient-blue-top: #001496:
    --gradient-blue-bottom: #0032C8:
    
    }
`
