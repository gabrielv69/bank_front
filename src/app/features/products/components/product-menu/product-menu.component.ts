import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

/**
 * Products menu
 *
 * @author gvivas
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-product-menu',
  imports: [CommonModule],
  templateUrl: './product-menu.component.html',
  styleUrl: './product-menu.component.scss',
})
export class ProductMenuComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  isOpen = false;

  constructor(private eRef: ElementRef) {}

  /**
   * Cambia el estado del menú abierto/cerrado
   *
   */
  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }


  /**
   * Cierra el menú si se hace click afuera de este
   *
   */
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

   /**
   * Evita que los clics dentro del menú se propaguen al documento
   *
   */
  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onEdit(): void {
    this.edit.emit();
    this.isOpen = false;
  }

  onDelete(): void {
    this.delete.emit();
    this.isOpen = false;
  }

  close(): void {
    this.isOpen = false;
  }
}
