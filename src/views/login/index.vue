<template>
    <div class="login-form">
      <h2>网络舆情挖掘系统登录</h2>
      <form @submit.prevent="userSubmit">
        <input type="text" placeholder="用户名" v-model="inputUser.username" required>
        <input type="password" placeholder="密码" v-model="inputUser.password" required>
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getUsers, postUser } from "@/api/api.js";
  
  export default {
    name: 'hellouser',
    data() {
      return {
        users: [
          { username: 'test1', password: 'test1' },
          { username: 'test2', password: 'test2' }
        ],
        inputUser: {
          "username": "",
          "password": "",
        }
      };
    },
    methods: {
      loadUsers() {
        getUsers().then(response => {
          this.users = response.data;
        });
      },
      userSubmit() {
        postUser(this.inputUser.username, this.inputUser.password).then(response => {
          console.log(response);
          this.loadUsers();
        });
      },
    },
    created: function() {
      this.loadUsers();
    }
  }
  </script>
  
  <style>
    body {
      /* background-image: url("src/assets/404_images/404.png"); */
      background-size: cover;
      font-family: 'Open Sans', sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
  
    .login-form {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
  
    .login-form:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #333;
    }
  
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-sizing: border-box;
      transition: border-color 0.3s ease;
    }
  
    input[type="text"]:focus,
    input[type="password"]:focus {
      border-color: #a8a8f6;
      outline: none;
    }
  
    button {
      width: 100%;
      padding: 12px;
      background-color: #5c67f2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 16px;
      margin-bottom: 8px;
      transition: background-color 0.3s ease;
    }
  
    button:hover {
      background-color: #4a54e1;
    }
  
    button:active {
      transform: scale(0.97);
    }
  
    .link-button {
      display: block;
      text-align: center;
      text-decoration: none;
      color: #5c67f2;
    }
  
    .link-button:hover {
      text-decoration: underline;
    }
  
    .identity-select {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-sizing: border-box;
      background-color: white;
      color: #333;
      appearance: none;
      /* background-image: url("src/assets/404_images/404.png"); */
      background-position: right 10px center;
      background-repeat: no-repeat;
      background-size: 20px;
    }
</style>
  