import { REVIEWS } from '../data/mockData';
import { Review, ReviewComment } from '../types';

const REVIEWS_STORAGE_KEY = 'unipedia_user_reviews_v1';

type ReviewListener = (reviews: Review[]) => void;

class ReviewService {
  private reviews: Review[] = [];
  private listeners: Set<ReviewListener> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    let userCustomReviews: Review[] = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            userCustomReviews = parsed;
          }
        }
      } catch (e) {
        console.warn('[ReviewService] Failed to parse stored reviews:', e);
      }
    }

    // Combine user-submitted reviews (at the top) with archive reviews
    this.reviews = [...userCustomReviews, ...REVIEWS];
  }

  private persistUserReviews() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const userReviewsOnly = this.reviews.filter(r => r.id.startsWith('rev-user-'));
      window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(userReviewsOnly));
    } catch (e) {
      console.warn('[ReviewService] Failed to persist user reviews:', e);
    }
  }

  private emit() {
    const copy = [...this.reviews];
    this.listeners.forEach(l => {
      try {
        l(copy);
      } catch (err) {
        console.error('[ReviewService] Listener error:', err);
      }
    });
  }

  public getAll(): Review[] {
    return [...this.reviews];
  }

  public getByUniversityId(uniId: string): Review[] {
    return this.reviews.filter(r => r.universityId === uniId);
  }

  public addReview(newRev: Review): Review {
    // Add to top of list
    this.reviews.unshift(newRev);
    this.persistUserReviews();
    this.emit();
    return newRev;
  }

  public likeReview(id: string): void {
    const index = this.reviews.findIndex(r => r.id === id);
    if (index === -1) return;
    this.reviews[index] = {
      ...this.reviews[index],
      likes: this.reviews[index].likes + 1
    };
    this.persistUserReviews();
    this.emit();
  }

  public addComment(reviewId: string, comment: ReviewComment): void {
    const index = this.reviews.findIndex(r => r.id === reviewId);
    if (index === -1) return;

    const existingComments = this.reviews[index].comments || [];
    this.reviews[index] = {
      ...this.reviews[index],
      commentsCount: this.reviews[index].commentsCount + 1,
      comments: [...existingComments, comment]
    };
    this.persistUserReviews();
    this.emit();
  }

  public subscribe(listener: ReviewListener): () => void {
    this.listeners.add(listener);
    listener([...this.reviews]);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const reviewService = new ReviewService();
