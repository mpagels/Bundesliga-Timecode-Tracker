import { createGlobalStyle } from 'styled-components/macro'
import BaiJamjureeSemiBoldItalic from './utils/fonts/bai-jamjuree.ttf'
import BaiJamjureeSemiBoldItalic700 from './utils/fonts/bai-jamjuree700.ttf'
import BaiJamjureeSemiBoldItalic200 from './utils/fonts/bai-jamjuree200.ttf'

export default createGlobalStyle`

@font-face {
    font-family: 'BaiJamjuree';
    src: local('BaiJamjuree'),
    url(${BaiJamjureeSemiBoldItalic}) format('truetype');
    font-weight: 600;
    font-style: italic;
    font-display: auto;
    }
@font-face {
    font-family: 'BaiJamjuree';
    src: local('BaiJamjuree'),
    url(${BaiJamjureeSemiBoldItalic700}) format('truetype');
    font-weight: 700;
    font-style: italic;
    font-display: auto;
    }
@font-face {
    font-family: 'BaiJamjuree';
    src: local('BaiJamjuree'),
    url(${BaiJamjureeSemiBoldItalic200}) format('truetype');
    font-weight: 200;
    font-style: italic;
    font-display: auto;
    }

* {
    box-sizing: border-box;
    font-family: 'BaiJamjuree';
    font-weight: 600;
}

body {
    
    margin: 0;
    font-size: 112.5%;
}

:root {
    --background-grey: #FAFAFA;
    --tag-border-grey: #e3e3e3;
    --button-confirm: #00DC8C;
    --font-greenish: #00DC8C;
    --button-cancel: #cb6870;
    --error-redish: #cb6870;
    --button-delete: #C83232;
    --orange-border: #ff7f00;
    --font-blue: #0032C8;
    --gradient-blue-top: #001496 ;
    --gradient-blue-bottom: #0032C8;
    --white-grey: 240, 240, 240, 1;
    --white:250, 250, 250, 1;
    --solid-grey: #c8c8c8;
    --dark-grey: #737373;
    --special-orange: #FF7D00;
    }
`
