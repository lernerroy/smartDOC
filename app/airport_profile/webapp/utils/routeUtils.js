sap.ui.define([], function (MessageBox) {
  "use strict";

  return {
    getCurrentRouteName: function (router) {
      if (!router) {
        return null;
      }
      const currentHash = router.getHashChanger().getHash();
      return router.getRouteInfoByHash(currentHash).name; // since 1.75
    },
  };
});
