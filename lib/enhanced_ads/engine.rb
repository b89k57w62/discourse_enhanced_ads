# frozen_string_literal: true

module EnhancedAds
  class Engine
    def self.load_extensions
      # Load enhanced house ad settings extensions
      Rails.logger.info "Enhanced Ads: Loading enhanced advertising extensions"
      
      # Extend existing HouseAdSetting to support additional positions
      extend_house_ad_setting if defined?(::HouseAdSetting)
    end
    
    private
    
    def self.extend_house_ad_setting
      ::HouseAdSetting.class_eval do
        # Add enhanced topic list positions to DEFAULTS
        const_set(:ENHANCED_DEFAULTS, DEFAULTS.merge({
          topic_list_top2: "",
          topic_list_top3: "",
          topic_list_top4: "",
          topic_list_top5: "",
          topic_list_top6: "",
          topic_list_top7: "",
          topic_list_top8: "",
          topic_list_top9: "",
          topic_list_top10: "",
          topic_list_top11: "",
          topic_list_top12: "",
          topic_list_top13: "",
          topic_list_top14: "",
          topic_list_top15: "",
          topic_list_top16: "",
          topic_list_top17: "",
          topic_list_top18: "",
          topic_list_top19: "",
          topic_list_top20: "",
          topic_list_top21: "",
          topic_list_top22: "",
          topic_list_top23: "",
          topic_list_top24: "",
          topic_list_top25: "",
          topic_list_top26: "",
          topic_list_top27: "",
          topic_list_top28: "",
          topic_list_top29: "",
          topic_list_top30: ""
        }))
        
        # Override DEFAULTS to include enhanced positions
        remove_const(:DEFAULTS) if const_defined?(:DEFAULTS)
        const_set(:DEFAULTS, ENHANCED_DEFAULTS)
      end
      
      Rails.logger.info "Enhanced Ads: Extended HouseAdSetting with additional topic list positions"
    end
  end
end 