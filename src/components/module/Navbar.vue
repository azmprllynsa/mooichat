<template>
  <div class="navbar columns is-gapless">
    <div class="column lists">
      <img src="../../assets/img/mooichat4.png" style="height: 40px">
      <p>Mooichat</p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss" scoped>
.columns.is-gapless:not(:last-child) {
    margin-bottom: 0;
}
.navbar{
    top: 0px;
    position: sticky;
    align-items: center;
    box-shadow: 4px 1px 5px rgba(0,0,0,0.2);
    display: flex;
    background: #ff5f33;
}

.lists {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.lists p {
  font-family: Brown Regular;
  margin: 0px !important;
}

.lists img {
  margin-right: 10px;
}
.search{
    font-size: 1.5em;
    text-align: right;
    margin-right: 20px !important;
}
</style>
