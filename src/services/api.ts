import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Api {
    public ITEMS_PER_PAGE = 10;
    private CACHE_NAME = "hnCache";
    private API_URL = "https://hacker-news.firebaseio.com/v0";

    constructor(private http: HttpClient) {

    }

    // Would extract these 2 methods into a separate layer, along with any other API requests, if there were multiple, disparent APIs
    public fetchStory(id: number): Promise<Story> { // Get an individual story
        const uri = `${this.API_URL}/item/${id}.json`; // ES6 Template String
        return this.fetch(uri);
    }

    public fetchNewStories(): Promise<number[]> { // Get the new stories
        const uri = `${this.API_URL}/newstories.json`;
        return this.fetch(uri);
    }

    // These following 2 methods are a good base and would stay in this class, but be used by other API layers
    private fetch(uri: string) {
        if('serviceWorker' in navigator) { // Ensure 'caches' is available in this browser
            this.cache(uri); // Cache this URI
            return this.http.fetch(uri).then(response => { // Check if we can get the information from the network
                return response.json(); // I'm not a fan of the .json() step, but fetch requires it these days
            }, () => {
                return caches.open(this.CACHE_NAME).then((cache) => { // Fallback to the cached version if offline
                    return cache.match(uri).then(matchedResponse => { // Match the URL to get the response data from the cache
                        return matchedResponse.json(); // Return the cached data
                    });
                });
            }); // Could have refactored all of this into async/await, but wanted to demonstrate knowldge of promise chains/nesting
        } else {
            return this.http.fetch(uri).then(response => response.json()); // Should add a better offline fallback in the future
        }
    }

    private cache(uri: string) { // Helper function to store a request
        caches.open(this.CACHE_NAME).then(cache => { // Open the Hacker News cache
            cache.add(uri); // Save the request
        });
    }
}

// These are the only items I care about in this context
export interface Story {
    time: number;
    title: string;
    by: string;
    url: string;
}