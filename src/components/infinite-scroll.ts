import { autoinject, bindable } from 'aurelia-framework';

@autoinject
export class InfiniteScrollCustomAttribute {
    private isScrolling = false; // are we scrolling - state management?
    @bindable callback: Function; // callback function for attribute
    @bindable enabled = true; // Should we fetch new data - state management?
    private buffer = 50; // number of pixels before the bottom

    constructor(private element: Element) {

    }

    private onScrollChanged = () => {
        if(!this.enabled) // Ignore if already fetching new data
            return false;

        if(!this.isScrolling) {
            requestAnimationFrame(() => { // Throttle to give a smoother experience
                this.verifyPosition(); // Check if we're at the bottom of the list
                this.isScrolling = false;
            })
        }

        this.isScrolling = true;
    }

    private verifyPosition() {
        const scrollHeight = this.element.scrollHeight;
        const offsetTop = (this.element as HTMLElement).offsetTop;
        const scrollPosition = innerHeight + pageYOffset;

        const isBottom = (scrollPosition + this.buffer) >= (scrollHeight + offsetTop); // Are we within the buffer value of the bottom of the list?

        if(this.callback && isBottom) {
            this.callback(); // fire the callback function we passed in
        }
    }

    // Lifecycle Event - Attached to the DOM, ready for manipulation
    attached() {
        addEventListener('scroll', this.onScrollChanged);
        this.onScrollChanged(); // Do an initial check to see if the browser is taller than our list
    }

    // Lifecycle Event - Detached from the DOM
    detached() {
        removeEventListener('scroll', this.onScrollChanged);
    }
}