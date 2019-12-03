require 'sinatra'
require 'json'
require 'yaml'
require 'pry'

def department_keys
  # collect keys ie [Air&Chassis, Engine, Wheels&Tires] to iterate as element ids in layout
end 

def by_department(data, &block) 
  departments = data.group_by { |hash| hash['department'] }
    .sort_by { |department,| -department } 
  block ? departments.each(&block) : departments 
end 

def total_price 
end 

get '/' do 
  dataset = YAML.load_file('data/summitracing_parts.yml')
  @departments = by_department(dataset['parts'])
  erb :app
end

get '/print' do 
  dataset = YAML.load_file('data/summitracing_parts.yml')
  @departments = by_department(dataset['parts'])
  erb :print
end 


