#!/usr/bin/env ruby

require 'date'

hash = ENV.fetch('COMMIT_HASH')

file = 'composables/useData.ts'
File.write(
  file,
  File.read(file).gsub(/const COMMIT = '([^']+?)'/, "const COMMIT = '#{hash}'")
)

`git commit #{file} -m "chore: #{Date.today.strftime('%Y-%m-%d')} update"`
# `git commit push origin`
