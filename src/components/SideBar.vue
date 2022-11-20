<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img style="width: 100%" src="../assets/Logo_White.png" alt="Guerin" />
    </div>
    <div class="menu-toggle-wrap">
      <h4>Olá {{user}}</h4>
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="icon is-small is-left">
          <i class="material-icons fa fa-angle-double-right"></i>
        </span>
      </button>
    </div>

    <div class="search">
      <p class="control has-icons-left" style="width: 100%">
        <input class="input searchInput" type="text" />
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>

    <div class="menu">
      <ul class="menu-list">
        <li v-for="m in menus" :key="m.id">
          <router-link class="menu-item" :to="m.menu?.path">
            <span class="icon">
              <i :class="m.menu?.icon"></i>
            </span>
            <span class="text white-label">{{m.menu?.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="flex"></div>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { ref } from "vue";
import { RoleMenuClient } from "@/client/role-menu.client";

export default class SideBar extends Vue {
  private roleMenuClient!: RoleMenuClient;
  public is_expanded: Boolean = true;
  public menus: [] = [];
  public user : any

  public mounted(): void {
    this.roleMenuClient = new RoleMenuClient();
    this.is_expanded = ref(
      localStorage.getItem("is_expanded") === "true"
    ).value;
    this.listMenus();
    this.user = localStorage.getItem('user');
  }

  public listMenus(): void {
    this.roleMenuClient
      .getMenusByRole()
      .then((response) => {
        this.menus = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public ToggleMenu(): void {
    this.is_expanded = !this.is_expanded;
    localStorage.setItem("is_expanded", this.is_expanded + "");
  }
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/SideBarBackGround.png");
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  .flex {
    flex: 1 1 0%;
  }
  .logo {
    margin-bottom: 1rem;
    img {
      width: 5rem;
    }
  }
  .menu-toggle-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
    h4 {
      display: none;
    }
  }
  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    text-align: center;
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: var(--dark-alt);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
    .text {
      display: none;
    }
  }
  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  .text {
    display: none;
  }
  .white-label {
    color: white;
    margin-left: 10px;
  }
  .menu-list a:hover i {
    color: black;
  }
  a i {
    padding: 8px 8px 8px 0px;
    text-decoration: none;
    color: white;
    display: block;
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin: 1rem 0;
    top: -3rem;
    display: none !important;
  }
  .text {
    display: none !important;
  }
  .search button {
    cursor: pointer;
    width: auto;
    background-color: transparent;
    border: 0;
    color: #fff;
    position: absolute;
    font-size: 1.25rem;
    left: 1.5rem;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .search input {
    background-color: #404040;
    border: 0px;
    padding: 1rem;
    border-radius: 0.5rem;
    width: calc(100% + 1rem);
  }
  .search input::placeholder {
    padding-left: 1.5rem;
  }
  .searchInput::placeholder {
    color: white;
  }
  .searchInput {
    color: white;
  }
  &.is-expanded {
    width: var(--sidebar-width);
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
      h4 {
        display: block !important;
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
    .footer {
      opacity: 0;
    }

    .item-list {
      color: white;
    }
    .menu-label {
      font-size: 15px !important;
      color: white;
    }
    .menu-list a:hover .white-label {
      color: black;
    }
    .search {
      display: inline !important;
    }
    .text {
      display: inline !important;
    }
    .menu h4 {
      display: block !important;
    }
    .menu {
      margin-left: 0.2rem;
      text-align: left;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
