# frozen_string_literal: true

# name: discourse-enhanced-ads
# about: Enhanced advertising plugin that extends Discourse's house ads functionality with multiple positions and category filtering
# version: 1.0.0
# authors: Jeffrey
# url: https://github.com/discourse-enhanced-ads

gem 'json', '2.0.0', require: false

enabled_site_setting :discourse_enhanced_ads_enabled

after_initialize do
  # Load the enhanced ads functionality after Discourse initializes
  
  # Ensure house ads plugin is loaded first
  if defined?(::HouseAdSetting)
    require_relative 'lib/enhanced_ads/engine'
    
    # Initialize enhanced functionality
    EnhancedAds::Engine.load_extensions
  else
    Rails.logger.warn "Enhanced Ads: House Ads plugin not found. This plugin requires the house ads functionality."
  end
end 