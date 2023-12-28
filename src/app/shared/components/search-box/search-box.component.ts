import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @ViewChild('inputSearch') inputSearchh!: ElementRef<HTMLInputElement>;
  @Output() newTag = new EventEmitter<string>();
  @Input() tag = '';
  @Input() placeholder:string = '';

  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
                                      .pipe( debounceTime(2000) )
                                      .subscribe( value => {
                                        console.log('debouncer');
                                        this.newTag.emit( value );
                                      } )
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }


  searchTag( tag : string ){
      //this.newTag.emit(tag);
      this.debouncer.next( tag );
  }

}
