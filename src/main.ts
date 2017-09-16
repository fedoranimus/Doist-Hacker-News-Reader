import { Aurelia, PLATFORM } from 'aurelia-framework';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install(); // Used for hosting static components offline

// Just Aurelia things
export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}