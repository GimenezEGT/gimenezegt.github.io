source "https://rubygems.org"

# Jekyll static site generator (Sprint 1: Foundation & Skeleton)
gem "jekyll", "~> 4.3"

# Plugins (declared now; first used in later sprints)
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate-v2"
end

# Windows and JRuby do not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows.
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x on JRuby builds.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
