require 'nokogiri'
require 'pry'
require 'json'

def price(doc, sku)
  price = doc.css("span[id='#{sku}-display-price']").text 
  if price && !price.empty?
    price
  else  
    'Not Available'
  end 
end 

def gen 
  @file = File.new('data/summitracing_parts.json', 'w')
  Dir.glob('summitracing/*.html') do |f|
    # puts f 
    doc = Nokogiri::HTML(open(f)) 
    
    title = doc.css('h1.title').text 
    brand = doc.css("span[itemprop='brand']").children.text
    sku = doc.css("strong[itemprop='sku']").text
    category = doc.css('div.supp-secondary').children[3].text
    price = price(doc, sku)
    url = doc.css("input[id='targetPage']")[0].to_h['value']
    description = doc.css('p.description')[1].text 
    overview_description = doc.css('p.overview-description').text

    part = {
      :tile => title, 
      :brand => brand, 
      :sku => sku, 
      :category => category,
      :price => price, 
      :summitracing_url => 'https://www.summitracing.com' + "#{url}", 
      :s_img => "#{sku.downcase}_s.jpg",
      :ml_img => "#{sku.downcase}_ml.jpg", 
      :description => description, 
      :overview_description => overview_description.gsub("\n",'').gsub('Warranty','').strip 
    }
    @file.write(JSON.pretty_generate(part))
  end 
  @file.close 
end
gen 

# puts 
# puts "Title: "                + title; puts
# puts "SKU: "                  + sku; puts
# puts "Brand: "                + brand; puts
# puts "Category: "             + category; puts
# puts "Price: "                + goddamn_price(doc, sku); puts
# puts "URL: "                  + "https://www.summitracing.com" + "#{url}"; puts 
# puts "Description: "          + description; puts 
# puts "Overview Description: " + overview_description.strip.gsub('Warranty','')