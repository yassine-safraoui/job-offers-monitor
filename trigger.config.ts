import { defineConfig } from "@trigger.dev/sdk/v3";
import { esbuildPlugin } from "@trigger.dev/build/extensions";
import { additionalPackages } from "@trigger.dev/build/extensions/core";
import { Plugin } from "esbuild";
import fs from 'fs';


const jsdomPatch: Plugin = {
  name: 'jsdom-patch',
  setup(build) {
    build.onLoad({ filter: /jsdom\/living\/xhr\/XMLHttpRequest-impl\.js$/ }, async (args) => {
      let contents = await fs.promises.readFile(args.path, 'utf8');

      contents = contents.replace(
        'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
        `const syncWorkerFile = "${require.resolve('jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js')}";`,
      );

      return { contents, loader: 'js' };
    });
  },
};

export default defineConfig({
  project: "proj_svmzzxoibcigiterusth",
  runtime: "node",
  logLevel: "log",
  // Set the maxDuration to 300 seconds for all tasks. See https://trigger.dev/docs/runs/max-duration
  // maxDuration: 300, 
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/trigger"],
  build: {
    extensions: [
      esbuildPlugin(jsdomPatch),
      additionalPackages({ packages: ["@libsql/linux-x64-gnu"] })
    ]
  }
});
