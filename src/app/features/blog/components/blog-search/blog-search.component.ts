import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-search.component.html',
  styleUrl: './blog-search.component.scss'
})
export class BlogSearchComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = '';
  @Input() placeholder: string = 'Search blog posts...';
  @Input() loading: boolean = false;
  @Input() debounceTime: number = 300;

  @Output() searchChange = new EventEmitter<string>();
  @Output() searchFocus = new EventEmitter<void>();
  @Output() searchBlur = new EventEmitter<void>();

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  // Component state
  isFocused = signal<boolean>(false);
  currentSearch = signal<string>('');
  suggestions = signal<string[]>([]);
  showSuggestions = signal<boolean>(false);

  constructor() {
    // Sync external searchTerm with internal state
    effect(() => {
      this.currentSearch.set(this.searchTerm);
    });
  }

  ngOnInit() {
    // Set up debounced search
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.searchChange.emit(searchTerm);
      });

    this.currentSearch.set(this.searchTerm);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.currentSearch.set(value);
    this.searchSubject.next(value);

    // Show/hide suggestions based on input
    if (value.length > 2) {
      this.generateSuggestions(value);
      this.showSuggestions.set(true);
    } else {
      this.showSuggestions.set(false);
    }
  }

  onFocus() {
    this.isFocused.set(true);
    this.searchFocus.emit();

    if (this.currentSearch().length > 2) {
      this.showSuggestions.set(true);
    }
  }

  onBlur() {
    this.isFocused.set(false);
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      this.showSuggestions.set(false);
    }, 200);
    this.searchBlur.emit();
  }

  onClearSearch() {
    this.currentSearch.set('');
    this.searchSubject.next('');
    this.showSuggestions.set(false);
  }

  onSuggestionClick(suggestion: string) {
    this.currentSearch.set(suggestion);
    this.searchSubject.next(suggestion);
    this.showSuggestions.set(false);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.showSuggestions.set(false);
      (event.target as HTMLInputElement).blur();
    }
  }

  private generateSuggestions(searchTerm: string) {
    // Mock suggestions - in real app, this would come from a service
    const mockSuggestions = [
      'Angular',
      'TypeScript',
      'Performance',
      'Best Practices',
      'Architecture',
      'Testing',
      'RxJS',
      'NgRx',
      'Signals',
      'Component Design',
    ];

    const filtered = mockSuggestions
      .filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);

    this.suggestions.set(filtered);
  }

  get hasValue(): boolean {
    return this.currentSearch().length > 0;
  }
}