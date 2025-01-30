#!/bin/sh

set -e
cd "$(dirname "$0")"
butler push --if-changed Accessibility.js 0f-0b/rpg-maker-plugins:accessibility
butler push --if-changed EnvironmentalSounds.js 0f-0b/rpg-maker-plugins:environmental-sounds
butler push --if-changed FootstepToggle.js 0f-0b/rpg-maker-plugins:footstep-toggle
butler push --if-changed Patcher.js 0f-0b/rpg-maker-plugins:patcher
butler push --if-changed SimpleTouchInput.js 0f-0b/rpg-maker-plugins:simple-touch-input
