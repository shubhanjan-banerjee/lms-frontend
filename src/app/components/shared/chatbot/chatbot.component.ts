import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
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
    MatToolbarModule // New Import
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  messages: Message[] = [];
  messageControl = new FormControl('', Validators.required); // Input field control

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // Initial greeting from AI
    this.addAiMessage("Hello! How can I assist you with your LMS today?");
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const userText = this.messageControl.value?.trim();
    if (userText && this.messageControl.valid) {
      this.addUserMessage(userText);
      this.messageControl.reset(); // Clear input field
      this.messageControl.markAsPristine(); // Reset validation state

      // Simulate AI response after a short delay
      setTimeout(() => {
        this.generateAiResponse(userText);
      }, 700);
    }
  }

  addUserMessage(text: string): void {
    this.messages.push({ text, sender: 'user', timestamp: new Date() });
    this.scrollToBottom();
  }

  addAiMessage(text: string): void {
    this.messages.push({ text, sender: 'ai', timestamp: new Date() });
    this.scrollToBottom();
  }

  generateAiResponse(userText: string): void {
    let aiResponse = "I'm still learning, but I can help with general questions. What specifically would you like to know about LMS features?";

    // Simple keyword-based responses (for demo purposes)
    if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
      aiResponse = "Hello there! How can I help you today?";
    } else if (userText.toLowerCase().includes('employee management')) {
      aiResponse = "The Employee Management page allows admins to add, edit, delete, and import employee data via Excel. What else would you like to know?";
    } else if (userText.toLowerCase().includes('skill gap')) {
      aiResponse = "Skill gap analysis helps identify discrepancies between required and existing skills. Admins can view reports and assign learning paths.";
    } else if (userText.toLowerCase().includes('learning path')) {
      aiResponse = "Learning paths are curated sequences of courses to help users achieve specific skill sets. You can register for them on your dashboard.";
    } else if (userText.toLowerCase().includes('features')) {
      aiResponse = "Our LMS offers Admin features like employee management, skill gap analysis, and reporting, and Developer features like personalized dashboards and course registration.";
    } else if (userText.toLowerCase().includes('thank you') || userText.toLowerCase().includes('thanks')) {
      aiResponse = "You're most welcome! Is there anything else?";
    } else if (userText.toLowerCase().includes('how are you')) {
      aiResponse = "As an AI, I don't have feelings, but I'm ready to assist you!";
    }

    this.addAiMessage(aiResponse);
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