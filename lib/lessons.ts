export const lessons: string[][] = [
  [
    "Download Codex",
    "Create an account · install · sign in",
    "Meet Your AI Development Partner",
    "Start with your AI coding partner before installing development tools. Set up your account, open Codex locally, and learn how to work together.",
    "I am starting Coding with AJ on a clean Windows 11 installation. Be my patient AI development tutor. First explain what you can access in this local session and how approvals work. Do not run commands, install software, or edit files yet. Reply with a short introduction and wait for me to begin Lesson 01: System Requirements.",
    "Create or sign in to your ChatGPT account, choose a suitable plan, install the official Windows desktop app, sign in, open a local project, and send your first tutor prompt. Success: Codex responds and waits before running commands."
  ],
  [
    "System Requirements",
    "Check your hardware and OS",
    "Check Your Computer Specifications",
    "Before installing anything, verify your RAM, storage, Windows version, and processor.",
    "Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, CsTotalPhysicalMemory",
    "Open Settings → System → About; check installed RAM, storage, and Windows edition."
  ],
  [
    "Windows Setup",
    "Update and prepare Windows 11",
    "Prepare Windows 11",
    "Install Windows updates and confirm you have administrator access.",
    "winver",
    "Open Settings → Windows Update and install pending updates; restart when required."
  ],
  [
    "Enable Virtualization",
    "Required for WSL2 and Docker",
    "Check Virtualization Support",
    "Confirm CPU virtualization is enabled before installing WSL2.",
    "systeminfo",
    "Open Task Manager → Performance → CPU and find Virtualization: Enabled. If disabled, consult your device manufacturer before changing BIOS settings."
  ],
  [
    "Install WSL2",
    "Set up Windows Subsystem for Linux",
    "Install Windows Subsystem for Linux",
    "Use Windows Subsystem for Linux to run Linux development tools.",
    "wsl --install",
    "Run PowerShell as Administrator, execute the command, and restart if requested."
  ],
  [
    "Install Ubuntu",
    "Add the Linux environment",
    "Set Up Ubuntu",
    "Install and initialize Ubuntu in WSL.",
    "wsl --install -d Ubuntu",
    "Open Ubuntu, create a Linux username and password, then verify it launches."
  ],
  [
    "VS Code",
    "Install and configure your editor",
    "Install Visual Studio Code",
    "Set up a modern code editor with WSL integration.",
    "code --version",
    "Install VS Code from code.visualstudio.com, then add the WSL extension."
  ],
  [
    "Python",
    "Install Python and verify",
    "Install Python",
    "Install Python for scripts, automation, and AI development.",
    "python --version",
    "Install a supported Python version and verify it in a new terminal."
  ],
  [
    "Node.js",
    "Install Node.js and npm",
    "Install Node.js",
    "Set up the JavaScript runtime for modern web applications.",
    "node --version\nnpm --version",
    "Install an active Node.js LTS release and verify Node and npm."
  ],
  [
    "Git",
    "Version control and GitHub",
    "Install Git",
    "Track code changes and prepare to collaborate.",
    "git --version",
    "Install Git and configure your name and email for commits."
  ],
  [
    "Docker Desktop",
    "Install and run containers",
    "Set Up Docker",
    "Run development services in containers using the WSL2 backend.",
    "docker --version\ndocker compose version",
    "Install Docker Desktop, enable WSL2 integration, and check it starts successfully."
  ],
  [
    "Codex Setup",
    "Add an AI coding assistant",
    "Prepare Codex",
    "Learn how to work with an AI coding agent on approved project files.",
    "git status",
    "Create a project folder and Git repository before allowing an AI coding assistant to edit files."
  ],
  [
    "Verify Environment",
    "Test everything works",
    "Verify Your Tools",
    "Run the final checks and collect evidence that your setup works.",
    "wsl --status\ngit --version\nnode --version\npython --version\ndocker --version",
    "Check each tool and troubleshoot any missing commands before marking the environment ready."
  ],
  [
    "Next Steps",
    "Build your first project",
    "Create Your First Project",
    "You are ready to begin building a simple application with AI guidance.",
    "mkdir hello-ai",
    "Create a project folder and open it in VS Code; the next course will build on this foundation."
  ]
];
