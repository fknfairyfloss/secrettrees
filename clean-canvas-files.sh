#!/bin/bash

# Script to clean up untitled Canvas files in Secret Trees project
# Created: April 26, 2025

# Set up logging
LOG_FILE="canvas-cleanup.log"
echo "Canvas cleanup started at $(date)" > $LOG_FILE

# Define directories
CANVAS_MAPS_DIR="Canvas-Maps"

# Make sure Canvas-Maps directory exists
if [ ! -d "$CANVAS_MAPS_DIR" ]; then
  echo "Creating Canvas-Maps directory..." | tee -a $LOG_FILE
  mkdir -p "$CANVAS_MAPS_DIR"
fi

# Count files before cleanup
TOTAL_UNTITLED=$(ls -1 Untitled*.canvas 2>/dev/null | wc -l)
echo "Found $TOTAL_UNTITLED untitled Canvas files" | tee -a $LOG_FILE

# Temporary directory for backup
BACKUP_DIR="canvas_backup_$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

# Function to check if a file is a valid JSON and has content
is_valid_canvas() {
  local file=$1
  # Check if file size is greater than 10 bytes
  if [[ $(stat -c%s "$file") -gt 10 ]]; then
    # Try to parse as JSON
    if jq empty "$file" 2>/dev/null; then
      return 0 # Valid
    fi
  fi
  return 1 # Invalid or empty
}

# First, back up all files
echo "Backing up files to $BACKUP_DIR..." | tee -a $LOG_FILE
cp Untitled*.canvas $BACKUP_DIR/ 2>/dev/null

# Process each untitled Canvas file
EMPTY_COUNT=0
MOVED_COUNT=0

for file in Untitled*.canvas; do
  # Skip if no match
  [ -e "$file" ] || continue
  
  if is_valid_canvas "$file"; then
    # File has content, move to Canvas-Maps with a better name
    NEW_NAME="$CANVAS_MAPS_DIR/Auto-Generated-$(date +%Y%m%d-%H%M%S)-$(echo $file | sed 's/Untitled/Canvas/').canvas"
    mv "$file" "$NEW_NAME"
    echo "Moved $file to $NEW_NAME (has content)" | tee -a $LOG_FILE
    MOVED_COUNT=$((MOVED_COUNT+1))
  else
    # File is empty or invalid, delete it
    rm "$file"
    echo "Removed $file (empty or invalid)" | tee -a $LOG_FILE
    EMPTY_COUNT=$((EMPTY_COUNT+1))
  fi
done

# Summary
echo "Cleanup completed!" | tee -a $LOG_FILE
echo "Summary:" | tee -a $LOG_FILE
echo "- Total untitled Canvas files: $TOTAL_UNTITLED" | tee -a $LOG_FILE
echo "- Empty files removed: $EMPTY_COUNT" | tee -a $LOG_FILE
echo "- Files with content moved to $CANVAS_MAPS_DIR: $MOVED_COUNT" | tee -a $LOG_FILE
echo "- Backup created in $BACKUP_DIR" | tee -a $LOG_FILE

# Add a note to the obsidian-integration-log
if [ -f "docs/markdown/obsidian-integration-log.md" ]; then
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
  echo "$TIMESTAMP | cleanup | Untitled Canvas files | SUCCESS | Removed $EMPTY_COUNT empty files, moved $MOVED_COUNT to Canvas-Maps" >> docs/markdown/obsidian-integration-log.md
  echo "Added entry to obsidian-integration-log.md" | tee -a $LOG_FILE
fi

echo "Cleanup script finished at $(date)" | tee -a $LOG_FILE 