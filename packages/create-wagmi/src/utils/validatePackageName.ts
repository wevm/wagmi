import validateNpmPackageName from 'validate-npm-package-name'

export const validatePackageName = (projectName: string) => {
  const { validForNewPackages, warnings } = validateNpmPackageName(projectName)
  return {
    valid: validForNewPackages,
    warnings,
  }
}
