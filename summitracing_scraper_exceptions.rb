require 'open-uri'

begin
  ## todo ARG[0]  
  io_thing = open('https://www.summitracing.com/parts/nal-24502609')

  # the text of the status code is in [1]
  the_status = io_thing.status[0]

rescue OpenURI::HTTPError => the_error 
  # some clean up work goes here and there... 

  the_status = the_error.io.status[0] # => 3xx, 4xx, or 5xx 
  
  # the_error.message is the numeric code and the text in a string 
  puts "Got a bad a status code #{the_error.message}" 
end 
puts the_status
