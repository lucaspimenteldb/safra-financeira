import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(
    route: ActivatedRoute, 
    private router:Router, 
    ) {
    route.params.subscribe((params) => {
      axios.get(this.BASE_URL + `users/${params["id"]}`).then(({data}) => {
        this.user = data
      });
    });
  }

  ngOnInit(): void { 
  }

  BASE_URL:string = "http://localhost:3000/"
  
  title:string = 'Safra Financeira';
  user = {
    name: '',
    cpf: '',
    birth: '',
    wage: '',
    email: '',
    id: '',
    signUpDate: ''
  }
  today = new Date(Date.now());

  public checkAllFields() {
    const fields:string[] = [this.user.name, this.user.cpf, this.user.birth, this.user.wage, this.user.email]
    let isFormComplete:boolean = true;
    
    fields.map(field => {
      if (!isFormComplete) return;

      if (field.length == 0) {
        isFormComplete = false;
        return
      }
    })

    if (!this.checkCPF(this.user.cpf)) return
    if (!this.isEighteen(this.user.birth)) return

    if (isFormComplete) {
      axios.put(this.BASE_URL + `users/${this.user.id}`, {
        name: this.user.name,
        cpf: this.user.cpf,
        birth: this.user.birth,
        wage: this.user.wage,
        id: this.user.id,
        email: this.user.email,
        signUpDate: this.user.signUpDate
      }).then(() => {
        this.router.navigateByUrl('/clients');
      })
    }
  }

  private checkCPF(cpf:string) {
    return cpf.length === 14 ? true : false
  }

  private isEighteen(birth:string) {
    const birthYear = birth.split('/')[2]
    const birthMonth = birth.split('/')[1]
    const birthDay = birth.split('/')[0]
    
    // check years
    if (this.today.getFullYear() - parseInt(birthYear) < 18) return false;
    if (this.today.getFullYear() - parseInt(birthYear) === 18) {
      // check months if the user makes 18 this month
      if ((this.today.getMonth() + 1)/10 - parseInt(birthMonth)/10 < 0) return false;
      if ((this.today.getMonth() + 1)/10 - parseInt(birthMonth)/10 === 0) {
        // check days if the user made 18 this month
        if (this.today.getDate()/10 - parseInt(birthDay)/10 < 0) return false;
      }
    }

    if (this.today.getFullYear() - parseInt(birthYear) > 60) return false;
    if (this.today.getFullYear() - parseInt(birthYear) === 60) {
      // check months if the user makes 61 this month
      if ((this.today.getMonth() + 1)/10 - parseInt(birthMonth)/10 > 0) return false;
      if ((this.today.getMonth() + 1)/10 - parseInt(birthMonth)/10 === 0) {
        // check days if the user made 61 this month
        if (this.today.getDate()/10 - parseInt(birthDay)/10 > 0) return false;
      }
    }

    return true
  }

  public updateModel($event:any, id:string) {
    switch (id) {
      case 'name':
        this.user.name = $event.target.value;
        break;
      case 'birth':
        this.user.birth = $event.target.value;
        break;
      case 'wage':
        this.user.wage = $event.target.value;
        break;
      case 'email':
        this.user.email = $event.target.value;
    }
  }

  signUpInputs = [
    {
      label: 'Nome*:',
      placeholder: 'Informe o Nome',
      id: 'name',
      customClass: 'sign-up__input--name',
      model: this.user.name
    },
    {
      label: 'CPF*:',
      placeholder: 'Insira o CPF',
      id: 'cpf',
      customClass: 'sign-up__input--cpf',
      mask: '000.000.000-00',
      model: this.user.cpf,
      readonly: true
    },
    {
      label: 'Data de nascimento*:',
      placeholder: '__/__/____',
      id: 'birth',
      customClass: 'sign-up__input--birth-date',
      icon: '/assets/calendar.png',
      type: 'date',
      mask: '00/00/0000',
      model: this.user.birth
    },
    {
      label: 'Renda Mensal*:',
      placeholder: 'R$',
      id: 'wage',
      customClass: 'sign-up__input--wage',
      mask: '00.000',
      model: this.user.wage
    },
    {
      label: 'E-mail*:',
      placeholder: 'Informe o e-mail',
      id: 'email',
      customClass: 'sign-up__input--email',
      model: this.user.email
    },
  ]
}
