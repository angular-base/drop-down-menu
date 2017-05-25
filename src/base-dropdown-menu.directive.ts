import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[baseDropdownMenu]'
})
export class BaseDropdownMenuDirective implements OnInit {

  private dropdownMenu: HTMLElement;

  constructor (private elementRef: ElementRef) {}

  ngOnInit () {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('ul');
  }

  @HostListener('mouseenter') onMouseEnter (): void {
    this.dropdownMenu.style.display = 'block';
    this.reposition();
  }

  @HostListener('mouseleave') onMouseLeave (): void {
    this.dropdownMenu.style.display = 'none';
  }

  private reposition () {
    const menuRect = this.dropdownMenu.getBoundingClientRect();
    const menuLeft = menuRect.left + document.body.scrollLeft;
    const menuTop = menuRect.top + document.body.scrollTop;
    const menuHeight = this.dropdownMenu.offsetHeight;
    const menuWidth = this.dropdownMenu.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const horizontalCheck = (menuLeft > 0 && menuLeft + menuWidth < windowWidth);
    const verticalCheck = (menuTop > 0 && menuTop + menuHeight < windowHeight);

    if (!horizontalCheck) {
      this.dropdownMenu.parentElement.classList.toggle('js-reposition-right');
    }

    if (!verticalCheck) {
      this.dropdownMenu.parentElement.classList.toggle('js-reposition-up');
    }
  }
}
