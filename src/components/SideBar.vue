<template>


  <div class="columns " >
    <div class="column is-3" style="border-width: 3px; border-color: #999">
      <nav class="sidebar">
        <aside class="menu">
          <figure class="image is-306x231">
            <img src="../assets/Logo_White.png">
          </figure>
          <p class="menu-label"> Gados </p>
          <ul class="menu-list">
            <li class="item-list">Controle de Gados</li>
          </ul>
          <p class="menu-label"> Pesagem </p>
          <ul class="menu-list">
            <li class="item-list">Controle de Pesagem</li>
          </ul>
          <p class="menu-label"> Vacinas </p>
          <ul class="menu-list">
            <li class="item-list"><router-link to="/vaccine">Controle de Vacinas</router-link></li>
          </ul>
          <p class="menu-label"> Especies </p>
          <ul class="menu-list">
            <li class="item-list"><router-link to="/specie">Controle de Especies</router-link></li>
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
 
  text-align: center;
  vertical-align: middle;
  height: 120%;
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
.item-list{
  color: white;
}
.menu-label{
  
  font-size: 15px !important;
  color: white;
}
</style>