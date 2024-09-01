<template>
    <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
    </head>
    <div id="home">
        <img src="/logoVuoto.png" class="h-8" alt="Vocable Logo" />
        <span class="vocableText">Vocable</span>
        <div class="descrizione">
            <span class="desc">Cerca di indovinare tutte le parole tramite le loro definizioni!</span>
        </div>
        <a href="Gameplay" class="button">Let's Play!</a>
    </div>
 </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
    .descrizione{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        height: auto;
    }
    .desc{
        padding: 12px 22px;
        text-align: center;
        text-decoration: none;
        display: block;
    }
    .vocableText{
        align-self: center;
        font-size: 3rem/* 48px */;
        line-height: 1;
        font-weight: 600;
        white-space: nowrap;
        color:#050780;
    }
    #home{
        margin: auto;
        width: 50%;
        padding: 10px;
        text-align: center;
    }
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        height: auto;
    }
    .button {
        width:25%;  
        border-radius: 8px;
        background-image: linear-gradient(to right, hsl(242, 100%, 50%),hsl(203, 100%, 59%));
        border: none;
        color: white;   
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-top:3%;
        height:auto;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
    }
    .button:hover {
        background-image: linear-gradient(to left, rgb(4, 0, 255), rgb(0, 157, 255));  
        color: rgb(255, 255, 255);
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
  </style>
  