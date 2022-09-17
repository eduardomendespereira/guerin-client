<template>

  <div class="column">
    <div class="columns is-12 menu-top">
      Guerin
    </div>
  </div>

  <div class="columns " >
    <div class="column is-3">
      <nav class="sidebar">
        <aside class="menu">
          <p class="menu-label"> Vacinas </p>
          <ul class="menu-list">
            <li><router-link to="/vaccine">Vaccine</router-link></li>
            
          </ul>
          <p class="menu-label"> Especies </p>
          <ul class="menu-list">
            <li><router-link to="/specie">Especie</router-link></li>
          </ul>
          
        </aside>
      </nav>
    </div>
    <div class="column is-9 conteudo">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.sidebar{
  height: 100vh;
  background-image: url('../assets/SideBarBackGround.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
.conteudo {
  margin-top: 30px;
}
.menu-top{
  background: hsl(0, 0%, 29%);
  padding: 15px;
  color: white;
}
.menu-label{
  font-size: 15px !important;
}
</style>