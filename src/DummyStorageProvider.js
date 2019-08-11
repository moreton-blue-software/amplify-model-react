import { Storage, StorageProvider } from "aws-amplify";
import Promise from "bluebird";
export default class DummyStorageProvider {
  // category and provider name
  static category = "Storage";
  static providerName = "DummyStorageProvider";

  // you need to implement these seven methods
  // configure your provider
  configure(config) {
    return {};
  }

  // get object/pre-signed url from storage
  async get(key, options) {
    return "http://techslides.com/demos/sample-videos/small.webm";
  }

  // upload storage object
  async put(key, object, options) {
    for (let index = 0; index < 10; index++) {
      await Promise.delay(150);
      options.progressCallback({ loaded: index * 10, total: 100 });
    }
    return { key: "http://techslides.com/demos/sample-videos/small.webm" };
  }

  // remove object
  async remove(key, options) {}

  // list objects for the path
  async list(path, options) {}

  // return 'Storage';
  getCategory() {
    return DummyStorageProvider.category;
  }

  // return the name of you provider
  getProviderName() {
    return DummyStorageProvider.providerName;
  }
}
