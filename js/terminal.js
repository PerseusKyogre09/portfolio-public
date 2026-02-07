// Interactive Terminal for portfolio navigation
let interactiveTerminalInstance = null;

class InteractiveTerminal {
    constructor() {
        // Prevent multiple instances
        if (interactiveTerminalInstance) {
            return interactiveTerminalInstance;
        }

        this.terminal = document.getElementById('interactive-terminal');
        
        if (!this.terminal) {
            console.error('❌ Interactive terminal element not found in DOM');
            interactiveTerminalInstance = this; // Still set instance to prevent re-initialization attempts
            return;
        }
        
        // Find elements within terminal container scoped query
        this.output = this.terminal.querySelector('#interactive-terminal-output');
        this.input = this.terminal.querySelector('#interactive-terminal-input');
        
        if (!this.output || !this.input) {
            console.error('❌ Interactive terminal output or input element not found');
            interactiveTerminalInstance = this;
            return;
        }
        
        this.isOpen = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = this.detectCurrentPage();
        this.eventsInitialized = false;

        this.init();
        console.log('✅ Interactive terminal initialized successfully');
        interactiveTerminalInstance = this;
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        
        // Handle different page patterns
        if (path.includes('about')) return 'about';
        if (path.includes('skills')) return 'skills';
        if (path.includes('projects') && path.includes('project-details')) return 'project-details';
        if (path.includes('projects')) return 'projects';
        if (path.includes('contact')) return 'contact';
        
        // Default to home for root or index.html
        return 'home';
    }

    init() {
        if (this.eventsInitialized || !this.terminal || !this.output || !this.input) {
            return;
        }

        // Keyboard shortcut (Ctrl + ` OR Ctrl + Shift + T)
        this.keydownHandler = (e) => {
            // Try both backtick and Shift+T for better compatibility
            if (e.ctrlKey && (e.key === '`' || (e.shiftKey && e.key === 'T'))) {
                e.preventDefault();
                this.toggleTerminal();
            }
        };
        document.addEventListener('keydown', this.keydownHandler);

        // Terminal input handling
        this.inputKeydownHandler = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.executeCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        };
        this.input.addEventListener('keydown', this.inputKeydownHandler);

        // Click outside to close
        this.clickHandler = (e) => {
            if (this.isOpen && this.terminal && !this.terminal.contains(e.target)) {
                this.closeTerminal();
            }
        };
        document.addEventListener('click', this.clickHandler);

        // Clear initial content and reset output
        this.output.innerHTML = '';
        this.addOutput('Welcome to Pradeepto\'s Portfolio Terminal!');
        this.addOutput('Type \'help\' for available commands.');

