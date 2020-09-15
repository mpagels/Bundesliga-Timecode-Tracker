import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
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
    }
`
