import { Directive, ElementRef, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';

declare var $: any;

@Directive({
  selector: '[nestable]',
  providers: [NgModel]
})

export class NestableDirective implements OnInit, OnChanges {


  @Input("nestable") data: any[];
  @Output() change = new EventEmitter<any>();

  private initilialized: boolean;

  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.initilialized = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit() {

  }

  init() {
    var element = $(this.el.nativeElement);
    $.each(this.data, (index, item) => {
      $(element).find(".root").append(this.buildItem(item));
    });

    if (!this.initilialized) {
      $(element).nestable({
        group: 1
      }).on('change', (e) => {
        var element = e.length ? e : $(e.target);
        var e = element.nestable('serialize');
        var result = e.map((item) => {
          return {
            id: item.id,
            aditional: JSON.parse(unescape(item.aditional))
          }
        })
        this.change.emit(result);
      });
    }
    this.initilialized = true;
  }

  buildItem(item) {


  let html = "<li class='dd-item' data-id='" + item.id + "' data-aditional='" + escape(JSON.stringify(item.dataAditional)) + "'>";
    html += "<div class='dd-handle'>" + item.name + "</div>";



    if (item.children) {
      html += "<ol class='dd-list'>";
      $.each(item.children, (index, children) => {
        html += this.buildItem(children);
      });
      html += "</ol>";
    }

    html += "</li>";

    return html;
  }

}
