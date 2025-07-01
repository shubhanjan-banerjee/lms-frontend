import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; // Using FormControl for input
// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list'; // New Import
import { MatDividerModule } from '@angular/material/divider'; // New Import
import { MatToolbarModule } from '@angular/material/toolbar'; // New Import
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../../../services/chatbot.service';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule, // New Import
    MatDividerModule, // New Import
    MatToolbarModule, // New Import
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  providers: [ChatbotService]
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  messages: Message[] = [];
  messageControl = new FormControl('', Validators.required); // Input field control
  isLoading = false;
  errorMsg = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(@Inject(ChatbotService) private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    // Initial greeting from AI
    this.addAiMessage("Hello! How can I assist you with your LMS today?");
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  sendMessage(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const userText = this.messageControl.value?.trim();
    if (!userText || this.messageControl.invalid) {
      return;
    }
    this.addUserMessage(userText);
    this.messageControl.reset();
    this.messageControl.markAsPristine();
    this.isLoading = true;
    this.errorMsg = '';
    // Ensure API is called only once per submit
    this.chatbotService.sendMessage(userText).subscribe({
      next: (res: { answer: string }) => {
        this.addAiMessage(res.answer);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.addAiMessage('Sorry, there was a problem connecting to the chatbot.');
        this.isLoading = false;
        this.errorMsg = 'Chatbot unavailable.';
      }
    });
  }

  addUserMessage(text: string): void {
    this.messages.push({ text, sender: 'user', timestamp: new Date() });
    this.scrollToBottom();
  }

  addAiMessage(text: string): void {
    this.messages.push({ text, sender: 'ai', timestamp: new Date() });
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => { // Small delay to ensure DOM is updated
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }, 100);
    } catch (err) { }
  }

  // Format timestamp for display
  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}