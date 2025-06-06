import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../../core/models/message.model';
import { MessageService } from '../../../core/services/message.service';

/**
 * Messages component
 *
 * @author gvivas
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  message: Message | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe((msg) => {
      this.message = msg;
      setTimeout(() => (this.message = null), 3000);
    });
  }
}
