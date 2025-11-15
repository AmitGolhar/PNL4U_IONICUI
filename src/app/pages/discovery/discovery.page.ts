import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  Gesture,
  GestureController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { ChatRequestService } from 'src/app/services/chat-request.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.page.html',
  styleUrls: ['./discovery.page.scss'],
})
export class DiscoveryPage implements OnInit, AfterViewInit, OnDestroy {
  profiles: any[] = [];
  currentIndex = 0;
  likedProfiles: any[] = [];

  @ViewChild('topCard', { read: ElementRef }) topCard!: ElementRef;
  private gesture?: Gesture;
  private dragging = false;

  // tweakable
  private SWIPE_THRESHOLD = 120; // px
  private OFFSCREEN_X = 1200; // px to fling offscreen

  constructor(
    private profileService: UserProfileService,
    private gestureCtrl: GestureController,
    private platform: Platform,
    private chatRequestService: ChatRequestService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadProfiles();
  }

  ngAfterViewInit() {
    // gesture is created when view init and when profile changes we re-create it
    this.setupGesture();
  }

  ngOnDestroy() {
    this.destroyGesture();
  }

  loadProfiles() {
    this.profileService.getAllPublicProfiles().subscribe({
      next: (res) => {
        this.profiles = res || [];
        this.currentIndex = 0;
        // small timeout to ensure view is ready
        setTimeout(() => this.setupGesture(), 50);
      },
      error: (err) => console.error(err),
    });
  }

  private setupGesture() {
    // cleanup first
    this.destroyGesture();

    if (!this.topCard) return;
    const cardEl = this.topCard.nativeElement;
    if (!cardEl) return;

    this.gesture = this.gestureCtrl.create({
      el: cardEl,
      threshold: 5,
      gestureName: 'swipe-card',
      onStart: (ev) => {
        this.dragging = true;
        cardEl.style.transition = ''; // remove transition for dragging
      },
      onMove: (ev) => {
        const deltaX = ev.deltaX;
        const deltaY = ev.deltaY;
        const rotate = deltaX / 18; // rotation effect
        // apply transform and slight scale
        cardEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotate}deg)`;
        // reduce opacity as card moves away (visual effect)
        const opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 600);
        cardEl.style.opacity = `${opacity}`;
      },
      onEnd: (ev) => {
        this.dragging = false;
        const deltaX = ev.deltaX;
        // If swiped beyond threshold -> commit
        if (deltaX > this.SWIPE_THRESHOLD) {
          this.animateOff(cardEl, this.OFFSCREEN_X, deltaX).then(() =>
            this.likeProfile()
          );
        } else if (deltaX < -this.SWIPE_THRESHOLD) {
          this.animateOff(cardEl, -this.OFFSCREEN_X, deltaX).then(() =>
            this.skipProfile()
          );
        } else {
          // return to center
          cardEl.style.transition = 'transform 250ms ease, opacity 250ms ease';
          cardEl.style.transform = '';
          cardEl.style.opacity = '1';
          // cleanup transition after finished
          setTimeout(() => {
            cardEl.style.transition = '';
          }, 260);
        }
      },
    });
    this.gesture.enable(true);
  }

  private destroyGesture() {
    if (this.gesture) {
      try {
        this.gesture.destroy();
      } catch (e) {
        /* ignore */
      }
      this.gesture = undefined;
    }
  }

  private animateOff(
    cardEl: HTMLElement,
    toX: number,
    currentDeltaX: number
  ): Promise<void> {
    return new Promise((resolve) => {
      // ensure transition exists
      cardEl.style.transition =
        'transform 300ms ease-out, opacity 300ms ease-out';
      const rotate = toX > 0 ? 25 : -25;
      cardEl.style.transform = `translate3d(${toX}px, 0, 0) rotate(${rotate}deg)`;
      cardEl.style.opacity = '0';
      // after animation, reset card (we'll advance index)
      setTimeout(() => {
        cardEl.style.transition = '';
        cardEl.style.transform = '';
        cardEl.style.opacity = '1';
        resolve();
      }, 320);
    });
  }

  // Actions
  likeProfile(profile?: any) {
    const p = profile || this.profiles[this.currentIndex];
    if (!p) return;
    this.likedProfiles.push(p);
    this.nextProfile();
  }

  skipProfile(profile?: any) {
    // we don't store skips, simply advance
    this.nextProfile();
  }

  nextProfile() {
    this.currentIndex++;
    // small delay to re-create gesture for new top card
    setTimeout(() => this.setupGesture(), 50);
  }

  // Buttons fallback to animate and trigger actions
  onLikeButton() {
    const cardEl = this.topCard?.nativeElement;
    if (!cardEl) {
      this.likeProfile();
      return;
    }
    this.animateOff(cardEl, this.OFFSCREEN_X, 0).then(() => this.likeProfile());
  }

  onSkipButton() {
    const cardEl = this.topCard?.nativeElement;
    if (!cardEl) {
      this.skipProfile();
      return;
    }
    this.animateOff(cardEl, -this.OFFSCREEN_X, 0).then(() =>
      this.skipProfile()
    );
  }
  async sendChatRequest(profile: any) {
    const senderId = 2; // TODO: replace with logged-in user's ID
    const receiverId = profile.userId;  

    this.chatRequestService.sendChatRequest(senderId, receiverId).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: `Chat request sent to ${profile.displayName}`,
          duration: 1600,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: 'Failed to send request',
          duration: 1600,
          color: 'danger',
        });
        toast.present();
        console.error(err);
      },
    });
  }
}
