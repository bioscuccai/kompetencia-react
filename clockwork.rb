require 'pp'
require 'clockwork'
require './config/boot'
require './config/environment'
require "#{Rails.root}/lib/todo_mail"

module Clockwork
  started={}

  handler do |freq|
    if !$redis.exists "mail:enabled"
      puts '!!!Mail disabled'
    elsif started[freq].nil?
      puts 'Skipping first round for #{freq}'
      started[freq]=true
    else
      puts "Mail frequency: #{freq}"
      mails=TodoMail.collect_sendable freq
      mails.each do |m|
        TodoMail.send_mail m
        TodoMail.reset_pending_for m
      end
    end
  end
  every(3.hours, '3hour')
  every(12.hours, '12hour')
  every(1.days, '1day')
  every(1.weeks, '1week')
end
