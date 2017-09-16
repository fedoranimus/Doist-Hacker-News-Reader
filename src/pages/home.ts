import { autoinject } from 'aurelia-framework';
import { Api, Story } from '../services/api';

@autoinject // Autoinject is for DI
export class Home {

    stories: Story[] = []; // List of Stories; data bound to the DOM, which automagically updates
    private allStoryIds: number[] = []; // IDs of New Stories
    private currentIndex: number = 0; // Current fetched index of allStoryIds
    private isFetching: boolean = false; // Determine if we're fetching new stories, available in the DOM for binding

    // Inject my API into this component
    constructor(private api: Api) {
        
    }

    // Aurelia Component Lifecycle Event - Occurs after Bind (Data Binding) but prior to Attached (DOM Manipulation)
    async activate() {
        await this.populate();
    }

    // Initialize the feed with the collection of New Story IDs and the first 10 stories.
    async populate() {
        this.allStoryIds = await this.api.fetchNewStories();
        await this.fetchMore(); // Async/Await, yay!
    }

    async fetchMore() {
        if(this.currentIndex < this.allStoryIds.length) { // Don't try and fetch when we have everything
            this.isFetching = true;
            const endIndex = this.currentIndex + this.api.ITEMS_PER_PAGE; // Find our Pagination range
            const idsToFetch = this.allStoryIds.slice(this.currentIndex, endIndex); // Get the next set of IDs

            this.currentIndex = endIndex; // Update our latest story ID

            await this.fetchStories(idsToFetch);

            this.isFetching = false;
        }
    }

    private async fetchStories(ids: number[]) {
        await Promise.all(ids.map(async (id) => { // Use map instead of foreach, as foreach will immediately return, even if the calls inside them do not.
            const story = await this.api.fetchStory(id); // Let's actually get the story for this ID
            this.stories.push(story); // Update the collection
        }));
    }
}