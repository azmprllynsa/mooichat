<template>
<router-view></router-view>
</template>

<style lang="scss">

@font-face {
  font-family: "Airbnb Cereal App Black";
  src: url("../src/assets/font/AirbnbCereal-Black.ttf") format("truetype");
}

@font-face {
  font-family: "Airbnb Cereal App Bold";
  src: url("../src/assets/font/AirbnbCereal-Bold.ttf") format("truetype");
}

@font-face {
  font-family: "Airbnb Cereal App Book";
  src: url("../src/assets/font/AirbnbCereal-Book.ttf") format("truetype");
}

@font-face {
  font-family: "Airbnb Cereal App ExtraBold";
  src: url("../src/assets/font/AirbnbCereal-ExtraBold.ttf") format("truetype");
}

@font-face {
  font-family: "Airbnb Cereal App Light";
  src: url("../src/assets/font/AirbnbCereal-Light.ttf") format("truetype");
}

@font-face {
  font-family: "Airbnb Cereal App Medium";
  src: url("../src/assets/font/AirbnbCereal-Medium.ttf") format("truetype");
}

@font-face {
  font-family: "Brown Regular";
  src: url("../src/assets/font/brown-regular.ttf") format("truetype");
}

@font-face {
  font-family: "Naila";
  src: url("../src/assets/font/Darling Suttine.ttf");
}
  .bg-orange{
    background-color: #ff5f33;
    color: #f5f5f5;
  }
  .bg-pink{
    background-color: #F24F8A;
    color: #f5f5f5;
  }
  .orange{
    color: #ff5f33;
  }
  .orange-bg{
    color: #ff5f33;
    background-color: rgb(252, 207, 126);
  }
  .pink{
    color: #F24F8A;
  }

  .yellow{
    color: rgb(252, 207, 126);
  }
  .hide{
    transition: 1s;
    display: none !important;
  }
  .show{
    transition: 1s;
    display: block !important;
  }
</style>
