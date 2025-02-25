#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
WORKSPACE_DIR="/media/ff/Local Disk/Work Station/FairyFloss"
LINUX_ENV="${WORKSPACE_DIR}/.env.linux"
WINDOWS_ENV="${WORKSPACE_DIR}/.env.windows"
DRAWIO_DIR="${WORKSPACE_DIR}/diagrams"
SCRIPT_LOG="${WORKSPACE_DIR}/setup.log"

# Common workspace paths to search
SEARCH_PATHS=(
    "/home/ff/WorkStation"
    "/media/ff"
    "/media/ff/Local Disk/Work Station"
    "/media/ff/3CA06196A0615782/Users/ilver"
)

# Logging function
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "${SCRIPT_LOG}"
}

# Debug function
debug() {
    echo -e "${YELLOW}[DEBUG] $1${NC}"
}

# Function to find workspaces and chat history
find_workspaces() {
    log_message "Searching for workspaces and chat history..."
    
    echo "=== Searching for FairyFloss workspaces ==="
    for path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$path" ]; then
            echo "Searching in: $path"
            find "$path" -type d -name "FairyFloss" 2>/dev/null
            find "$path" -type d -name "secret-trees" 2>/dev/null
        fi
    done

    echo -e "\n=== Searching for chat history files ==="
    for path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$path" ]; then
            echo "Searching in: $path"
            # Look for common chat history files and directories
            find "$path" -type f -name "*.md" -exec grep -l "chat" {} \; 2>/dev/null
            find "$path" -type f -name "Quick-Setup.md" 2>/dev/null
            find "$path" -type f -name "*.log" -exec grep -l "chat" {} \; 2>/dev/null
        fi
    done

    echo -e "\n=== Searching for draw.io files ==="
    for path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$path" ]; then
            echo "Searching in: $path"
            find "$path" -type f -name "*.drawio" 2>/dev/null
        fi
    done
}

# Function to check environment
check_environment() {
    log_message "Checking environment..."
    if [[ -f "${LINUX_ENV}" ]]; then
        source "${LINUX_ENV}"
        log_message "Loaded Linux environment"
    else
        log_message "Warning: Linux environment file not found"
    fi
}

# Function to setup git configuration
setup_git() {
    log_message "Setting up Git configuration..."
    git config --global core.autocrlf input
    git config --global core.safecrlf true
    log_message "Git configuration complete"
}

# Function to setup draw.io workspace
setup_drawio() {
    log_message "Setting up draw.io workspace..."
    mkdir -p "${DRAWIO_DIR}"
    log_message "Created diagrams directory at ${DRAWIO_DIR}"
}

# Function to apply script changes
apply_changes() {
    log_message "Applying script changes..."
    chmod +x "${BASH_SOURCE[0]}"
    log_message "Made script executable"
}

# Function to show status
show_status() {
    log_message "Checking workspace status..."
    echo "Environment files:"
    ls -l "${LINUX_ENV}" "${WINDOWS_ENV}" 2>/dev/null
    echo "Draw.io directory:"
    ls -l "${DRAWIO_DIR}" 2>/dev/null
    echo "Git status:"
    git status 2>/dev/null
}

# Function to run specific tasks
run_task() {
    case "$1" in
        "env")
            check_environment
            ;;
        "git")
            setup_git
            ;;
        "drawio")
            setup_drawio
            ;;
        "status")
            show_status
            ;;
        "apply")
            apply_changes
            ;;
        "find")
            find_workspaces
            ;;
        "sync")
            find_sync_points
            ;;
        "feb22")
            find_february_files
            ;;
        "repos")
            check_git_status
            ;;
        *)
            echo "Available commands:"
            echo "  env    - Check environment"
            echo "  git    - Setup git"
            echo "  drawio - Setup draw.io"
            echo "  status - Show status"
            echo "  apply  - Apply script changes"
            echo "  find   - Find workspaces and chat history"
            echo "  sync   - Find sync points"
            echo "  feb22  - Find files from February 22nd"
            echo "  repos  - Check git repositories status"
            ;;
    esac
}

