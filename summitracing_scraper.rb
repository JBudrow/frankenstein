require 'nokogiri'

## todo  
# iterate files
# parse file
# retrieve necessary attributes 
# ingest to database 

# imagemagick
# save images to aws s3

def remove_newlines(string)
  string.split.join(' ')
end 

def scraper # param for file iteration
  # parsing problem ie 
  # [14] pry(main)> doc.css('p.overview-description').text.split.join(' ')
  # Edelbrockâ\u0080\u0099s
  doc = Nokogiri::HTML(open('Edelbrock Performer Carburetors 1406 - Free Shipping on Orders Over $99 at Summit Racing.html'))
  # hack solution, we should be able to encode page prior to getting individual elements 
  doc.css('p.overview-description').text.split.join(' ').encode('iso-8859-1').force_encoding('utf-8')
  # dependable solution
  doc = Nokogiri::HTML(open('Edelbrock Performer Carburetors 1406 - Free Shipping on Orders Over $99 at Summit Racing.html'), nil, Encoding::UTF_8.to_s).text.s
end 

## Parts model 
# sqlite3

# attributes
part = {
  id => 1
  # doc.css("span[itemprop='brand']").children.text
  brand => 'Edelbrock',
  # doc.css("img.column[itemprop='logo']").attribute('src').value
  brand_img_url => '',
  # doc.css('h1.title').text
  name => 'Edelbrock Performer Carburetors 1406',
  summitracing_url => 'https://www.summitracing.com/parts/edl-1406', 
  # doc.css('a.part-detail-large-image')[0].elements[0].to_h['src']
  img_mlarge_url => '',
  ## todo unsure the url for summit has namespace consistency 
  # sample 'https://static.summitracing.com/global/images/prod/xlarge/EDL-1406_xl.jpg?rep=False'
  img_xlarge_url => '',
  ## todo more than one p < description, will need to check for correct response 
  # first ele string is the damn blah blah browser out of date
  # doc.css('p.description')[1].text
  description => 'Carburetor, Performer, 600 cfm, 4-Barrel, Square Bore, Electric Choke, Single Inlet, Silver, Each',
  # doc.css('p.overview-description').text
  overview_description => 'Eldelbrack 1406 Performer Series carb...',
  # doc.css("strong[itemprop='sku']").text
  summitracing_sku => 'EDL-1406',
  ## todo will have to enter this manually 
  price => '$400.00',
  # doc.css('p.price').children[1].text
  # todo if 'Not Available', the Nokogiri method above catches recent items that were searched
  # doc.css('div.price-module').children[7].elements.children[4].text
  summitracing_price => '$298.06',
  # doc.css('div.supp-secondary').children[3].text
  category => 'Carburetors',
  ## todo will have to enter this manually or use a library ie tenderlove/rkelly
  # reason being value inside hidden js script 
  department => 'Air-Fuel-Delivery'
}