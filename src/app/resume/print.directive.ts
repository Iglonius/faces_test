import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
declare const jQuery: any;

/**
 * Directive the make it possible to activate the print option and specify a specific part of the page to printout.
 */
@Directive({
  selector: '[hiqPrint]'
})
export class PrintDirective implements AfterViewInit {

  /**
   * Selector of the element to print out.
   */
  @Input() printElement;
  constructor(public element: ElementRef) { }

  button = this.element.nativeElement;

  /**
   * Initializations after the whole view has loaded.
   */
  ngAfterViewInit(): void {
    let self = this;

    //Binds the button click with jQuery
    jQuery(this.button).on('click', function(e){

      var html = jQuery("#"+self.printElement).prop('outerHTML');

      // Gets the current stylesheets on the document as an array
      let sheets = document.styleSheets;

      // Array to collect all style sheets sources
      let sheetsHref = [];

      for(var s = 0; s < sheets.length; s++) {
        sheetsHref.push(sheets[s].href);
      }

      let printStyles: any = "";

      //For each stylesheet reference create a print version of it.
      sheetsHref.forEach((value:any, index: any) => {
        if(value !== null) {
          printStyles =`<link rel='stylesheet' type='text/css' href='${value}' media=print \> \n ${printStyles}`;
        }
      });

      //Creates a new popup window for the printable content.
      let popupWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

      //Open the popup window for showing it.
      popupWindow.document.open();

      //Creates the markup for the document.
      popupWindow.document.write(`
          <html>
            <head>
              <title>CV - HiQ</title>
              ${printStyles}
              <link href="https://fonts.googleapis.com/css?family=Reenie+Beanie" rel="stylesheet">
            </head>
            <body onload="window.print(); window.close()">${html}</body>
          </html>
        `
      );
      popupWindow.document.close();
    });
  }
}
