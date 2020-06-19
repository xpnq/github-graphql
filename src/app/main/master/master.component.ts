import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  @Input() repositories: any;
  @Output() showCollaborators = new EventEmitter();
  constructor() { 
    this.repositories = null;
  }

  ngOnInit() {
  }

  clicked(index: number){
    console.log('button clicked');
    this.showCollaborators.emit({value: index});
  }
}