# Main setup
main() {
    echo -e "${GREEN}🚀 Setting up FairyFloss workspace...${NC}"
    cd secrettrees || { echo "Error: secrettrees directory not found"; exit 1; }
    setup_dev_env
    echo -e "${GREEN}✅ Workspace setup complete${NC}"
}

# Add to the find_workspaces function
find_sync_points() {
    log_message "Checking sync points..."
    
    echo "=== Checking Sync Points ==="
    # Check Linux workspace
    if [ -d "/home/ff/WorkStation/FairyFloss" ]; then
        echo "✓ Linux workspace found"
        ls -la "/home/ff/WorkStation/FairyFloss/.git" 2>/dev/null
    fi
    
    # Check Windows mount
    if [ -d "/media/ff/Local Disk/Work Station/FairyFloss" ]; then
        echo "✓ Windows workspace found"
        ls -la "/media/ff/Local Disk/Work Station/FairyFloss/.git" 2>/dev/null
    fi
    
    # Check backup location
    if [ -d "/media/ff/3CA06196A0615782/Users/ilver" ]; then
        echo "✓ Backup location found"
        find "/media/ff/3CA06196A0615782/Users/ilver" -name ".git" 2>/dev/null
    fi

    # Check for chat history backups
    echo -e "\n=== Checking Chat History Backups ==="
    for path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$path" ]; then
            find "$path" -type f -name "*chat*.backup" 2>/dev/null
            find "$path" -type f -name "*history*.backup" 2>/dev/null
        fi
    done
}

# Update the find_february_files function
find_february_files() {
    log_message "Starting detailed search for February files..."
    
    echo "=== Checking search paths ==="
    for path in "${SEARCH_PATHS[@]}"; do
        echo "Checking path: $path"
        if [ -d "$path" ]; then
            echo "✓ Directory exists: $path"
            echo "Contents:"
            ls -la "$path" | head -n 5
        else
            echo "✗ Directory not found: $path"
        fi
    done

    echo -e "\n=== Searching for files (Feb 21-24, 2024) ==="
    for path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$path" ]; then
            echo -e "\nSearching in: $path"
            
            echo "1. Looking for recently modified files..."
            find "$path" -type f -newermt "2024-02-21" ! -newermt "2024-02-24" -ls 2>/dev/null
            
            echo "2. Looking for specific file types..."
            echo "- Markdown files:"
            find "$path" -type f -name "*.md" -ls 2>/dev/null
            echo "- Log files:"
            find "$path" -type f -name "*.log" -ls 2>/dev/null
            echo "- Draw.io files:"
            find "$path" -type f -name "*.drawio" -ls 2>/dev/null
            
            echo "3. Looking for chat history..."
            find "$path" -type f -exec grep -l "chat" {} \; 2>/dev/null
        fi
    done

    echo -e "\n=== Search Summary ==="
    echo "Searched paths:"
    printf '%s\n' "${SEARCH_PATHS[@]}"
}

# Main setup
setup_dev_env() {
    debug "Setting up development environment..."
    
    # Create package.json if not exists
    if [ ! -f package.json ]; then
        cat > package.json << 'END'
{
    "name": "secrettrees",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "framer": "^2.4.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "@types/react": "^18.2.0",
        "@types/node": "^20.0.0",
        "typescript": "^5.0.0"
    },
    "scripts": {
        "start": "framer start",
        "build": "framer build",
        "test": "framer test"
    }
}
END
    fi

    # Create tsconfig.json
    cat > tsconfig.json << 'END'
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
    },
    "include": ["components"]
}
END

    # Install dependencies
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install

    # Run tests
    echo -e "${YELLOW}🧪 Running tests...${NC}"
    node scripts/check-private.js
    node scripts/track-changes.js
    node scripts/update-graph.js

    # Test git hooks
    echo -e "${YELLOW}🔄 Testing git hooks...${NC}"
    git add .
    git commit -m "test: verify hooks and private content checks"

    # Update structure documentation
    echo -e "${YELLOW}📝 Updating documentation...${NC}"
    node scripts/update-graph.js > docs/mindmaps/STRUCTURE.md

    debug "✓ Development environment setup complete"
}

