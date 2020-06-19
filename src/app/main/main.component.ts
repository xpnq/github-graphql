import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [GraphService]
})
export class MainComponent implements OnInit {

  repositories: any;
  collaborators: any;
  constructor(private graphService: GraphService) {
    this.repositories = null;
    this.collaborators = null;
   }

  ngOnInit() {
    console.log('in ngOnInit')
    this.graphService.getData().subscribe(
      response => {
        this.repositories = response.data.viewer.repositories.nodes;
        console.log(this.repositories);
      }
    )
  }

  changeCollaborators(event){
    console.log('change collabo', event.value );
    this.collaborators = this.repositories[event.value].collaborators.edges;
  }
}
