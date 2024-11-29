import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
  },
  exportAs: 'blocksStyle',
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() elementChanges = new EventEmitter<any>();
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number = 0;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initItems();
    setTimeout(() => this.renderComplete.emit(true), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // Переключение активных элементов клавишами отталкиваетс от поля index
  // initKeyUp(e: KeyboardEvent): void {
  //   if (e.key === 'ArrowRight') {
  //     if (this.index < this.items.length) {
  //       this.index++;
  //       if (this.items[this.index]) {
  //         this.initStyle(this.index);
  //       }
  //     }
  //   } else if (e.key === 'ArrowLeft') {
  //     if (this.index > 0) {
  //       this.index--;
  //       if (this.items[this.index]) {
  //         this.initStyle(this.index);
  //       }
  //     }
  //   }

  //   this.activeElementIndex = this.index;
  // }

  private initItems(): void {
    if (this.selector) {
      this.items = this.elRef.nativeElement.querySelectorAll(this.selector);

      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).classList.add('active');
          this.elementChanges.emit({el: this.items[0], index: 0});

        }
      }
    } else {
      console.error(
        'BlocksStyle directive: не передан селектор целевых элементов'
      );
    }
  }

  initKeyUp(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') {
      if (this.activeElementIndex < this.items.length - 1) {
        this.activeElementIndex++;
        if (this.items[this.activeElementIndex]) {
          this.initStyle(this.activeElementIndex);
          this.elementChanges.emit({el: this.items[this.activeElementIndex], index: this.activeElementIndex});
          this.items[this.activeElementIndex].scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    } else if (e.key === 'ArrowLeft') {
      if (this.activeElementIndex > 0) {
        this.activeElementIndex--;
        if (this.items[this.activeElementIndex]) {
          this.initStyle(this.activeElementIndex);
          this.elementChanges.emit({el: this.items[this.activeElementIndex], index: this.activeElementIndex});
          this.items[this.activeElementIndex].scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    }
  }

  initStyle(index: number) {
    this.items.forEach((el) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      }
    });
    if (this.items[index]) {
      this.items[index].classList.add('active');
      this.activeElementIndex = index;
    }
  }

  updateItems(): void {
    setTimeout(() => {
      this.initItems();
    });
  }
}