# Run main
main "$@"

# Update README.md
cat > README.md << 'END'
## 📊 Project Status
| Project | Status | Progress |
|---------|--------|----------|
| SecretTrees | 🟢 Active | ![90%](https://progress-bar.dev/90/?color=ff69b4) |
| Integration | 🟡 Ongoing | ![75%](https://progress-bar.dev/75/?color=00ff00) |
| Tools | 🟢 Ready | ![95%](https://progress-bar.dev/95/?color=20b2aa) |

## 🛠️ Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
END

# Add and commit
git add README.md
git commit -m "🎨 Update profile with enhanced mindmap"
git push

echo -e "\n✅ Profile updated!"

## 🔄 Development Flow
1. Private Development (secrettrees-private)
   - Component creation
   - Core functionality
   - Testing

2. Public Release (secrettrees)
   - Component library
   - Documentation
   - Integration tools

3. Documentation
   - Mindmaps
   - Rules
   - Guides

# 3. Verify structure again
echo -e "\n🔍 Verifying new structure..."
for dir in \
    "secrettrees/public/components" \
    "secrettrees/private" \
    "secrettrees-private/components" \
    "secrettrees-private/core" \
    "docs/mindmaps" \
    "docs/rules" \
    "integration/discord" \
    "integration/notion" \
    "diagrams/project-overview"; do
    if [ -d "$dir" ]; then
        echo "✓ Created: $dir"
    else
        echo "✗ Failed to create: $dir"
    fi
done

echo -e "\n✅ Directory structure fixed!"

# Create mindmap file
cd "/media/ff/Local Disk/Work Station/FairyFloss" && \

# Create mindmap with proper styling
cat > docs/mindmaps/STRUCTURE.md << 'END'
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=ff69b4&height=200&section=header&text=FairyFloss%20Development&fontSize=50&fontAlignY=35&animation=twinkling" />
</div>

# 👑 FairyFloss Development

## 📂 Development Structure

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'fontFamily': 'arial', 'fontSize': '16px', 'lineColor': '#ff69b4', 'mainBkg': '#2a2a2a', 'nodeBorder': '#ff69b4', 'textColor': '#ffffff'}}}%%
mindmap
    root((FairyFloss))
        SecretTrees
            Private
                Staking
                Security
            Public
                Components
                Documentation
            Integration
                Tools
                    VSCode
                    GitHub
                Communication
                    Discord
                    Notion
                Automation
                    Scripts
                    Actions
            Documentation
                Guides
                    Setup
                    Development
                Visual
                    Mindmaps
                    Flowcharts
                Progress
                    Metrics
                    Updates
```

## 📊 Project Status
| Project | Status | Progress |
|---------|--------|----------|
| SecretTrees | 🟢 Active | ![90%](https://progress-bar.dev/90/?color=ff69b4) |
| Integration | 🟡 Ongoing | ![75%](https://progress-bar.dev/75/?color=00ff00) |
| Tools | 🟢 Ready | ![95%](https://progress-bar.dev/95/?color=20b2aa) |
END

# Add and push
git add docs/mindmaps/STRUCTURE.md
git commit -m "🎨 Update mindmap with dark theme and styling"
git push

echo -e "\n✅ Updated mindmap pushed!"

# Add this function to check git status across repositories
check_git_status() {
    log_message "Checking git repositories status..."
    
    # Check main workspace
    echo -e "\n=== Main Repository Status ==="
    cd "${WORKSPACE_DIR}" || return
    git status
    git branch -v
    
    # Check secrettrees directory
    echo -e "\n=== SecretTrees Repository Status ==="
    cd "${WORKSPACE_DIR}/secrettrees" 2>/dev/null && {
        git status
        git branch -v
    }
    
    # Log repositories found
    echo -e "\n=== Found Git Repositories ==="
    find "${WORKSPACE_DIR}" -name ".git" -type d -exec dirname {} \;
} 