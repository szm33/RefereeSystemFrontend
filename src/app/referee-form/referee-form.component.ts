import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Referee} from '../model/referee';
import {License} from '../model/license';
import {DictionaryService} from '../_services/dictionary.service';

@Component({
  selector: 'app-referee-form',
  templateUrl: './referee-form.component.html',
  styleUrls: ['./referee-form.component.css']
})
export class RefereeFormComponent implements OnInit  {

  @Input()
  header: String;
  @Input()
  referee: Referee = new Referee();
  licenses: License[];
  @Output()
  refereeEmitter: EventEmitter<Referee> = new EventEmitter<Referee>();

  constructor(private dictionaryService: DictionaryService) { }

  emitData() {
    this.refereeEmitter.emit(this.referee);
  }

  ngOnInit(): void {
    if (this.dictionaryService.store.licenses.length == 0) {
      this.dictionaryService.getDictionariesObservable().subscribe(dictionaries => this.licenses = dictionaries.licenses);
    }
    else {
      this.licenses = this.dictionaryService.store.licenses;
    }
  }

  isUsernameInvalid() {
    return this.header.startsWith('Add') ?
        !this.referee.username || !/^[a-zA-Z0-9]+$/.test(this.referee.username.toString()) : false;
  }

}
