Output docs/public/assets/cli-init.gif
Output docs/public/assets/cli-init.mp4

Set FontSize 24
Set Width 1200
Set Height 600

# Setup
Hide
Type "pnpm i"
Enter
Sleep 90s
Type "cd packages/cli/vhs"
Enter
Type "mv wagmi.config.ts ___wagmi.config.ts"
Enter
Ctrl+L
Show

# Recording...
Type "pnpm wagmi init"
Sleep 500ms
Enter
Sleep 5s

# Cleanup
Hide
Type "rm wagmi.config.ts"
Enter
Type "mv ___wagmi.config.ts wagmi.config.ts"
Enter

