import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private router:Router) {
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
      this.filteredUsers = this.allUsers;
      return;
    }
    if (isNaN(parseInt(this.filter))) {
      this.filteredUsers = this.allUsers.filter(user => user.name.toLowerCase().includes(this.filter.toLowerCase()))
      return;
    }

    const filterCPF = this.allUsers.filter(user => user.cpf.includes(this.filter))
    const filterBirth = this.allUsers.filter(user => user.birth.includes(this.filter))
    this.filteredUsers = [...filterCPF, ...filterBirth]
  }

  public deleteUser(id:string) {
    axios.delete(this.BASE_URL + `users/${id}`).then(() => {
      this.getUsers()
    })
  }
  public editUser(id:string) {
    this.router.navigateByUrl('/edit-client/' + id);
  }

  private getUsers() {
    axios.get(this.BASE_URL + 'users').then(({data}) => {
      const start = (this.page - 1) * 4;
      const end = (this.page * 4);
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
    this.page = page;
    const start = (page - 1) * 4;
    const end = (page * 4);
    this.filteredUsers = this.allUsers.slice(start, end);
  }

}
