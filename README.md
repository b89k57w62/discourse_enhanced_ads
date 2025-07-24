# Discourse Enhanced Ads

A Discourse plugin that extends the House Ads functionality with multiple topic-list positions, multi-ad selection with pipe separator, and category-based filtering.

## Installation

Add the plugin repository to your app.yml file:

```yaml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/your-username/discourse-enhanced-ads.git
```

Rebuild your Discourse container:

```bash
cd /var/discourse
./launcher rebuild app
```

Enable the plugin in Admin → Plugins → Settings:
- Check "discourse enhanced ads enabled"

## Usage

Once installed, the plugin extends House Ads with:

- **Multiple positions**: Use `topic_list_top2` through `topic_list_top30` in addition to the original `topic_list_top`
- **Multi-ad support**: Configure multiple ads using pipe separator: `ad1|ad2|ad3`
- **Category filtering**: Set `category_ids` on ads to display them only in specific categories

Configure ads in Admin → Plugins → House Ads → Settings. 