import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';

@Component({
  selector: 'app-referee-modal',
  templateUrl: './referee-modal.component.html',
  styleUrls: ['./referee-modal.component.css']
})
export class RefereeModalComponent {

  closeResult = '';
  form: Referee = new Referee();

  constructor(private modalService: NgbModal,
              private refereeService: RefereeService) {}

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

  public addReferee(): void {
    this.refereeService.addReferee(this.form).subscribe();
  }
}