        this.eventsInitialized = true;
    }

    toggleTerminal() {
        if (!this.terminal) return;
        if (this.isOpen) {
            this.closeTerminal();
        } else {
            this.openTerminal();
        }
    }

    openTerminal() {
        if (!this.terminal || !this.input) {
            console.warn('Terminal elements not available');
            return;
        }
        this.terminal.classList.remove('hidden');
        this.isOpen = true;
        this.input.focus();
    }

    closeTerminal() {
        if (!this.terminal) {
            return;
        }
        this.terminal.classList.add('hidden');
        this.isOpen = false;
        if (this.input) {
            this.input.blur();
        }
    }

    addOutput(text, isCommand = false) {
        if (!this.output) {
            return;
        }

        const line = document.createElement('div');
        line.className = 'interactive-terminal-line';

        if (isCommand) {
            line.innerHTML = `<span class="interactive-terminal-prompt">portfolio@pradeepto:~$ </span>${this.escapeHtml(text)}`;
        } else {
            line.textContent = text;
        }

        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    executeCommand(command) {
        if (!command) return;

        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        this.addOutput(command, true);

        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'cd':
                this.changeDirectory(args[0]);
                break;
            case 'ls':
                this.listDirectory();
                break;
            case 'pwd':
                this.printWorkingDirectory();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'whoami':
                this.addOutput('pradeepto');
                break;
            case 'date':
                this.addOutput(new Date().toString());
                break;
            case 'echo':
                this.addOutput(args.join(' '));
                break;
            case 'cat':
                this.catFile(args[0]);
                break;
            case 'kyogre':
                this.kyogreCommand();
                break;
            case 'matrix':
                this.matrixCommand();
                break;
            case 'hack':
                this.hackCommand();
                break;
            case 'coffee':
                this.addOutput('☕ Making coffee... Just kidding! This is a portfolio, not a coffee machine.');
                break;
            case 'sudo':
                this.addOutput('Nice try! But you\'re not root here. 😉');
                break;
            case 'rm':
                if (args.includes('-rf') && args.includes('/')) {
                    this.addOutput('🚫 Access denied! You almost deleted the entire portfolio!');
                } else {
                    this.addOutput('File not found or permission denied.');
                }
                break;
            default:
                this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
    }

    showHelp() {
        const helpText = `
Available commands:
  help          - Show this help message
  cd <page>     - Navigate to a page (home, about, skills, projects, contact)
  ls            - List available pages
  pwd           - Show current page
  clear         - Clear terminal
  whoami        - Show current user
  date          - Show current date and time
  echo <text>   - Display text
  cat <file>    - Display file contents (try 'cat resume')
  kyogre        - Special Kyogre command
  matrix        - Enter the matrix
  hack          - Feel like a hacker
  coffee        - Get some coffee
  sudo          - Try to get root access
  rm            - Remove files (careful!)

Navigation:
  cd home       - Go to homepage
  cd about      - Go to about page
  cd skills     - Go to skills page
  cd projects   - Go to projects page
  cd contact    - Go to contact page

Fun commands:
  kyogre        - Pokemon reference
  matrix        - Matrix effect
  hack          - Hacker mode
  coffee        - Coffee break
        `.trim();
        this.addOutput(helpText);
    }

    changeDirectory(page) {
        // Determine the navigation path based on current location
        const isOnHomePage = !window.location.pathname.includes('/pages/');
        
        const navigationPaths = {
            'home': isOnHomePage ? 'index.html' : '../index.html',
            'about': isOnHomePage ? 'pages/about.html' : 'about.html',
            'skills': isOnHomePage ? 'pages/skills.html' : 'skills.html',
            'projects': isOnHomePage ? 'pages/projects.html' : 'projects.html',
            'contact': isOnHomePage ? 'pages/contact.html' : 'contact.html',
            '..': '../index.html',
            '/': isOnHomePage ? 'index.html' : '../index.html'
        };

        if (navigationPaths[page]) {
            this.currentDirectory = page === '/' ? 'home' : page;
            this.addOutput(`Changed directory to ${this.currentDirectory}`);
            setTimeout(() => {
                window.location.href = navigationPaths[page];
            }, 500);
        } else {
            this.addOutput(`Directory not found: ${page}`);
        }
    }

    listDirectory() {
        const pages = ['home', 'about', 'skills', 'projects', 'contact'];
        this.addOutput(pages.join('  '));
    }

    printWorkingDirectory() {
        this.addOutput(`/${this.currentDirectory}`);
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.addOutput('Terminal cleared.');
    }

    catFile(file) {
        const files = {
            'resume': 'This is Pradeepto Pal\'s resume. Full Stack Developer, Computer Science Student at SRMIST. Check out the projects page for more details!',
            'bio': 'Pradeepto Pal is a passionate Computer Science student and Full Stack Developer with expertise in web development, blockchain, and software engineering.',
            'skills': 'JavaScript, React, Node.js, Python, Java, HTML/CSS, Git, Docker, AWS, Blockchain, Smart Contracts...'
        };

        if (files[file]) {
            this.addOutput(files[file]);
        } else {
            this.addOutput(`File not found: ${file}`);
        }
    }

    kyogreCommand() {
        this.addOutput('🌊 Kyogre, the Sea Basin Pokémon!');
        this.addOutput('Primal Kyogre awakens...');
        this.addOutput('💧 Water-type Legendary Pokémon');
        this.addOutput('⚡ Controls the power of the seas!');
        if (typeof playKyogreCry === 'function') {
            setTimeout(() => playKyogreCry(), 1000);
        }
    }

    matrixCommand() {
        this.addOutput('Entering the Matrix...');
        this.addOutput('01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000 00100000 01101000 01100001 01110011 00100000 01111001 01101111 01110101 00101110');
        this.addOutput('Wake up, Neo...');
        this.addOutput('The Matrix is everywhere. It is all around us.');
    }

    hackCommand() {
        const hackMessages = [
            'Initializing hack sequence...',
            'Bypassing firewall...',
            'Accessing mainframe...',
            'Downloading data...',
            'Covering tracks...',
            'Hack complete! Just kidding, this is just a portfolio demo. 😄'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < hackMessages.length) {
                this.addOutput(hackMessages[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 500);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }
}

// Initialize terminal when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new InteractiveTerminal();
    });
} else {
    new InteractiveTerminal();
}

// Global function for HTML onclick
function closeInteractiveTerminal() {
    const terminal = document.getElementById('interactive-terminal');
    if (terminal) {
        terminal.classList.add('hidden');
    }
}

// Global function to open terminal
function openInteractiveTerminal() {
    // Try direct approach if instance isn't available
    if (interactiveTerminalInstance && interactiveTerminalInstance.openTerminal) {
        interactiveTerminalInstance.openTerminal();
    } else {
        // Fallback: directly manipulate the terminal element
        const terminal = document.getElementById('interactive-terminal');
        if (terminal) {
            terminal.classList.remove('hidden');
            const input = terminal.querySelector('#interactive-terminal-input');
            if (input) {
                input.focus();
            }
        } else {
            console.error('Terminal element not found!');
        }
    }
}

// Console helper
console.log('%c💻 Pradeepto\'s Portfolio Terminal', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%cOpening Shortcuts:', 'color: #6366f1; font-weight: bold;');
console.log('%cCtrl + ` (backtick)     - Toggle terminal', 'color: #e5e7eb;');
console.log('%cCtrl + Shift + T        - Alternative shortcut', 'color: #e5e7eb;');
console.log('%cClick terminal icon (>_) in header', 'color: #e5e7eb;');
console.log('%cType: checkTerminal() to debug terminal status', 'color: #fbbf24;');

// Terminal status checker
function checkTerminal() {
    const terminalEl = document.getElementById('interactive-terminal');
    const outputEl = document.getElementById('interactive-terminal-output');
    const inputEl = document.getElementById('interactive-terminal-input');
    
    console.log('%c=== Terminal Status ===', 'color: #6366f1; font-weight: bold;');
    console.log('Terminal Element:', terminalEl ? '✅ Found' : '❌ NOT FOUND');
    console.log('Output Element:', outputEl ? '✅ Found' : '❌ NOT FOUND');
    console.log('Input Element:', inputEl ? '✅ Found' : '❌ NOT FOUND');
    console.log('Instance:', interactiveTerminalInstance ? '✅ Initialized' : '❌ NOT INITIALIZED');
    if (interactiveTerminalInstance) {
        console.log('Is Open:', interactiveTerminalInstance.isOpen);
        console.log('Is Hidden:', terminalEl.classList.contains('hidden'));
    }
    console.log('%c=== End Status ===', 'color: #6366f1; font-weight: bold;');
}

