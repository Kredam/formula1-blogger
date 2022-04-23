import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations:[
    trigger('errorAppeared', [
      state("valami", style({
        opacity:1,
        backgroundColor: 'red'
      })),
      transition(":enter, * => valami", [
        style({opacity:0}),
        animate('2s ease-in-out')
      ])
    ])
  ]
})
export class EntryComponent implements OnInit {

  constructor(public userService: UserService) { }


  ngOnInit(): void {
  }

}
