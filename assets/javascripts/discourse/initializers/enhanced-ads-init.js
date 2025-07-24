import { withPluginApi } from "discourse/lib/plugin-api";

function initializeEnhancedAds(api) {
  // Register the enhanced house ad component
  api.registerConnectorClass("topic-list-top", "enhanced-house-ad", {
    setupComponent(args, component) {
      // Set the placement for enhanced positions
      component.set("placement", "topic-list-top");
    }
  });

  // Register enhanced positions (topic-list-top2 through topic-list-top30)
  for (let i = 2; i <= 30; i++) {
    const position = `topic-list-top${i}`;
    
    api.registerConnectorClass(position, "enhanced-house-ad", {
      setupComponent(args, component) {
        component.set("placement", position);
      }
    });
  }

  // Override the original house-ad component behavior for topic-list-top positions
  api.modifyClass("component:house-ad", {
    // Override chooseAdHtml for enhanced functionality
    chooseAdHtml() {
      const placement = this.get("placement");
      
      // Use enhanced logic for topic-list-top positions
      if (placement && placement.startsWith("topic-list-top")) {
        return this._enhancedChooseAdHtml();
      }
      
      // Fall back to original behavior for other positions
      return this._super(...arguments);
    },

    // Enhanced ad selection logic
    _enhancedChooseAdHtml() {
      const houseAds = this.site.get("house_creatives");
      const placement = this.get("placement");
      
      if (!houseAds || !placement) {
        return "";
      }

      const placementUnderscored = placement.replace(/-/g, "_");
      const currentCategoryId = this.site?.category?.id;
      
      // Handle multiple ads with | separator and category filtering
      if (houseAds.settings[placementUnderscored]) {
        const adNamesString = houseAds.settings[placementUnderscored];
        
        if (!adNamesString) {
          return "";
        }

        // Split by | to get multiple ad names
        const adNames = adNamesString.split("|").map(name => name.trim()).filter(name => name);
        
        // Filter ads based on category restrictions
        const validAds = adNames.filter(adName => {
          const ad = houseAds.creatives[adName];
          if (!ad) return false;
          
          // If ad has no category restrictions, it's valid for all categories
          if (!ad.category_ids || !ad.category_ids.length) {
            return true;
          }
          
          // Check if current category is in the ad's allowed categories
          return currentCategoryId && ad.category_ids.includes(currentCategoryId);
        });

        // Join HTML of all valid ads
        if (validAds.length > 0) {
          return validAds.map(adName => houseAds.creatives[adName].html).join("");
        }
      }

      return "";
    }
  });
}

export default {
  name: "enhanced-ads-init",
  
  initialize(container) {
    // Only initialize if the enhanced ads are enabled
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.discourse_enhanced_ads_enabled) {
      withPluginApi("0.8.31", initializeEnhancedAds);
    }
  }
}; 