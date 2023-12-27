
export function gradientColor(colors: string[]) {
    return colors.map(color => `#${color}`)
}


export function gradientAgentColor(colors: string) {
    return [`#${colors}99`, `#${colors}33`, `#${colors}00`]
}