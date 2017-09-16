import { PLATFORM } from 'aurelia-framework';
import { ConfiguresRouter, Router, RouterConfiguration} from 'aurelia-router';

// Aurelia Router configuration
export class App implements ConfiguresRouter {
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Doist Hacker News Reader";

        config.map([
            { route: '', moduleId: PLATFORM.moduleName('./pages/home'), name: 'home', title: "New" } // Route for displaying this app :D
        ]).mapUnknownRoutes(PLATFORM.moduleName('./pages/not-found')); // Display 404 page on unknown routes
    }
}