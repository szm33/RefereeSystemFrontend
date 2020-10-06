import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';
import {League} from '../model/league';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.css']
})
export class TeamModalComponent implements OnInit {

  closeResult = '';
  form: Team = new Team();
  leagues: League[];

  constructor(private modalService: NgbModal,
              private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getAllLeagues().subscribe(data => this.leagues = data);
  }

  open(content): void{
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public addTeam(): void {
    console.log(this.form);
    this.teamService.addTeam(this.form).subscribe();
  }

}
