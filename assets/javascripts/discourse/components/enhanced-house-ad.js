import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["house-creative"],

  // Get current category ID for filtering
  currentCategoryId: computed("site.category", function() {
    return this.site?.category?.id;
  }),

  // Enhanced ad selection logic with multi-ad support and category filtering
  chooseAdHtml: computed("placement", "site.house_creatives", "currentCategoryId", function() {
    const houseAds = this.site.get("house_creatives");
    const placement = this.get("placement");
    
    if (!houseAds || !placement) {
      return "";
    }

    const placementUnderscored = placement.replace(/-/g, "_");
    
    // Check if this is a topic-list-top position (including enhanced positions)
    if (this.isTopicListTopPosition(placement) && houseAds.settings[placementUnderscored]) {
      return this.handleMultipleAds(houseAds, placementUnderscored);
    } else {
      // Handle single ad placement (original behavior)
      return this.handleSingleAd(houseAds, placement);
    }
  }),

  // Check if placement is a topic-list-top position (original or enhanced)
  isTopicListTopPosition(placement) {
    return placement.startsWith("topic-list-top");
  },

  // Handle multiple ads with | separator and category filtering
  handleMultipleAds(houseAds, placementUnderscored) {
    const adNamesString = houseAds.settings[placementUnderscored];
    if (!adNamesString) {
      return "";
    }

    // Split by | to get multiple ad names
    const adNames = adNamesString.split("|").map(name => name.trim()).filter(name => name);
    
    // Filter ads based on category restrictions
    const validAds = adNames.filter(adName => {
      const ad = houseAds.creatives[adName];
      return ad && this.isAdValidForCurrentCategory(ad);
    });

    // Join HTML of all valid ads
    if (validAds.length > 0) {
      return validAds.map(adName => houseAds.creatives[adName].html).join("");
    }

    return "";
  },

  // Handle single ad placement (original behavior preserved)
  handleSingleAd(houseAds, placement) {
    const ad = houseAds.creatives[placement];
    
    if (ad && this.isAdValidForCurrentCategory(ad)) {
      return ad.html;
    }

    return "";
  },

  // Check if ad is valid for current category
  isAdValidForCurrentCategory(ad) {
    if (!ad) {
      return false;
    }

    // If ad has no category restrictions, it's valid for all categories
    if (!ad.category_ids || !ad.category_ids.length) {
      return true;
    }

    // If we're not in a specific category, show unrestricted ads only
    if (!this.currentCategoryId) {
      return !ad.category_ids.length;
    }

    // Check if current category is in the ad's allowed categories
    return ad.category_ids.includes(this.currentCategoryId);
  }
}); 