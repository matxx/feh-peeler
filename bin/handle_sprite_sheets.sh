#!/usr/bin/env ruby

# put all your sprite sheets (.plist and .png files)
# in the `assets/sprite-sheets` directory
# and launch this script

require 'plist'
require 'json'

Dir['assets/sprite-sheets/*.plist'].map do |input_file|
  json_file = input_file.gsub(/\.plist\Z/, '.json')
  begin
    data = Plist.parse_xml(input_file)

    unless data
      puts 'Failed to parse plist file.'
    end

    # Extract only the frame data for a leaner JSON
    frames = data['frames'].map do |name, config|
      # Convert "{x,y}" and "{{x,y},{w,h}}" strings into numeric arrays
      # textureRect format: {{x,y},{w,h}}
      rect = config['textureRect'].scan(/\d+/).map(&:to_i)

      {
        name: name,
        x: rect[0],
        y: rect[1],
        width: rect[2],
        height: rect[3],
        rotated: config['textureRotated']
      }
    end

    File.write(json_file, JSON.pretty_generate(frames))

    puts "Successfully converted #{input_file} → #{json_file}"
  rescue StandardError => e
    puts "Error: #{e.message}"
    next
  end
end

sprite_sheets_lines = []
components_lines = []
Dir['assets/sprite-sheets/*.plist'].map do |input_file|
  name = File.basename(input_file, '.plist')
  sprite_sheets_lines << "export { default as #{name} } from './#{name}.json'"
  components_lines << "export { default as #{name} } from './#{name}.vue'"

  File.write("components/App/SpriteSheets/#{name}.vue", <<~VUE)
    <template>
      <AppSpriteSheet
        :sprite-sheet="spriteDataRaw"
        :img="spriteImg"
        :name="frame"
        v-bind="props"
      />
    </template>

    <script setup lang="ts">
    import spriteDataRaw from '~/assets/sprite-sheets/#{name}.json'
    import spriteImg from '~/assets/sprite-sheets/#{name}.png'

    const props = defineProps<{
      frame: string
      width?: number
      height?: number
      size?: number
    }>()
    </script>
  VUE

  puts "Successfully created components/App/SpriteSheets/#{name}.vue"
end

File.write('assets/sprite-sheets/index.ts', sprite_sheets_lines.join("\n"))
File.write('components/App/SpriteSheets/index.ts', components_lines.join("\n"))
