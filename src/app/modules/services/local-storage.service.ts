import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  users: User[] = [];
  myList: any[] = [];

  spider_man: any = {
    image:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/spider-man-no-way-home_l1mupilp_480x.progressive.jpg?v=1640203988',
    logo: 'assets/images/logo.webp',
    tag: 'New',
    id: 1,
    type: 'movie'
  }

  lucifer: any = {
    image:
      'https://movieposters2.com/images/1376417-b.jpg',
    logo: '',
    tag: '',
    id: 2,
    type: 'series'
  }
  
  ngOnInit() {
    this.getUsersFromLocalStorage()
    this.getMyListFromLocalStorage()
  }

  //use it on select profile
  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  //use it on dashboard onInit
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null
  }

  addNewUser(user: User) {
    user.id = new Date().getTime()    
    this.users.push(user)
    this.saveUsers()
  }

  addToMyList(id) {
    if (id == 1) {
      this.myList.includes(this.spider_man) ? null : this.myList.push(this.spider_man)
    } else {
      this.myList.includes(this.lucifer) ? null : this.myList.push(this.lucifer)
    }
    this.saveMyList()
  }

  getAllUsers() {
    return this.users || []
  }

  getMyList() {
    return this.myList || []
  }

  getUserById(id: number) { 
    return this.users.find((user) => user.id === id) || null
  }

  getFromListById(id) { 
    return this.myList.find((item) => item.id == id) || null
  }

  updateUserById(id: number, updateUser: User) {
    let user = this.getUserById(id)
    if (!user) {
      return "user not found"
    }
    this.users[this.users.indexOf(user)] = updateUser;
    this.saveUsers()
  }

  deleteUserById(id: number) {
    let user = this.getUserById(id)    
    if (!user) {
      return "user not found"
    }

    this.users = this.users.filter((user) => user.id !== id)
    this.saveUsers()
  }

  deleteFromListById(id: number) {
    let item = this.getFromListById(id)    
    if (!item) {
      return "Item not found"
    }

    this.myList = this.myList.filter((item) => item.id !== id)
    this.saveMyList()
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users))
  }

  private getUsersFromLocalStorage() {
    this.users = JSON.parse(localStorage.getItem('users')) || [];    
  }

  private getMyListFromLocalStorage() {
    this.myList = JSON.parse(localStorage.getItem('myList')) || []
  }

  private saveMyList() {
    localStorage.setItem('myList', JSON.stringify(this.myList))
  }
}


export interface User {
  id?: number,
  name: string,
  profilePic?: string,
  kidMode?: boolean,
  lang?: string, //ar or en
}