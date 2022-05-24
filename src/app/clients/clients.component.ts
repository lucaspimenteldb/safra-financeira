import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.page = params["page"];
    });
  }

  BASE_URL:string = "http://localhost:3000/"

  ngOnInit(): void {
    this.getUsers()
  }

  page:number = 1;
  pages:Array<number> = [];

  allUsers = [{
    name: '',
    cpf: '',
    birth: '',
    signUpDate: '',
    wage: '',
    id: ''
  }]
  users = this.allUsers;
  filteredUsers = this.allUsers

  title = 'Safra financeira'
  filter:string = '';
  tableHead:string[] = [
    'Nome',
    'CPF',
    'Data de Nascimento',
    'Data Cadastro',
    'Renda Mensal',
    'Ações'
  ];

  public updateFilterModel($event:any) {
    this.filter = $event.target.value;
  }

  public filterUsers() {
    if (this.filter === '') {
      this.filteredUsers = this.users;
      return;
    }
    if (isNaN(parseInt(this.filter))) {
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(this.filter.toLowerCase()))
      return;
    }

    const filterCPF = this.users.filter(user => user.cpf.includes(this.filter))
    const filterBirth = this.users.filter(user => user.birth.includes(this.filter))
    this.filteredUsers = [...filterCPF, ...filterBirth]
  }

  public deleteUser(id:string) {
    axios.delete(this.BASE_URL + `users/${id}`).then(() => {
      this.getUsers()
    })
  }

  private getUsers() {
    axios.get(this.BASE_URL + 'users').then(({data}) => {
      const start = (this.page - 1) * 4;
      const end = (this.page * 3) + 1;
      const pages = []
      for (let index = 1; index <= Math.ceil(data.length /4); index += 1) {
        pages.push(index)
      }
      this.pages = [...pages]
      this.allUsers = data;
      this.users = data.slice(start, end);
      this.filteredUsers = data.slice(start, end);
    })
  }

  public paginateUsers(page:number) {
    const start = (page - 1) * 4;
    const end = (page * 3) + 1;
    this.filteredUsers = this.allUsers.slice(start, end);
  }

}
