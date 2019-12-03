require 'nokogiri'
require 'yaml'
require 'byebug'

def goddamn_price(doc, sku)
  price = doc.css("span[id='#{sku}-display-price']").text 
  if price && !price.empty?
    price
  else  
    "Not Available"
  end 
end 

def gen 
  @file = File.new('data/summitracing_parts.yml', 'w')
  @parts_hash = Hash.new
  @parts_array = Array.new 
  Dir.glob('summitracing/*.html') do |f|
    # puts f 
    doc = Nokogiri::HTML(open(f)) 
    
    title = doc.css('h1.title').text 
    brand = doc.css("span[itemprop='brand']").children.text
    sku = doc.css("strong[itemprop='sku']").text
    # department = doc.css("").text
    category = doc.css('div.supp-secondary').children[3].text
    price = goddamn_price(doc, sku) 
    url = doc.css("input[id='targetPage']")[0].to_h['value']
    description = doc.css('p.description')[1].text 
    overview_description = doc.css('p.overview-description').text
    # part = {
    #   :tile => title, 
    #   :brand => brand, 
    #   :sku => sku, 
    #   :category => category,
    #   :price => price, 
    #   :summitracing_url => "https://www.summitracing.com" + "#{url}", 
    #   :imgs => [{:s => "#{sku.downcase}_s.jpg",:ml => "#{sku.downcase}_ml.jpg"}],
    #   :description => description, 
    #   :overview_description => overview_description.gsub("\n","").gsub("Warranty","").strip 
    # }
    part = {
      title: title, 
      brand: brand, 
      sku: sku, 
      category: category, 
      price: price, 
      url: url, 
      s_img: "#{sku.downcase}_s.jpg",
      ml_img: "#{sku.downcase}_ml.jpg",
      description: description, 
      overview_description: overview_description.gsub("\n","").gsub("Warranty","").strip 
    }
    @parts_array << part 
    # @parts_hash[:parts] = @parts_array 
    # @file.write(@parts_hash.to_yaml)
  end 
  @parts_hash[:parts] = @parts_array 
  @file.write(@parts_hash.to_yaml)
end
gen 